import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Calendar,
  Eye
} from 'lucide-react';
import { getDashboardStats, getRecentOrders, getRecentContacts } from '../api/mockAdminApi';
import type { DashboardStats, Order, ContactForm } from '../types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, contactsRes] = await Promise.all([
        getDashboardStats(),
        getRecentOrders(5),
        getRecentContacts(5),
      ]);

      if (statsRes.success && statsRes.data) setStats(statsRes.data);
      if (ordersRes.success && ordersRes.data) setRecentOrders(ordersRes.data);
      if (contactsRes.success && contactsRes.data) setRecentContacts(contactsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.pendingOrders || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.completedOrders || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats?.totalRevenue || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.activeOrders || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.pendingPayments || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.newContacts || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.todayOrders || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link 
                to="/orders" 
                className="text-sm text-admin-primary hover:text-admin-primary-hover"
              >
                View all
              </Link>
            </div>
          </div>
          <CardContent>
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
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.userName}</td>
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
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Contact Forms</h2>
              <Link 
                to="/contacts" 
                className="text-sm text-admin-primary hover:text-admin-primary-hover"
              >
                View all
              </Link>
            </div>
          </div>
          <CardContent>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <StatusBadge status={contact.status} type="contact" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{contact.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">{contact.email}</p>
                  </div>
                  <Link
                    to={`/contacts/${contact.id}`}
                    className="ml-4 inline-flex items-center gap-1 text-sm text-admin-primary hover:text-admin-primary-hover"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
