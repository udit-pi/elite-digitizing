import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal, ModalFooter } from '../../components/ui/Modal';
import { getOrder, updateOrderStatus, addQuoteToOrder } from '../../api/mockAdminApi';
import type { Order, QuoteFormData, QuoteBreakdownItem } from '../../types';
import { ArrowLeft, Download, Upload, Send, Plus, X as XIcon, FileText, DollarSign, MessageSquare, Package } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteBreakdown, setQuoteBreakdown] = useState<QuoteBreakdownItem[]>([
    { description: '', amount: 0 }
  ]);
  const [quoteNotes, setQuoteNotes] = useState('');

  useEffect(() => {
    if (id) loadOrder();
  }, [id]);

  const loadOrder = async () => {
    if (!id) return;
    setLoading(true);
    const response = await getOrder(id);
    if (response.success && response.data) {
      setOrder(response.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: Order['status']) => {
    if (!order) return;
    const response = await updateOrderStatus(order.id, newStatus);
    if (response.success && response.data) {
      setOrder(response.data);
    }
  };

  const addBreakdownItem = () => {
    setQuoteBreakdown([...quoteBreakdown, { description: '', amount: 0 }]);
  };

  const removeBreakdownItem = (index: number) => {
    setQuoteBreakdown(quoteBreakdown.filter((_, i) => i !== index));
  };

  const updateBreakdownItem = (index: number, field: 'description' | 'amount', value: string | number) => {
    const updated = [...quoteBreakdown];
    updated[index] = { ...updated[index], [field]: value };
    setQuoteBreakdown(updated);
  };

  const calculateTotal = () => {
    return quoteBreakdown.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const handleAddQuote = async () => {
    if (!order) return;
    
    const total = calculateTotal();
    const quoteData: QuoteFormData = {
      amount: total,
      breakdown: quoteBreakdown.filter(item => item.description && item.amount > 0),
      notes: quoteNotes,
    };

    const response = await addQuoteToOrder(order.id, quoteData);
    if (response.success) {
      setShowQuoteModal(false);
      setQuoteBreakdown([{ description: '', amount: 0 }]);
      setQuoteNotes('');
      loadOrder();
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading order...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Order not found</p>
        </div>
      </AdminLayout>
    );
  }

  const statusOrder = ['pending', 'quoted', 'paid', 'in_progress', 'complete'];
  const currentStatusIndex = statusOrder.indexOf(order.status);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order {order.id}</h1>
              <p className="text-gray-600 mt-1">{order.details.designName}</p>
            </div>
          </div>
          <StatusBadge status={order.status} type="order" />
        </div>

        {/* Status Timeline */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {statusOrder.map((status, index) => {
                const isActive = index <= currentStatusIndex;
                const isCurrent = order.status === status;
                return (
                  <div key={status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                        isActive ? 'bg-admin-primary text-white' : 'bg-gray-200 text-gray-500'
                      } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                        {index + 1}
                      </div>
                      <p className={`mt-2 text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </div>
                    {index < statusOrder.length - 1 && (
                      <div className={`h-1 flex-1 ${isActive ? 'bg-admin-primary' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Order Info */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Order Information</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Name</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{order.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-base text-gray-900 mt-1">{order.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Service Type</p>
                    <p className="text-base font-medium text-gray-900 mt-1 capitalize">{order.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Design Name</p>
                    <p className="text-base text-gray-900 mt-1">{order.details.designName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Created</p>
                    <p className="text-base text-gray-900 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Updated</p>
                    <p className="text-base text-gray-900 mt-1">{new Date(order.updatedAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-4">Design Specifications</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600">Dimensions</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{order.details.width} x {order.details.height} {order.details.units}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600">Output Format</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{order.details.outputFormat}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600">Complexity</p>
                      <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{order.details.complexity}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-600">Turnaround</p>
                      <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{order.details.turnaroundTime}</p>
                    </div>
                    {order.details.numberOfColors && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Colors</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{order.details.numberOfColors}</p>
                      </div>
                    )}
                    {order.details.fabricType && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Fabric Type</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{order.details.fabricType}</p>
                      </div>
                    )}
                    {order.details.placement && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Placement</p>
                        <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{order.details.placement}</p>
                      </div>
                    )}
                    {order.details.quantity && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Quantity</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{order.details.quantity}</p>
                      </div>
                    )}
                    {order.details.backingType && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs text-gray-600">Backing</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">{order.details.backingType}</p>
                      </div>
                    )}
                  </div>
                </div>

                {order.details.notes && (
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Customer Notes</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-900">{order.details.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            {order.files && order.files.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Customer Files</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{file.filename}</p>
                            <p className="text-xs text-gray-600">{(file.filesize / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <button className="p-2 text-admin-primary hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quote Information */}
            {order.quote && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Quote Details</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {order.quote.breakdown?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-700">{item.description}</span>
                        <span className="text-sm font-medium text-gray-900">\${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                      <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-admin-primary">\${order.quote.amount.toFixed(2)}</span>
                    </div>
                  </div>
                  {order.quote.notes && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-600 mb-2">Notes</p>
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                        <p className="text-sm text-gray-900">{order.quote.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Deliverables */}
            {order.deliverables && order.deliverables.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Delivered Files</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.deliverables.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{file.filename}</p>
                            <p className="text-xs text-gray-600">{(file.filesize / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <button className="p-2 text-green-700 hover:bg-green-200 rounded-lg transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.status === 'pending' && (
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-admin-primary text-white py-3 rounded-lg hover:bg-admin-primary-hover transition-colors font-medium"
                  >
                    <DollarSign className="w-5 h-5" />
                    Create Quote
                  </button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Update Status</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 font-medium"
                >
                  <option value="pending">Pending</option>
                  <option value="quoted">Quoted</option>
                  <option value="paid">Paid</option>
                  <option value="in_progress">In Progress</option>
                  <option value="complete">Complete</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <Modal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        title="Create Quote"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Quote Breakdown</label>
            <div className="space-y-3">
              {quoteBreakdown.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateBreakdownItem(index, 'description', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => updateBreakdownItem(index, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-32 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900"
                    placeholder="Amount"
                    step="0.01"
                  />
                  {quoteBreakdown.length > 1 && (
                    <button
                      onClick={() => removeBreakdownItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg border-2 border-gray-300"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addBreakdownItem}
              className="mt-3 flex items-center gap-2 text-admin-primary hover:text-admin-primary-hover font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Line Item
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-admin-primary">\${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Additional Notes</label>
            <textarea
              value={quoteNotes}
              onChange={(e) => setQuoteNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
              rows={4}
              placeholder="Add any additional information..."
            />
          </div>

          <ModalFooter>
            <button
              onClick={() => setShowQuoteModal(false)}
              className="px-6 py-2 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQuote}
              disabled={calculateTotal() === 0}
              className="px-6 py-2 bg-admin-primary text-white rounded-lg hover:bg-admin-primary-hover font-medium disabled:opacity-50"
            >
              Create Quote
            </button>
          </ModalFooter>
        </div>
      </Modal>
    </AdminLayout>
  );
}
