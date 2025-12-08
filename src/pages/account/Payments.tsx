import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountLayout } from '../../components/AccountLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { listPayments } from '../../api/mockApi';
import type { Payment } from '../../types';
import { CreditCard, Download, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setIsLoading(true);
    try {
      const response = await listPayments();
      if (response.success && response.data) {
        setPayments(response.data);
      }
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const downloadReceipt = (payment: Payment) => {
    // Mock receipt download
    const receiptContent = `
ELITE DIGITIZING - PAYMENT RECEIPT
=====================================

Receipt #: ${payment.id}
Order ID: ${payment.orderId}
Date: ${formatDate(payment.paidAt || payment.createdAt)}

Amount Paid: $${payment.amount}
Payment Method: ${payment.paymentMethod || 'N/A'}
Transaction ID: ${payment.transactionId || 'N/A'}
Status: ${payment.status.toUpperCase()}

=====================================
Thank you for your business!

Support: support@elitedigitizing.com
Website: www.elitedigitizing.com
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.id.slice(-8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="mt-2 text-gray-600">View all your payment transactions and receipts</p>
        </div>

        {/* Payments List */}
        <Card padding="none">
          {payments.length === 0 ? (
            <div className="text-center py-12 px-6">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No payments yet</p>
              <Link
                to="/order"
                className="inline-block px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg transition-all"
              >
                Create Your First Order
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Payment ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Method
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">
                          #{payment.id.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/account/orders/${payment.orderId}`}
                          className="text-sm text-brand-orange hover:underline"
                        >
                          #{payment.orderId.slice(-8)}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-semibold text-gray-900">
                          ${payment.amount}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {payment.paymentMethod || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {formatDate(payment.paidAt || payment.createdAt)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {payment.status === 'succeeded' && (
                          <button
                            onClick={() => downloadReceipt(payment)}
                            className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Summary */}
        {payments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {payments
                    .filter((p) => p.status === 'succeeded')
                    .reduce((sum, p) => sum + p.amount, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600 mb-1">Successful</p>
                <p className="text-2xl font-bold text-green-600">
                  {payments.filter((p) => p.status === 'succeeded').length}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
