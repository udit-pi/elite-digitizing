// Admin Panel Type Definitions

// ============================================================================
// Admin User Types
// ============================================================================

export type AdminRole = 'admin' | 'manager';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface AdminLoginData {
  email: string;
  password: string;
}

// ============================================================================
// Order Types (Admin View)
// ============================================================================

export type OrderStatus =
  | 'pending'
  | 'quoted'
  | 'paid'
  | 'in_progress'
  | 'complete'
  | 'cancelled';

export type ServiceType = 'digitizing' | 'patches' | 'vector';

export interface OrderFile {
  id: string;
  filename: string;
  filesize: number;
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
  quantity?: number;
  backingType?: string;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  serviceType: ServiceType;
  status: OrderStatus;
  details: OrderDetails;
  files: OrderFile[];
  createdAt: Date;
  updatedAt: Date;
  quote?: Quote;
  payment?: Payment;
  deliverables?: Deliverable[];
  messages?: Message[];
}

export interface Quote {
  id: string;
  orderId: string;
  amount: number;
  breakdown: QuoteBreakdownItem[];
  notes?: string;
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface QuoteBreakdownItem {
  description: string;
  amount: number;
}

// ============================================================================
// Payment Types
// ============================================================================

export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  provider: string;
  paymentMethod?: string;
  transactionId?: string;
  errorLog?: string;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
}

// ============================================================================
// Contact Form Types
// ============================================================================

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  repliedAt?: Date;
  repliedBy?: string;
  notes?: string;
}

// ============================================================================
// Message Types
// ============================================================================

export interface Message {
  id: string;
  orderId: string;
  fromAdmin: boolean;
  senderName: string;
  content: string;
  emailSent: boolean;
  createdAt: Date;
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
  uploadedBy: string;
}

// ============================================================================
// Dashboard Stats
// ============================================================================

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  pendingPayments: number;
  newContacts: number;
  todayOrders: number;
}

// ============================================================================
// Filters
// ============================================================================

export interface OrderFilters {
  status?: OrderStatus[];
  serviceType?: ServiceType[];
  searchQuery?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface PaymentFilters {
  status?: PaymentStatus[];
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ContactFilters {
  status?: ContactStatus[];
  dateFrom?: Date;
  dateTo?: Date;
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

// ============================================================================
// Form Data Types
// ============================================================================

export interface QuoteFormData {
  amount: number;
  breakdown: QuoteBreakdownItem[];
  notes?: string;
  expiresAt?: Date;
}

export interface MessageFormData {
  content: string;
  sendEmail: boolean;
}

export interface CreateAdminData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================================================
// Constants
// ============================================================================

export const ORDER_STATUS_INFO: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pending Review', color: 'yellow' },
  quoted: { label: 'Quote Ready', color: 'blue' },
  paid: { label: 'Paid', color: 'green' },
  in_progress: { label: 'In Progress', color: 'purple' },
  complete: { label: 'Complete', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

export const PAYMENT_STATUS_INFO: Record<PaymentStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'yellow' },
  processing: { label: 'Processing', color: 'blue' },
  succeeded: { label: 'Succeeded', color: 'green' },
  failed: { label: 'Failed', color: 'red' },
  refunded: { label: 'Refunded', color: 'gray' },
};

export const CONTACT_STATUS_INFO: Record<ContactStatus, { label: string; color: string }> = {
  new: { label: 'New', color: 'blue' },
  read: { label: 'Read', color: 'yellow' },
  replied: { label: 'Replied', color: 'green' },
  archived: { label: 'Archived', color: 'gray' },
};

export const SERVICE_TYPE_INFO: Record<ServiceType, { name: string; icon: string }> = {
  digitizing: { name: 'Embroidery Digitizing', icon: '✂️' },
  patches: { name: 'Custom Patches', icon: '🏷️' },
  vector: { name: 'Vector Conversion', icon: '🎨' },
};
