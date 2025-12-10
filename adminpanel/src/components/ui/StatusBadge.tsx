import type { OrderStatus, PaymentStatus, ContactStatus } from '../../types';
import { ORDER_STATUS_INFO, PAYMENT_STATUS_INFO, CONTACT_STATUS_INFO } from '../../types';

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus | ContactStatus;
  type: 'order' | 'payment' | 'contact';
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const getStatusInfo = () => {
    switch (type) {
      case 'order':
        return ORDER_STATUS_INFO[status as OrderStatus];
      case 'payment':
        return PAYMENT_STATUS_INFO[status as PaymentStatus];
      case 'contact':
        return CONTACT_STATUS_INFO[status as ContactStatus];
      default:
        return { label: status, color: 'gray' };
    }
  };

  const info = getStatusInfo();
  
  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[info.color]}`}>
      {info.label}
    </span>
  );
}
