import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AccountLayout } from '../../components/AccountLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { PaymentModal } from '../../components/PaymentModal';
import { getOrder } from '../../api/mockApi';
import type { OrderWithTimeline } from '../../types';
import { SERVICE_TYPES } from '../../types';
import {
  ArrowLeft,
  Download,
  FileText,
  Clock,
  DollarSign,
  Package,
  MessageSquare,
  CreditCard,
  CheckCircle,
} from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderWithTimeline | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadOrder(id);
    }
  }, [id]);

  const loadOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      const response = await getOrder(orderId);
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        console.error('Order not found');
        navigate('/account/orders');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      navigate('/account/orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    if (id) {
      loadOrder(id);
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

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const showPaymentButton = 
    order && order.status === 'quoted' && order.quote && !order.payment;

  const showDeliverables = 
    order && order.status === 'complete' && order.deliverables && order.deliverables.length > 0;

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
        </div>
      </AccountLayout>
    );
  }

  if (!order) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Order not found</p>
          <Link to="/account/orders" className="text-brand-orange hover:underline mt-4 inline-block">
            Back to Orders
          </Link>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          to="/account/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order #{order.id.slice(-8)}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Created {formatDate(order.createdAt)}</span>
              <span>•</span>
              <span>{SERVICE_TYPES[order.serviceType].name}</span>
            </div>
          </div>
          <StatusBadge status={order.status} size="lg" />
        </div>

        {/* Payment CTA */}
        {showPaymentButton && (
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Payment Required
                </h3>
                <p className="text-gray-600">
                  Your quote is ready. Pay ${order.quote?.amount} to proceed with your order.
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay Now
              </button>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Design Name</p>
                    <p className="text-base font-medium text-gray-900">
                      {order.details.designName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Complexity</p>
                    <p className="text-base font-medium text-gray-900 capitalize">
                      {order.details.complexity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dimensions</p>
                    <p className="text-base font-medium text-gray-900">
                      {order.details.width} × {order.details.height} {order.details.units}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Output Format</p>
                    <p className="text-base font-medium text-gray-900">
                      {order.details.outputFormat}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Turnaround</p>
                    <p className="text-base font-medium text-gray-900 capitalize">
                      {order.details.turnaroundTime}
                    </p>
                  </div>
                  {order.details.quantity && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Quantity</p>
                      <p className="text-base font-medium text-gray-900">
                        {order.details.quantity} pieces
                      </p>
                    </div>
                  )}
                </div>

                {order.details.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Additional Notes</p>
                    <p className="text-base text-gray-900">{order.details.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent>
                {order.files.length > 0 ? (
                  <div className="space-y-2">
                    {order.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.filename}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.filesize)}
                            </p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          download={file.filename}
                          className="ml-2 p-2 text-brand-orange hover:bg-orange-50 rounded transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No files uploaded</p>
                )}
              </CardContent>
            </Card>

            {/* Quote */}
            {order.quote && (
              <Card>
                <CardHeader>
                  <CardTitle>Quote</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-brand-orange">
                      ${order.quote.amount}
                    </span>
                  </div>

                  {order.quote.breakdown.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Breakdown</p>
                      <div className="space-y-2">
                        {order.quote.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.description}</span>
                            <span className="text-gray-900 font-medium">${item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {order.quote.notes && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-700">{order.quote.notes}</p>
                    </div>
                  )}

                  {order.quote.expiresAt && (
                    <p className="text-xs text-gray-500 text-center">
                      Quote expires on {formatDate(order.quote.expiresAt)}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Deliverables */}
            {showDeliverables && (
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Deliverables Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Your order is complete! Download your files below.
                  </p>
                  <div className="space-y-2">
                    {order.deliverables!.map((deliverable) => (
                      <div
                        key={deliverable.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {deliverable.filename}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(deliverable.filesize)} • Uploaded{' '}
                              {formatDate(deliverable.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <a
                          href={deliverable.downloadUrl}
                          download={deliverable.filename}
                          className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Request Revision
              </button>
              <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((entry, index) => (
                    <div key={index} className="relative pl-6">
                      {/* Timeline Line */}
                      {index < order.timeline.length - 1 && (
                        <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                      )}

                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1.5 w-4 h-4 bg-brand-orange rounded-full border-2 border-white"></div>

                      {/* Timeline Content */}
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {entry.status.replace('_', ' ')}
                        </p>
                        {entry.note && (
                          <p className="text-xs text-gray-600 mt-1">{entry.note}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(entry.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            {order.payment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className="text-sm font-medium text-green-600 capitalize">
                      {order.payment.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${order.payment.amount}
                    </span>
                  </div>
                  {order.payment.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Paid On</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(order.payment.paidAt)}
                      </span>
                    </div>
                  )}
                  {order.payment.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Method</span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.payment.paymentMethod}
                      </span>
                    </div>
                  )}
                  {order.payment.receiptUrl && (
                    <Link
                      to={`/account/payments`}
                      className="block w-full mt-3 px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      View Receipt
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    #{order.id.slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Service</span>
                  <span className="text-sm font-medium text-gray-900">
                    {SERVICE_TYPES[order.serviceType].name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(order.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {order && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          order={order}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </AccountLayout>
  );
}
