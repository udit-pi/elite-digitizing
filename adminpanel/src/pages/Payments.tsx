import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { listPayments } from '../api/mockAdminApi';
import type { Payment } from '../types';

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const response = await listPayments();
    if (response.success && response.data) {
      setPayments(response.data);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">View all payment transactions</p>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading payments...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Provider</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{payment.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{payment.orderId}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">${payment.amount}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={payment.status} type="payment" />
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 capitalize">{payment.provider}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
