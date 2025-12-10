import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { listOrders } from '../../api/mockAdminApi';
import type { Order } from '../../types';
import { Search, Eye } from 'lucide-react';

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const response = await listOrders();
    if (response.success && response.data) {
      setOrders(response.data);
    }
    setLoading(false);
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600 mt-1">Manage all customer orders</p>
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-primary focus:border-transparent"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading orders...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.userName}</p>
                            <p className="text-xs text-gray-500">{order.userEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 capitalize">{order.serviceType}</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={order.status} type="order" />
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`/orders/${order.id}`}
                            className="inline-flex items-center gap-1 text-sm text-admin-primary hover:text-admin-primary-hover"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
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
