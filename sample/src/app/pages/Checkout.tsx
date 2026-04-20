import { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';

export function Checkout() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('card');

  const handleConfirmOrder = () => {
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Checkout</h1>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Delivery Address */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: '#333333' }}>Delivery Address</h3>
          <NeuCard padding="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1" style={{ color: '#FF8FA3' }} />
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ color: '#333333' }}>Home</p>
                <p style={{ color: '#8A8A8A' }}>Thamel, Kathmandu</p>
                <p style={{ color: '#8A8A8A' }}>Nepal - 44600</p>
              </div>
              <button className="font-medium" style={{ color: '#FF8FA3' }}>
                Change
              </button>
            </div>
          </NeuCard>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: '#333333' }}>Payment Method</h3>
          <div className="space-y-3">
            <NeuCard padding="p-4">
              <button
                onClick={() => setSelectedPayment('card')}
                className="w-full flex items-center gap-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: selectedPayment === 'card' ? 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)' : '#FDECEC',
                    boxShadow: selectedPayment === 'card' ? 'none' : 'inset 2px 2px 4px #e8d4d4, inset -2px -2px 4px #ffffff',
                  }}
                >
                  {selectedPayment === 'card' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <CreditCard className="w-5 h-5" style={{ color: '#8A8A8A' }} />
                <span className="font-medium" style={{ color: '#333333' }}>Card / eSewa / Khalti</span>
              </button>
            </NeuCard>

            <NeuCard padding="p-4">
              <button
                onClick={() => setSelectedPayment('cash')}
                className="w-full flex items-center gap-3"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: selectedPayment === 'cash' ? 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)' : '#FDECEC',
                    boxShadow: selectedPayment === 'cash' ? 'none' : 'inset 2px 2px 4px #e8d4d4, inset -2px -2px 4px #ffffff',
                  }}
                >
                  {selectedPayment === 'cash' && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className="text-xl">💵</span>
                <span className="font-medium" style={{ color: '#333333' }}>Cash on Delivery</span>
              </button>
            </NeuCard>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: '#333333' }}>Order Summary</h3>
          <NeuCard>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p style={{ color: '#8A8A8A' }}>Subtotal</p>
                <p className="font-semibold" style={{ color: '#333333' }}>Rs 700</p>
              </div>
              <div className="flex justify-between">
                <p style={{ color: '#8A8A8A' }}>Delivery Fee</p>
                <p className="font-semibold" style={{ color: '#333333' }}>Rs 50</p>
              </div>
              <div className="flex justify-between">
                <p style={{ color: '#8A8A8A' }}>VAT (13%)</p>
                <p className="font-semibold" style={{ color: '#333333' }}>Rs 91</p>
              </div>
              <div className="border-t pt-3" style={{ borderColor: '#e8d4d4' }}>
                <div className="flex justify-between">
                  <p className="font-semibold text-lg" style={{ color: '#333333' }}>Total</p>
                  <p className="font-semibold text-lg" style={{ color: '#FF8FA3' }}>Rs 841</p>
                </div>
              </div>
            </div>
          </NeuCard>
        </div>

        {/* Confirm Button */}
        <NeuButton onClick={handleConfirmOrder}>
          Confirm Order
        </NeuButton>
      </div>
    </div>
  );
}
