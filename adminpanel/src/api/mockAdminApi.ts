/**
 * Mock Admin API Module
 * Complete admin panel backend simulation
 */

import type {
  AdminUser,
  AdminRole,
  Order,
  OrderStatus,
  ServiceType,
  Quote,
  Payment,
  PaymentStatus,
  ContactForm,
  ContactStatus,
  Message,
  Deliverable,
  DashboardStats,
  OrderFilters,
  PaymentFilters,
  ContactFilters,
  QuoteFormData,
  MessageFormData,
  CreateAdminData,
  ApiResponse,
} from '../types';

// Data Stores
const adminUsers: Map<string, AdminUser & { password: string }> = new Map();
const orders: Map<string, Order> = new Map();
const payments: Map<string, Payment> = new Map();
const contacts: Map<string, ContactForm> = new Map();
const messages: Map<string, Message[]> = new Map();

let currentAdminId: string | null = null;

// Helper Functions
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// Authentication
// ============================================================================

export async function loginAdmin(email: string, password: string): Promise<ApiResponse<AdminUser>> {
  await delay(500);

  for (const [id, admin] of adminUsers.entries()) {
    if (admin.email === email && admin.password === password) {
      currentAdminId = id;
      admin.lastLogin = new Date();
      
      const { password: _, ...adminData } = admin;
      return {
        success: true,
        data: adminData,
        message: 'Login successful',
      };
    }
  }

  return {
    success: false,
    error: 'Invalid email or password',
  };
}

export async function logoutAdmin(): Promise<ApiResponse<void>> {
  await delay(200);
  currentAdminId = null;
  return { success: true, message: 'Logged out successfully' };
}

export async function getCurrentAdmin(): Promise<ApiResponse<AdminUser | null>> {
  await delay(200);
  
  if (!currentAdminId) {
    return { success: true, data: null };
  }

  const admin = adminUsers.get(currentAdminId);
  if (!admin) {
    return { success: true, data: null };
  }

  const { password: _, ...adminData } = admin;
  return { success: true, data: adminData };
}

// ============================================================================
// Dashboard
// ============================================================================

export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  await delay(400);

  const allOrders = Array.from(orders.values());
  const allPayments = Array.from(payments.values());
  const allContacts = Array.from(contacts.values());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats: DashboardStats = {
    totalOrders: allOrders.length,
    pendingOrders: allOrders.filter(o => o.status === 'pending').length,
    activeOrders: allOrders.filter(o => ['pending', 'quoted', 'paid', 'in_progress'].includes(o.status)).length,
    completedOrders: allOrders.filter(o => o.status === 'complete').length,
    totalRevenue: allPayments
      .filter(p => p.status === 'succeeded')
      .reduce((sum, p) => sum + p.amount, 0),
    pendingPayments: allPayments.filter(p => p.status === 'pending').length,
    newContacts: allContacts.filter(c => c.status === 'new').length,
    todayOrders: allOrders.filter(o => o.createdAt >= today).length,
  };

  return { success: true, data: stats };
}

export async function getRecentOrders(limit: number = 5): Promise<ApiResponse<Order[]>> {
  await delay(300);
  
  const recent = Array.from(orders.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);

  return { success: true, data: recent };
}

export async function getRecentContacts(limit: number = 5): Promise<ApiResponse<ContactForm[]>> {
  await delay(300);
  
  const recent = Array.from(contacts.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);

  return { success: true, data: recent };
}

// ============================================================================
// Orders Management
// ============================================================================

export async function listOrders(filters?: OrderFilters): Promise<ApiResponse<Order[]>> {
  await delay(400);

  let result = Array.from(orders.values());

  if (filters) {
    if (filters.status && filters.status.length > 0) {
      result = result.filter(o => filters.status!.includes(o.status));
    }
    if (filters.serviceType && filters.serviceType.length > 0) {
      result = result.filter(o => filters.serviceType!.includes(o.serviceType));
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(o =>
        o.id.toLowerCase().includes(query) ||
        o.details.designName.toLowerCase().includes(query) ||
        o.userEmail.toLowerCase().includes(query) ||
        o.userName.toLowerCase().includes(query)
      );
    }
    if (filters.dateFrom) {
      result = result.filter(o => o.createdAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter(o => o.createdAt <= filters.dateTo!);
    }
  }

  result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return { success: true, data: result };
}

export async function getOrder(orderId: string): Promise<ApiResponse<Order>> {
  await delay(300);

  const order = orders.get(orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  return { success: true, data: order };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<ApiResponse<Order>> {
  await delay(500);

  const order = orders.get(orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  order.status = status;
  order.updatedAt = new Date();
  orders.set(orderId, order);

  return { success: true, data: order, message: 'Order status updated' };
}

export async function addQuoteToOrder(
  orderId: string,
  quoteData: QuoteFormData
): Promise<ApiResponse<Quote>> {
  await delay(600);

  const order = orders.get(orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  const quote: Quote = {
    id: generateId(),
    orderId,
    amount: quoteData.amount,
    breakdown: quoteData.breakdown,
    notes: quoteData.notes,
    expiresAt: quoteData.expiresAt,
    createdAt: new Date(),
    createdBy: currentAdminId || 'admin',
  };

  order.quote = quote;
  order.status = 'quoted';
  order.updatedAt = new Date();
  orders.set(orderId, order);

  return { success: true, data: quote, message: 'Quote added successfully' };
}

export async function uploadDeliverable(
  orderId: string,
  file: File
): Promise<ApiResponse<Deliverable>> {
  await delay(1000);

  const order = orders.get(orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  const deliverable: Deliverable = {
    id: generateId(),
    orderId,
    filename: file.name,
    filesize: file.size,
    mimetype: file.type,
    downloadUrl: URL.createObjectURL(file),
    uploadedAt: new Date(),
    uploadedBy: currentAdminId || 'admin',
  };

  if (!order.deliverables) {
    order.deliverables = [];
  }
  order.deliverables.push(deliverable);
  order.updatedAt = new Date();
  orders.set(orderId, order);

  return { success: true, data: deliverable, message: 'File uploaded successfully' };
}

export async function sendMessageToClient(
  orderId: string,
  messageData: MessageFormData
): Promise<ApiResponse<Message>> {
  await delay(500);

  const order = orders.get(orderId);
  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  const admin = currentAdminId ? adminUsers.get(currentAdminId) : null;

  const message: Message = {
    id: generateId(),
    orderId,
    fromAdmin: true,
    senderName: admin ? `${admin.firstName} ${admin.lastName}` : 'Admin',
    content: messageData.content,
    emailSent: messageData.sendEmail,
    createdAt: new Date(),
  };

  const orderMessages = messages.get(orderId) || [];
  orderMessages.push(message);
  messages.set(orderId, orderMessages);

  if (!order.messages) {
    order.messages = [];
  }
  order.messages.push(message);
  orders.set(orderId, order);

  return { 
    success: true, 
    data: message, 
    message: messageData.sendEmail ? 'Message sent and email delivered' : 'Message sent' 
  };
}

// ============================================================================
// Payments Management
// ============================================================================

export async function listPayments(filters?: PaymentFilters): Promise<ApiResponse<Payment[]>> {
  await delay(400);

  let result = Array.from(payments.values());

  if (filters) {
    if (filters.status && filters.status.length > 0) {
      result = result.filter(p => filters.status!.includes(p.status));
    }
    if (filters.dateFrom) {
      result = result.filter(p => p.createdAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter(p => p.createdAt <= filters.dateTo!);
    }
  }

  result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return { success: true, data: result };
}

export async function getPayment(paymentId: string): Promise<ApiResponse<Payment>> {
  await delay(300);

  const payment = payments.get(paymentId);
  if (!payment) {
    return { success: false, error: 'Payment not found' };
  }

  return { success: true, data: payment };
}

// ============================================================================
// Contact Forms Management
// ============================================================================

export async function listContacts(filters?: ContactFilters): Promise<ApiResponse<ContactForm[]>> {
  await delay(400);

  let result = Array.from(contacts.values());

  if (filters) {
    if (filters.status && filters.status.length > 0) {
      result = result.filter(c => filters.status!.includes(c.status));
    }
    if (filters.dateFrom) {
      result = result.filter(c => c.createdAt >= filters.dateFrom!);
    }
    if (filters.dateTo) {
      result = result.filter(c => c.createdAt <= filters.dateTo!);
    }
  }

  result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return { success: true, data: result };
}

export async function getContact(contactId: string): Promise<ApiResponse<ContactForm>> {
  await delay(300);

  const contact = contacts.get(contactId);
  if (!contact) {
    return { success: false, error: 'Contact not found' };
  }

  // Auto-mark as read
  if (contact.status === 'new') {
    contact.status = 'read';
    contacts.set(contactId, contact);
  }

  return { success: true, data: contact };
}

export async function updateContactStatus(
  contactId: string,
  status: ContactStatus
): Promise<ApiResponse<ContactForm>> {
  await delay(400);

  const contact = contacts.get(contactId);
  if (!contact) {
    return { success: false, error: 'Contact not found' };
  }

  contact.status = status;
  if (status === 'replied') {
    contact.repliedAt = new Date();
    contact.repliedBy = currentAdminId || 'admin';
  }
  contacts.set(contactId, contact);

  return { success: true, data: contact, message: 'Contact status updated' };
}

// ============================================================================
// Admin Users Management
// ============================================================================

export async function listAdminUsers(): Promise<ApiResponse<AdminUser[]>> {
  await delay(400);

  const currentAdmin = currentAdminId ? adminUsers.get(currentAdminId) : null;
  
  // Managers can't see this
  if (currentAdmin && currentAdmin.role === 'manager') {
    return { success: false, error: 'Access denied' };
  }

  const result = Array.from(adminUsers.values()).map(({ password: _, ...admin }) => admin);
  return { success: true, data: result };
}

export async function createAdminUser(data: CreateAdminData): Promise<ApiResponse<AdminUser>> {
  await delay(600);

  const currentAdmin = currentAdminId ? adminUsers.get(currentAdminId) : null;
  
  // Only admins can create users
  if (currentAdmin && currentAdmin.role !== 'admin') {
    return { success: false, error: 'Only admins can create users' };
  }

  // Check if email exists
  for (const admin of adminUsers.values()) {
    if (admin.email === data.email) {
      return { success: false, error: 'Email already exists' };
    }
  }

  const newAdmin: AdminUser & { password: string } = {
    id: generateId(),
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    createdAt: new Date(),
    isActive: true,
  };

  adminUsers.set(newAdmin.id, newAdmin);

  const { password: _, ...adminData } = newAdmin;
  return { success: true, data: adminData, message: 'Admin user created successfully' };
}

export async function toggleAdminStatus(adminId: string): Promise<ApiResponse<AdminUser>> {
  await delay(400);

  const currentAdmin = currentAdminId ? adminUsers.get(currentAdminId) : null;
  
  if (currentAdmin && currentAdmin.role !== 'admin') {
    return { success: false, error: 'Access denied' };
  }

  const admin = adminUsers.get(adminId);
  if (!admin) {
    return { success: false, error: 'Admin user not found' };
  }

  admin.isActive = !admin.isActive;
  adminUsers.set(adminId, admin);

  const { password: _, ...adminData } = admin;
  return { success: true, data: adminData, message: 'Admin status updated' };
}

// ============================================================================
// Profile Management
// ============================================================================

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<void>> {
  await delay(500);

  if (!currentAdminId) {
    return { success: false, error: 'Not authenticated' };
  }

  const admin = adminUsers.get(currentAdminId);
  if (!admin) {
    return { success: false, error: 'Admin not found' };
  }

  if (admin.password !== currentPassword) {
    return { success: false, error: 'Current password is incorrect' };
  }

  admin.password = newPassword;
  adminUsers.set(currentAdminId, admin);

  return { success: true, message: 'Password changed successfully' };
}

// ============================================================================
// Seed Data
// ============================================================================

export function seedAdminData(): void {
  // Create admin users
  const admin1: AdminUser & { password: string } = {
    id: 'admin-1',
    email: 'admin@elitedigitizing.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(),
    isActive: true,
  };

  const manager1: AdminUser & { password: string } = {
    id: 'manager-1',
    email: 'manager@elitedigitizing.com',
    password: 'manager123',
    firstName: 'Manager',
    lastName: 'User',
    role: 'manager',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    isActive: true,
  };

  adminUsers.set(admin1.id, admin1);
  adminUsers.set(manager1.id, manager1);

  // Create sample orders
  const sampleOrders: Order[] = [
    {
      id: 'ORD-001',
      userId: 'user-1',
      userEmail: 'john@example.com',
      userName: 'John Doe',
      serviceType: 'digitizing',
      status: 'pending',
      details: {
        designName: 'Company Logo Design',
        width: 4,
        height: 4,
        units: 'inches',
        outputFormat: 'DST',
        complexity: 'medium',
        turnaroundTime: 'standard',
        notes: 'Please ensure high quality',
      },
      files: [{
        id: 'file-1',
        filename: 'logo.png',
        filesize: 1024000,
        mimetype: 'image/png',
        url: '/mock/logo.png',
        uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      }],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 'ORD-002',
      userId: 'user-2',
      userEmail: 'sarah@example.com',
      userName: 'Sarah Smith',
      serviceType: 'patches',
      status: 'quoted',
      details: {
        designName: 'Team Patches',
        width: 3,
        height: 3,
        units: 'inches',
        outputFormat: 'JPG/PNG',
        complexity: 'simple',
        turnaroundTime: 'standard',
        quantity: 100,
        backingType: 'Iron-on',
      },
      files: [{
        id: 'file-2',
        filename: 'team-logo.jpg',
        filesize: 2048000,
        mimetype: 'image/jpeg',
        url: '/mock/team-logo.jpg',
        uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      }],
      quote: {
        id: 'quote-1',
        orderId: 'ORD-002',
        amount: 350,
        breakdown: [
          { description: 'Custom Patches - 100 pieces', amount: 350 }
        ],
        notes: 'Rush delivery available for extra $50',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
        createdBy: 'admin-1',
      },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    },
    {
      id: 'ORD-003',
      userId: 'user-3',
      userEmail: 'mike@example.com',
      userName: 'Mike Johnson',
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
      files: [{
        id: 'file-3',
        filename: 'vintage-logo.png',
        filesize: 3072000,
        mimetype: 'image/png',
        url: '/mock/vintage-logo.png',
        uploadedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      }],
      quote: {
        id: 'quote-2',
        orderId: 'ORD-003',
        amount: 85,
        breakdown: [
          { description: 'Vector Conversion - Complex', amount: 65 },
          { description: 'Rush Service', amount: 20 }
        ],
        createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
        createdBy: 'admin-1',
      },
      payment: {
        id: 'pay-1',
        orderId: 'ORD-003',
        userId: 'user-3',
        amount: 85,
        status: 'succeeded',
        provider: 'stripe',
        paymentMethod: 'Visa ****1234',
        transactionId: 'txn_123456',
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
        paidAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    },
    {
      id: 'ORD-004',
      userId: 'user-1',
      userEmail: 'john@example.com',
      userName: 'John Doe',
      serviceType: 'digitizing',
      status: 'in_progress',
      details: {
        designName: 'Sports Team Logo',
        width: 5,
        height: 5,
        units: 'inches',
        outputFormat: 'PES',
        complexity: 'complex',
        turnaroundTime: 'standard',
      },
      files: [{
        id: 'file-4',
        filename: 'sports-logo.ai',
        filesize: 5120000,
        mimetype: 'application/postscript',
        url: '/mock/sports-logo.ai',
        uploadedAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
      }],
      quote: {
        id: 'quote-3',
        orderId: 'ORD-004',
        amount: 55,
        breakdown: [
          { description: 'Embroidery Digitizing - Complex', amount: 55 }
        ],
        createdAt: new Date(Date.now() - 90 * 60 * 60 * 1000),
        createdBy: 'admin-1',
      },
      payment: {
        id: 'pay-2',
        orderId: 'ORD-004',
        userId: 'user-1',
        amount: 55,
        status: 'succeeded',
        provider: 'paypal',
        paymentMethod: 'PayPal',
        transactionId: 'PP_789012',
        createdAt: new Date(Date.now() - 84 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 84 * 60 * 60 * 1000),
        paidAt: new Date(Date.now() - 84 * 60 * 60 * 1000),
      },
      createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
    },
    {
      id: 'ORD-005',
      userId: 'user-4',
      userEmail: 'emily@example.com',
      userName: 'Emily Brown',
      serviceType: 'digitizing',
      status: 'complete',
      details: {
        designName: 'Brand Logo Set',
        width: 6,
        height: 6,
        units: 'inches',
        outputFormat: 'DST',
        complexity: 'medium',
        turnaroundTime: 'standard',
      },
      files: [{
        id: 'file-5',
        filename: 'brand-logo.eps',
        filesize: 2560000,
        mimetype: 'application/postscript',
        url: '/mock/brand-logo.eps',
        uploadedAt: new Date(Date.now() - 168 * 60 * 60 * 1000),
      }],
      quote: {
        id: 'quote-4',
        orderId: 'ORD-005',
        amount: 30,
        breakdown: [
          { description: 'Embroidery Digitizing - Medium', amount: 30 }
        ],
        createdAt: new Date(Date.now() - 160 * 60 * 60 * 1000),
        createdBy: 'admin-1',
      },
      payment: {
        id: 'pay-3',
        orderId: 'ORD-005',
        userId: 'user-4',
        amount: 30,
        status: 'succeeded',
        provider: 'stripe',
        paymentMethod: 'Mastercard ****5678',
        transactionId: 'txn_345678',
        createdAt: new Date(Date.now() - 156 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 156 * 60 * 60 * 1000),
        paidAt: new Date(Date.now() - 156 * 60 * 60 * 1000),
      },
      deliverables: [
        {
          id: 'del-1',
          orderId: 'ORD-005',
          filename: 'brand-logo-final.dst',
          filesize: 512000,
          mimetype: 'application/octet-stream',
          downloadUrl: '/mock/brand-logo-final.dst',
          uploadedAt: new Date(Date.now() - 144 * 60 * 60 * 1000),
          uploadedBy: 'admin-1',
        },
        {
          id: 'del-2',
          orderId: 'ORD-005',
          filename: 'brand-logo-preview.pdf',
          filesize: 1024000,
          mimetype: 'application/pdf',
          downloadUrl: '/mock/brand-logo-preview.pdf',
          uploadedAt: new Date(Date.now() - 144 * 60 * 60 * 1000),
          uploadedBy: 'admin-1',
        }
      ],
      createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 144 * 60 * 60 * 1000),
    },
  ];

  sampleOrders.forEach(order => orders.set(order.id, order));

  // Create sample payments
  sampleOrders.forEach(order => {
    if (order.payment) {
      payments.set(order.payment.id, order.payment);
    }
  });

  // Add a failed payment example
  const failedPayment: Payment = {
    id: 'pay-failed-1',
    orderId: 'ORD-006',
    userId: 'user-5',
    amount: 45,
    status: 'failed',
    provider: 'stripe',
    errorLog: 'Card declined - insufficient funds',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  };
  payments.set(failedPayment.id, failedPayment);

  // Create sample contact forms
  const sampleContacts: ContactForm[] = [
    {
      id: 'contact-1',
      name: 'Alice Williams',
      email: 'alice@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Question about turnaround time',
      message: 'Hi, I need to know if you can complete a complex digitizing project within 12 hours. I have a tight deadline.',
      status: 'new',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: 'contact-2',
      name: 'Bob Martinez',
      email: 'bob@example.com',
      subject: 'Bulk order inquiry',
      message: 'I need to order 500 custom patches for a corporate event. Can you provide a bulk discount?',
      status: 'read',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
    {
      id: 'contact-3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      phone: '+1 (555) 987-6543',
      subject: 'File format question',
      message: 'What file formats do you accept for vector conversion? I have an old logo in TIFF format.',
      status: 'replied',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      repliedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      repliedBy: 'admin-1',
      notes: 'Sent list of accepted formats. Client will reupload in PNG.',
    },
  ];

  sampleContacts.forEach(contact => contacts.set(contact.id, contact));

  console.log('Admin panel mock data seeded: 2 admins, 5 orders, 4 payments, 3 contacts');
}

export function getCurrentAdminId(): string | null {
  return currentAdminId;
}

export function setCurrentAdminId(id: string | null): void {
  currentAdminId = id;
}
