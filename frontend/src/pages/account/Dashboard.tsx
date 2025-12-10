import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountLayout } from '../../components/AccountLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getUserProfile, listOrders } from '../../api/mockApi';
import type { UserProfile, Order } from '../../types';
import { SERVICE_TYPES } from '../../types';
import { Package, Clock, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, ordersRes] = await Promise.all([
        getUserProfile(),
        listOrders(),
      ]);

      if (profileRes.success && profileRes.data) {
        setProfile(profileRes.data);
      }

      if (ordersRes.success && ordersRes.data) {
        // Get 5 most recent orders
        setRecentOrders(ordersRes.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const pendingPayments = recentOrders.filter(o => o.status === 'quoted').length;

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
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your orders and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover>
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {profile?.totalOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {profile?.activeOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-brand-orange" />
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pendingPayments}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {profile?.completedOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link
              to="/account/orders"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No orders yet</p>
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
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Service
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Design Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900">
                            #{order.id.slice(-8)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {SERVICE_TYPES[order.serviceType].name}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-900">
                            {order.details.designName}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={order.status} size="sm" />
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            to={`/account/orders/${order.id}`}
                            className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover"
                          >
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/order"
            className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow"
          >
            <Package className="w-8 h-8 text-brand-orange mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">New Order</h3>
            <p className="text-sm text-gray-600">Submit a new digitizing request</p>
          </Link>

          <Link
            to="/account/orders"
            className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow"
          >
            <Clock className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Orders</h3>
            <p className="text-sm text-gray-600">View all your orders and their status</p>
          </Link>

          <Link
            to="/account/payments"
            className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow"
          >
            <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payments</h3>
            <p className="text-sm text-gray-600">View payment history and receipts</p>
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
}
