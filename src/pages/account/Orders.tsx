import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountLayout } from '../../components/AccountLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { listOrders } from '../../api/mockApi';
import type { Order, OrderStatus, ServiceType, OrderFilters } from '../../types';
import { SERVICE_TYPES } from '../../types';
import { Search, Filter, Package } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus[]>([]);
  const [serviceFilter, setServiceFilter] = useState<ServiceType[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, searchQuery, statusFilter, serviceFilter]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await listOrders();
      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        o =>
          o.id.toLowerCase().includes(query) ||
          o.details.designName.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter.length > 0) {
      filtered = filtered.filter(o => statusFilter.includes(o.status));
    }

    // Service filter
    if (serviceFilter.length > 0) {
      filtered = filtered.filter(o => serviceFilter.includes(o.serviceType));
    }

    setFilteredOrders(filtered);
  };

  const toggleStatusFilter = (status: OrderStatus) => {
    setStatusFilter(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleServiceFilter = (service: ServiceType) => {
    setServiceFilter(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-600">Manage and track all your orders</p>
          </div>
          <Link
            to="/order"
            className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            New Order
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or design name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>

            {/* Status and Service Filters on Same Line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="inline w-4 h-4 mr-1" />
                  Filter by Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'quoted', 'paid', 'in_progress', 'complete'] as OrderStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={() => toggleStatusFilter(status)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        statusFilter.includes(status)
                          ? 'bg-brand-orange text-white border-brand-orange'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-orange'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Service
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['digitizing', 'patches', 'vector'] as ServiceType[]).map(service => (
                    <button
                      key={service}
                      onClick={() => toggleServiceFilter(service)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        serviceFilter.includes(service)
                          ? 'bg-brand-orange text-white border-brand-orange'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-orange'
                      }`}
                    >
                      {SERVICE_TYPES[service].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || statusFilter.length > 0 || serviceFilter.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter([]);
                  setServiceFilter([]);
                }}
                className="text-sm text-brand-orange hover:text-brand-orange-hover font-medium"
              >
                Clear all filters
              </button>
            )}
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card padding="none">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 px-6">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">
                {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
              </p>
              {orders.length === 0 && (
                <Link
                  to="/order"
                  className="inline-block px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg transition-all"
                >
                  Create Your First Order
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Service
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Design Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">
                          #{order.id.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {SERVICE_TYPES[order.serviceType].name}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-gray-900">
                          {order.details.designName}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {order.quote ? (
                          <span className="text-sm font-medium text-gray-900">
                            ${order.quote.amount}
                          </span>
                        ) : order.estimatedPrice ? (
                          <span className="text-sm text-gray-600">
                            ${order.estimatedPrice.min}-${order.estimatedPrice.max}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Pending</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/account/orders/${order.id}`}
                          className="text-sm font-medium text-brand-orange hover:text-brand-orange-hover"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Results Count */}
        {filteredOrders.length > 0 && (
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        )}
      </div>
    </AccountLayout>
  );
}
