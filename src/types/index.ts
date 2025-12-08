// Core type definitions for Elite Digitizing

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
}

// ============================================================================
// Service Types
// ============================================================================

export type ServiceType = 'digitizing' | 'patches' | 'vector';

export interface ServiceDetails {
  type: ServiceType;
  name: string;
  description: string;
}

export const SERVICE_TYPES: Record<ServiceType, ServiceDetails> = {
  digitizing: {
    type: 'digitizing',
    name: 'Embroidery Digitizing',
    description: 'Convert artwork to machine-readable embroidery files',
  },
  patches: {
    type: 'patches',
    name: 'Custom Patches',
    description: 'Physical embroidered patches',
  },
  vector: {
    type: 'vector',
    name: 'Vector Conversion',
    description: 'Convert raster images to scalable vector graphics',
  },
};

// ============================================================================
// Order Types
// ============================================================================

export type OrderStatus =
  | 'pending'           // Initial state after submission
  | 'quoted'            // Admin has provided a quote - ready for payment
  | 'paid'              // Payment received
  | 'in_progress'       // Work is being done
  | 'complete'          // Deliverables uploaded and available
  | 'cancelled';        // Order cancelled

export interface OrderStatusInfo {
  status: OrderStatus;
  label: string;
  color: string; // Tailwind color class
  description: string;
}

export const ORDER_STATUSES: Record<OrderStatus, OrderStatusInfo> = {
  pending: {
    status: 'pending',
    label: 'Pending Review',
    color: 'yellow',
    description: 'Your order is being reviewed by our team',
  },
  quoted: {
    status: 'quoted',
    label: 'Quote Ready - Payment Required',
    color: 'blue',
    description: 'Quote is ready. Please proceed with payment to start work.',
  },
  paid: {
    status: 'paid',
    label: 'Paid',
    color: 'green',
    description: 'Payment received, preparing to start work',
  },
  in_progress: {
    status: 'in_progress',
    label: 'In Progress',
    color: 'indigo',
    description: 'Work is currently in progress',
  },
  complete: {
    status: 'complete',
    label: 'Complete',
    color: 'green',
    description: 'Order complete, files ready for download',
  },
  cancelled: {
    status: 'cancelled',
    label: 'Cancelled',
    color: 'red',
    description: 'Order has been cancelled',
  },
};

export interface UploadedFile {
  id: string;
  filename: string;
  filesize: number; // bytes
  mimetype: string;
  url: string;
  uploadedAt: Date;
}

export interface OrderDetails {
  designName: string;
  width: number;
  height: number;
  units: 'inches' | 'centimeters';
  outputFormat: string;
  complexity: 'simple' | 'medium' | 'complex';
  turnaroundTime: 'standard' | 'rush';
  quantity?: number; // For patches
  backingType?: string; // For patches
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: OrderStatus;
  details: OrderDetails;
  files: UploadedFile[];
  createdAt: Date;
  updatedAt: Date;
  estimatedPrice?: {
    min: number;
    max: number;
  };
  quote?: Quote;
  payment?: Payment;
  deliverables?: Deliverable[];
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
}

export interface OrderWithTimeline extends Order {
  timeline: OrderTimeline[];
}

// ============================================================================
// Quote Types
// ============================================================================

export interface QuoteBreakdownItem {
  description: string;
  amount: number;
}

export interface Quote {
  id: string;
  orderId: string;
  amount: number;
  breakdown: QuoteBreakdownItem[];
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string; // Admin user ID
  notes?: string;
}

// ============================================================================
// Payment Types
// ============================================================================

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded';

export type PaymentProvider = 'stripe' | 'paypal' | 'mock';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  transactionId?: string;
  paymentMethod?: string; // e.g., "Visa ****1234"
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  receiptUrl?: string;
}

export interface PaymentSession {
  id: string;
  orderId: string;
  amount: number;
  provider: PaymentProvider;
  sessionUrl?: string; // For real gateway integrations
  expiresAt: Date;
}

// ============================================================================
// Deliverable Types
// ============================================================================

export interface Deliverable {
  id: string;
  orderId: string;
  filename: string;
  filesize: number;
  mimetype: string;
  downloadUrl: string;
  uploadedAt: Date;
  uploadedBy: string; // Admin user ID
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// Form Types
// ============================================================================

export interface OrderFormData {
  serviceType: ServiceType;
  files: File[];
  details: OrderDetails;
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================================================
// Filter & Search Types
// ============================================================================

export interface OrderFilters {
  status?: OrderStatus[];
  serviceType?: ServiceType[];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface PaymentFilters {
  status?: PaymentStatus[];
  dateFrom?: Date;
  dateTo?: Date;
}
