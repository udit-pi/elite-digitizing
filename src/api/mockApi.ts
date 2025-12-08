/**
 * Mock API Module for Elite Digitizing
 * 
 * This module provides in-memory mock API functions for development.
 * Each function includes comments showing the intended REST endpoint mapping.
 * 
 * Real implementation would replace these with actual HTTP calls to backend API.
 */

import type {
  User,
  UserProfile,
  Order,
  OrderWithTimeline,
  OrderFormData,
  OrderStatus,
  OrderTimeline,
  Quote,
  QuoteBreakdownItem,
  Payment,
  PaymentSession,
  PaymentStatus,
  Deliverable,
  ServiceType,
  OrderFilters,
  ApiResponse,
} from '../types';

// ============================================================================
// In-Memory Data Stores
// ============================================================================

const users: Map<string, User> = new Map();
const orders: Map<string, Order> = new Map();
const quotes: Map<string, Quote> = new Map();
const payments: Map<string, Payment> = new Map();
const deliverables: Map<string, Deliverable[]> = new Map();
const orderTimelines: Map<string, OrderTimeline[]> = new Map();

// Current logged-in user (in real app, this would be in auth context)
let currentUserId: string | null = null;

// ============================================================================
// Helper Functions
// ============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addTimelineEntry(orderId: string, status: OrderStatus, note?: string): void {
  const timeline = orderTimelines.get(orderId) || [];
  timeline.push({
    status,
    timestamp: new Date(),
    note,
  });
  orderTimelines.set(orderId, timeline);
}

// ============================================================================
// User API Functions
// ============================================================================

/**
 * Register a new user
 * Real endpoint: POST /api/auth/register
 */
export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}): Promise<ApiResponse<User>> {
  await delay(500);

  // Check if user already exists
  for (const user of users.values()) {
    if (user.email === data.email) {
      return {
        success: false,
        error: 'User with this email already exists',
      };
    }
  }

  const user: User = {
    id: generateId(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    company: data.company,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.set(user.id, user);
  currentUserId = user.id;

  return {
    success: true,
    data: user,
    message: 'User registered successfully',
  };
}

/**
 * Login user
 * Real endpoint: POST /api/auth/login
 */
export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse<User>> {
  await delay(500);

  // Find user by email
  for (const user of users.values()) {
    if (user.email === email) {
      currentUserId = user.id;
      return {
        success: true,
        data: user,
        message: 'Login successful',
      };
    }
  }

  // For development: auto-create user if not exists
  const user: User = {
    id: generateId(),
    email,
    firstName: 'Test',
    lastName: 'User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.set(user.id, user);
  currentUserId = user.id;

  return {
    success: true,
    data: user,
    message: 'Login successful',
  };
}

/**
 * Logout user
 * Real endpoint: POST /api/auth/logout
 */
export async function logoutUser(): Promise<ApiResponse<void>> {
  await delay(200);
  currentUserId = null;
  return {
    success: true,
    message: 'Logged out successfully',
  };
}

/**
 * Get current user profile
 * Real endpoint: GET /api/users/me
 */
export async function getCurrentUser(): Promise<ApiResponse<User | null>> {
  await delay(200);

  if (!currentUserId) {
    return {
      success: true,
      data: null,
    };
  }

  const user = users.get(currentUserId);
  return {
    success: true,
    data: user || null,
  };
}

/**
 * Get user profile with stats
 * Real endpoint: GET /api/users/me/profile
 */
export async function getUserProfile(): Promise<ApiResponse<UserProfile>> {
  await delay(300);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const user = users.get(currentUserId);
  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  // Calculate stats
  const userOrders = Array.from(orders.values()).filter(o => o.userId === currentUserId);
  const profile: UserProfile = {
    ...user,
    totalOrders: userOrders.length,
    activeOrders: userOrders.filter(o =>
      ['pending', 'quoted', 'awaiting_payment', 'paid', 'in_progress'].includes(o.status)
    ).length,
    completedOrders: userOrders.filter(o => o.status === 'complete').length,
  };

  return {
    success: true,
    data: profile,
  };
}

/**
 * Update user profile
 * Real endpoint: PATCH /api/users/me
 */
export async function updateUserProfile(data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
}): Promise<ApiResponse<User>> {
  await delay(500);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const user = users.get(currentUserId);
  if (!user) {
    return {
      success: false,
      error: 'User not found',
    };
  }

  const updatedUser: User = {
    ...user,
    ...data,
    updatedAt: new Date(),
  };

  users.set(currentUserId, updatedUser);

  return {
    success: true,
    data: updatedUser,
    message: 'Profile updated successfully',
  };
}

// ============================================================================
// Order API Functions
// ============================================================================

/**
 * Create a new order
 * Real endpoint: POST /api/orders
 */
export async function createOrder(formData: OrderFormData): Promise<ApiResponse<Order>> {
  await delay(800);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  // Simulate file upload
  const uploadedFiles = formData.files.map(file => ({
    id: generateId(),
    filename: file.name,
    filesize: file.size,
    mimetype: file.type,
    url: URL.createObjectURL(file), // Mock URL
    uploadedAt: new Date(),
  }));

  const order: Order = {
    id: generateId(),
    userId: currentUserId,
    serviceType: formData.serviceType,
    status: 'pending',
    details: formData.details,
    files: uploadedFiles,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  orders.set(order.id, order);
  addTimelineEntry(order.id, 'pending', 'Order submitted and awaiting review');

  return {
    success: true,
    data: order,
    message: 'Order created successfully',
  };
}

/**
 * Get all orders for current user
 * Real endpoint: GET /api/orders
 */
export async function listOrders(filters?: OrderFilters): Promise<ApiResponse<Order[]>> {
  await delay(400);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  let userOrders = Array.from(orders.values()).filter(o => o.userId === currentUserId);

  // Apply filters
  if (filters) {
    if (filters.status && filters.status.length > 0) {
      userOrders = userOrders.filter(o => filters.status!.includes(o.status));
    }
    if (filters.serviceType && filters.serviceType.length > 0) {
      userOrders = userOrders.filter(o => filters.serviceType!.includes(o.serviceType));
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      userOrders = userOrders.filter(
        o =>
          o.details.designName.toLowerCase().includes(query) ||
          o.id.toLowerCase().includes(query)
      );
    }
    if (filters.dateFrom) {
      userOrders = userOrders.filter(o => o.createdAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      userOrders = userOrders.filter(o => o.createdAt <= filters.dateTo!);
    }
  }

  // Sort by date (newest first)
  userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return {
    success: true,
    data: userOrders,
  };
}

/**
 * Get single order with timeline
 * Real endpoint: GET /api/orders/:id
 */
export async function getOrder(orderId: string): Promise<ApiResponse<OrderWithTimeline>> {
  await delay(300);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const order = orders.get(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  if (order.userId !== currentUserId) {
    return {
      success: false,
      error: 'Unauthorized',
    };
  }

  // Get quote if exists
  const quote = quotes.get(orderId);
  const payment = payments.get(orderId);
  const orderDeliverables = deliverables.get(orderId) || [];
  const timeline = orderTimelines.get(orderId) || [];

  const orderWithTimeline: OrderWithTimeline = {
    ...order,
    quote,
    payment,
    deliverables: orderDeliverables,
    timeline,
  };

  return {
    success: true,
    data: orderWithTimeline,
  };
}

// ============================================================================
// Quote API Functions (Admin operations - simulated)
// ============================================================================

/**
 * Add quote to order (Admin function)
 * Real endpoint: POST /api/orders/:id/quote
 */
export async function addQuote(
  orderId: string,
  amount: number,
  breakdown: QuoteBreakdownItem[],
  expiresAt?: Date,
  notes?: string
): Promise<ApiResponse<Quote>> {
  await delay(500);

  const order = orders.get(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  const quote: Quote = {
    id: generateId(),
    orderId,
    amount,
    breakdown,
    expiresAt,
    createdAt: new Date(),
    createdBy: 'admin-1', // Mock admin ID
    notes,
  };

  quotes.set(orderId, quote);

  // Update order status
  order.status = 'quoted';
  order.quote = quote;
  order.updatedAt = new Date();
  orders.set(orderId, order);

  addTimelineEntry(orderId, 'quoted', `Quote provided: $${amount}`);

  return {
    success: true,
    data: quote,
    message: 'Quote added successfully',
  };
}

/**
 * Update order status (Admin function)
 * Real endpoint: PATCH /api/orders/:id/status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<ApiResponse<Order>> {
  await delay(400);

  const order = orders.get(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  order.status = status;
  order.updatedAt = new Date();
  orders.set(orderId, order);

  addTimelineEntry(orderId, status, note);

  return {
    success: true,
    data: order,
    message: 'Order status updated',
  };
}

// ============================================================================
// Payment API Functions
// ============================================================================

/**
 * Create payment session
 * Real endpoint: POST /api/orders/:id/payment
 * Real implementation would integrate with Stripe/PayPal
 */
export async function createPaymentSession(orderId: string): Promise<ApiResponse<PaymentSession>> {
  await delay(600);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const order = orders.get(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  if (!order.quote) {
    return {
      success: false,
      error: 'No quote available for this order',
    };
  }

  const session: PaymentSession = {
    id: generateId(),
    orderId,
    amount: order.quote.amount,
    provider: 'mock',
    sessionUrl: `https://mock-payment-gateway.com/pay/${generateId()}`,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  };

  // Create pending payment
  const payment: Payment = {
    id: session.id,
    orderId,
    userId: currentUserId,
    amount: order.quote.amount,
    provider: 'mock',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  payments.set(orderId, payment);

  return {
    success: true,
    data: session,
    message: 'Payment session created',
  };
}

/**
 * Simulate payment success/failure
 * In real app, this would be triggered by webhook from payment provider
 * Real endpoint: POST /api/webhooks/payment (from Stripe/PayPal)
 */
export async function simulatePayment(
  paymentId: string,
  success: boolean = true
): Promise<ApiResponse<Payment>> {
  await delay(1000);

  // Find payment by ID
  let payment: Payment | undefined;
  let orderId: string | undefined;

  for (const [oid, p] of payments.entries()) {
    if (p.id === paymentId) {
      payment = p;
      orderId = oid;
      break;
    }
  }

  if (!payment || !orderId) {
    return {
      success: false,
      error: 'Payment not found',
    };
  }

  if (success) {
    payment.status = 'succeeded';
    payment.paidAt = new Date();
    payment.transactionId = `txn_${generateId()}`;
    payment.paymentMethod = 'Visa ****1234';
    payment.receiptUrl = `/api/payments/${payment.id}/receipt`;
    payment.updatedAt = new Date();

    // Update order status
    const order = orders.get(orderId);
    if (order) {
      order.status = 'paid';
      order.payment = payment;
      order.updatedAt = new Date();
      orders.set(orderId, order);
      addTimelineEntry(orderId, 'paid', 'Payment received successfully');

      // Auto-transition to in_progress
      setTimeout(() => {
        order.status = 'in_progress';
        order.updatedAt = new Date();
        orders.set(orderId, order);
        addTimelineEntry(orderId, 'in_progress', 'Work has started on your order');
      }, 2000);
    }
  } else {
    payment.status = 'failed';
    payment.updatedAt = new Date();
  }

  payments.set(orderId, payment);

  return {
    success: true,
    data: payment,
    message: success ? 'Payment successful' : 'Payment failed',
  };
}

/**
 * Get all payments for current user
 * Real endpoint: GET /api/payments
 */
export async function listPayments(): Promise<ApiResponse<Payment[]>> {
  await delay(300);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const userPayments = Array.from(payments.values()).filter(p => p.userId === currentUserId);

  // Sort by date (newest first)
  userPayments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return {
    success: true,
    data: userPayments,
  };
}

/**
 * Get single payment
 * Real endpoint: GET /api/payments/:id
 */
export async function getPayment(paymentId: string): Promise<ApiResponse<Payment>> {
  await delay(200);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  // Find payment
  for (const payment of payments.values()) {
    if (payment.id === paymentId && payment.userId === currentUserId) {
      return {
        success: true,
        data: payment,
      };
    }
  }

  return {
    success: false,
    error: 'Payment not found',
  };
}

// ============================================================================
// Deliverable API Functions (Admin operations)
// ============================================================================

/**
 * Upload deliverable files (Admin function)
 * Real endpoint: POST /api/orders/:id/deliverables
 */
export async function uploadDeliverable(
  orderId: string,
  file: File
): Promise<ApiResponse<Deliverable>> {
  await delay(1000);

  const order = orders.get(orderId);
  if (!order) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  const deliverable: Deliverable = {
    id: generateId(),
    orderId,
    filename: file.name,
    filesize: file.size,
    mimetype: file.type,
    downloadUrl: URL.createObjectURL(file), // Mock URL
    uploadedAt: new Date(),
    uploadedBy: 'admin-1', // Mock admin ID
  };

  const existing = deliverables.get(orderId) || [];
  existing.push(deliverable);
  deliverables.set(orderId, existing);

  // Update order status to complete
  order.status = 'complete';
  order.deliverables = existing;
  order.updatedAt = new Date();
  orders.set(orderId, order);

  addTimelineEntry(orderId, 'complete', 'Deliverable files uploaded and ready for download');

  return {
    success: true,
    data: deliverable,
    message: 'Deliverable uploaded successfully',
  };
}

/**
 * Get deliverables for an order
 * Real endpoint: GET /api/orders/:id/deliverables
 */
export async function getDeliverables(orderId: string): Promise<ApiResponse<Deliverable[]>> {
  await delay(200);

  if (!currentUserId) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const order = orders.get(orderId);
  if (!order || order.userId !== currentUserId) {
    return {
      success: false,
      error: 'Order not found',
    };
  }

  const orderDeliverables = deliverables.get(orderId) || [];

  return {
    success: true,
    data: orderDeliverables,
  };
}

// ============================================================================
// Development Helper Functions
// ============================================================================

/**
 * Seed database with sample data for development
 */
export async function seedData(): Promise<void> {
  // Create test user
  const testUser: User = {
    id: 'user-1',
    email: 'test@elitedigitizing.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (234) 567-8900',
    company: 'Acme Corp',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    updatedAt: new Date(),
  };
  users.set(testUser.id, testUser);
  currentUserId = testUser.id;

  // Create comprehensive sample orders covering all statuses and service types
  const sampleOrders: Array<{
    serviceType: ServiceType;
    status: OrderStatus;
    details: any;
    createdAt: Date;
    hasQuote?: boolean;
    hasPayment?: boolean;
    hasDeliverables?: boolean;
  }> = [
    // COMPLETE - Digitizing
    {
      serviceType: 'digitizing',
      status: 'complete',
      details: {
        designName: 'Company Logo - Final',
        width: 4,
        height: 4,
        units: 'inches',
        outputFormat: 'DST',
        complexity: 'medium',
        turnaroundTime: 'standard',
      },
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      hasQuote: true,
      hasPayment: true,
      hasDeliverables: true,
    },
    // IN_PROGRESS - Patches
    {
      serviceType: 'patches',
      status: 'in_progress',
      details: {
        designName: 'Team Patches - Active',
        width: 3,
        height: 3,
        units: 'inches',
        outputFormat: 'JPG/PNG (Physical patches)',
        complexity: 'simple',
        turnaroundTime: 'standard',
        quantity: 100,
        backingType: 'Iron-on',
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      hasQuote: true,
      hasPayment: true,
    },
    // PAID - Vector
    {
      serviceType: 'vector',
      status: 'paid',
      details: {
        designName: 'Vintage Logo Restoration',
        width: 10,
        height: 8,
        units: 'inches',
        outputFormat: 'AI',
        complexity: 'complex',
        turnaroundTime: 'rush',
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      hasQuote: true,
      hasPayment: true,
    },
    // QUOTED - Digitizing (Ready for Payment)
    {
      serviceType: 'digitizing',
      status: 'quoted',
      details: {
        designName: 'Sports Team Logo',
        width: 5.5,
        height: 5.5,
        units: 'inches',
        outputFormat: 'PES',
        complexity: 'complex',
        turnaroundTime: 'rush',
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      hasQuote: true,
    },
    // QUOTED - Patches
    {
      serviceType: 'patches',
      status: 'quoted',
      details: {
        designName: 'Event Merchandise Patches',
        width: 3.5,
        height: 2.5,
        units: 'inches',
        outputFormat: 'JPG/PNG (Physical patches)',
        complexity: 'medium',
        turnaroundTime: 'standard',
        quantity: 500,
        backingType: 'Velcro',
      },
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      hasQuote: true,
    },
    // PENDING - Digitizing
    {
      serviceType: 'digitizing',
      status: 'pending',
      details: {
        designName: 'New Embroidery Design',
        width: 5,
        height: 5,
        units: 'inches',
        outputFormat: 'EXP',
        complexity: 'medium',
        turnaroundTime: 'standard',
      },
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    // CANCELLED - Vector
    {
      serviceType: 'vector',
      status: 'cancelled',
      details: {
        designName: 'Cancelled Project',
        width: 6,
        height: 6,
        units: 'inches',
        outputFormat: 'SVG',
        complexity: 'simple',
        turnaroundTime: 'standard',
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      hasQuote: true,
    },
    // COMPLETE - Vector
    {
      serviceType: 'vector',
      status: 'complete',
      details: {
        designName: 'Brand Identity Vector Set',
        width: 12,
        height: 12,
        units: 'inches',
        outputFormat: 'EPS',
        complexity: 'complex',
        turnaroundTime: 'rush',
      },
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      hasQuote: true,
      hasPayment: true,
      hasDeliverables: true,
    },
    // COMPLETE - Patches
    {
      serviceType: 'patches',
      status: 'complete',
      details: {
        designName: 'Uniform Patches Set',
        width: 4,
        height: 3,
        units: 'inches',
        outputFormat: 'JPG/PNG (Physical patches)',
        complexity: 'medium',
        turnaroundTime: 'standard',
        quantity: 200,
        backingType: 'Sew-On',
      },
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      hasQuote: true,
      hasPayment: true,
      hasDeliverables: true,
    },
    // QUOTED - Digitizing
    {
      serviceType: 'digitizing',
      status: 'quoted',
      details: {
        designName: 'Hat Embroidery Design',
        width: 3,
        height: 2.5,
        units: 'inches',
        outputFormat: 'JEF',
        complexity: 'simple',
        turnaroundTime: 'standard',
      },
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      hasQuote: true,
    },
  ];

  for (const orderData of sampleOrders) {
    const order: Order = {
      id: `ORD-${generateId()}`,
      userId: testUser.id,
      serviceType: orderData.serviceType,
      status: orderData.status,
      details: orderData.details,
      files: [
        {
          id: `FILE-${generateId()}`,
          filename: `${orderData.details.designName.replace(/\s+/g, '_')}.png`,
          filesize: Math.floor(Math.random() * 5000000) + 500000,
          mimetype: 'image/png',
          url: '/placeholder-file.png',
          uploadedAt: orderData.createdAt,
        },
      ],
      createdAt: orderData.createdAt,
      updatedAt: new Date(),
    };
    orders.set(order.id, order);

    // Add timeline entries
    addTimelineEntry(order.id, 'pending', 'Order submitted successfully');

    // Add quote if applicable
    if (orderData.hasQuote) {
      const quoteAmount = 
        orderData.serviceType === 'patches'
          ? (orderData.details.quantity || 1) * (orderData.details.complexity === 'simple' ? 3.5 : orderData.details.complexity === 'medium' ? 5 : 7)
          : orderData.details.complexity === 'simple' ? 15 : orderData.details.complexity === 'medium' ? 30 : 55;

      const quote: Quote = {
        id: `QTE-${generateId()}`,
        orderId: order.id,
        amount: Math.round(quoteAmount * 100) / 100,
        breakdown: [
          {
            description: `${orderData.serviceType.charAt(0).toUpperCase() + orderData.serviceType.slice(1)} Service`,
            amount: Math.round(quoteAmount * 100) / 100,
          },
        ],
        notes: orderData.details.turnaroundTime === 'rush' ? 'Rush service included' : undefined,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(orderData.createdAt.getTime() + 2 * 60 * 60 * 1000),
        createdBy: 'admin-1',
      };
      quotes.set(order.id, quote); // Store by order.id for easy lookup
      order.quote = quote;
      addTimelineEntry(order.id, 'quoted', `Quote provided: $${quote.amount}`);
    }

    // Add payment if applicable
    if (orderData.hasPayment && order.quote) {
      const quote = order.quote;
      const payment: Payment = {
        id: `PAY-${generateId()}`,
        orderId: order.id,
        userId: testUser.id,
        amount: quote.amount,
        provider: 'mock',
        status: 'succeeded',
        paymentMethod: Math.random() > 0.5 ? 'Visa ****1234' : 'PayPal',
        receiptUrl: `/receipts/${order.id}.txt`,
        createdAt: new Date(orderData.createdAt.getTime() + 4 * 60 * 60 * 1000),
        updatedAt: new Date(orderData.createdAt.getTime() + 4 * 60 * 60 * 1000),
        paidAt: new Date(orderData.createdAt.getTime() + 4 * 60 * 60 * 1000),
      };
      payments.set(payment.id, payment);
      order.payment = payment;
      addTimelineEntry(order.id, 'paid', `Payment received: $${payment.amount}`);
    }

    // Add deliverables if applicable
    if (orderData.hasDeliverables) {
      const deliverablesForOrder: Deliverable[] = [
        {
          id: `DEL-${generateId()}`,
          orderId: order.id,
          filename: `${orderData.details.designName.replace(/\s+/g, '_')}_final.${orderData.details.outputFormat.toLowerCase().split('/')[0]}`,
          filesize: Math.floor(Math.random() * 2000000) + 100000,
          mimetype: 'application/octet-stream',
          downloadUrl: '/deliverables/sample.dst',
          uploadedAt: new Date(orderData.createdAt.getTime() + 12 * 60 * 60 * 1000),
          uploadedBy: 'admin-1',
        },
        {
          id: `DEL-${generateId()}`,
          orderId: order.id,
          filename: `${orderData.details.designName.replace(/\s+/g, '_')}_preview.pdf`,
          filesize: Math.floor(Math.random() * 1000000) + 50000,
          mimetype: 'application/pdf',
          downloadUrl: '/deliverables/preview.pdf',
          uploadedAt: new Date(orderData.createdAt.getTime() + 12 * 60 * 60 * 1000),
          uploadedBy: 'admin-1',
        },
      ];
      deliverables.set(order.id, deliverablesForOrder);
      order.deliverables = deliverablesForOrder;
      addTimelineEntry(order.id, 'in_progress', 'Work in progress');
      addTimelineEntry(order.id, 'complete', 'Order completed - files ready for download');
    } else if (order.status === 'in_progress') {
      addTimelineEntry(order.id, 'in_progress', 'Work in progress');
    } else if (order.status === 'cancelled') {
      addTimelineEntry(order.id, 'cancelled', 'Order cancelled by customer request');
    }
  }

  console.log(`Mock data seeded: ${orders.size} orders, ${quotes.size} quotes, ${payments.size} payments`);
}

/**
 * Clear all data
 */
export function clearData(): void {
  users.clear();
  orders.clear();
  quotes.clear();
  payments.clear();
  deliverables.clear();
  orderTimelines.clear();
  currentUserId = null;
}

/**
 * Get current user ID (for development)
 */
export function getCurrentUserId(): string | null {
  return currentUserId;
}

/**
 * Set current user ID (for development)
 */
export function setCurrentUserId(userId: string | null): void {
  currentUserId = userId;
}
