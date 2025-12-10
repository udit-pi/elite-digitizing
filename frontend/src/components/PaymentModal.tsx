import { X, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { createPaymentSession, simulatePayment } from '../api/mockApi';
import type { Order, PaymentSession } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onPaymentSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, order, onPaymentSuccess }: PaymentModalProps) {
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInitiatePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const response = await createPaymentSession(order.id);
      if (response.success && response.data) {
        setPaymentSession(response.data);
        setPaymentStatus('idle');
      } else {
        setError(response.error || 'Failed to create payment session');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = async (success: boolean) => {
    if (!paymentSession) return;

    setIsProcessing(true);
    setPaymentStatus('processing');
    setError('');

    try {
      const response = await simulatePayment(paymentSession.id, success);
      if (response.success && response.data) {
        if (success) {
          setPaymentStatus('success');
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 2000);
        } else {
          setPaymentStatus('failed');
          setError('Payment failed. Please try again.');
        }
      } else {
        setPaymentStatus('failed');
        setError(response.error || 'Payment processing failed');
      }
    } catch (err) {
      setPaymentStatus('failed');
      setError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setPaymentSession(null);
      setPaymentStatus('idle');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
          {/* Close Button */}
          {!isProcessing && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-brand-orange" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
              <p className="text-gray-600">Complete your order payment</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order ID</span>
                <span className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Design</span>
                <span className="text-sm font-medium text-gray-900">{order.details.designName}</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-brand-orange">
                  ${order.quote?.amount || 0}
                </span>
              </div>
            </div>

            {/* Quote Breakdown */}
            {order.quote && order.quote.breakdown.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</p>
                <div className="space-y-2">
                  {order.quote.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.description}</span>
                      <span className="text-gray-900">${item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {paymentStatus === 'success' && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">Payment successful! Redirecting...</p>
              </div>
            )}

            {/* Payment Actions */}
            {!paymentSession ? (
              <button
                onClick={handleInitiatePayment}
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Initializing...' : 'Proceed to Payment'}
              </button>
            ) : (
              <div className="space-y-3">
                {/* Mock Payment Notice */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 text-center">
                    🧪 <strong>Development Mode:</strong> This is a mock payment gateway.
                    <br />
                    Choose an outcome below to simulate the payment.
                  </p>
                </div>

                {/* Real Payment Gateway Note */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Production Integration:</strong> In a real application, this would redirect to
                    Stripe, PayPal, or another payment gateway. Payment confirmation would be handled via
                    webhooks (POST /api/webhooks/payment).
                  </p>
                </div>

                {/* Simulate Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSimulatePayment(true)}
                    disabled={isProcessing || paymentStatus !== 'idle'}
                    className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentStatus === 'processing' ? 'Processing...' : '✓ Success'}
                  </button>
                  <button
                    onClick={() => handleSimulatePayment(false)}
                    disabled={isProcessing || paymentStatus !== 'idle'}
                    className="py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✗ Fail
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Security Note */}
            <p className="mt-4 text-xs text-center text-gray-500">
              🔒 Payments are secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
