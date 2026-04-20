import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';

export function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <NeuCard padding="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                boxShadow: '8px 8px 16px #e8d4d4, -8px -8px 16px #ffffff',
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold mb-3" style={{ color: '#333333' }}>
              Order Confirmed!
            </h1>
            <p className="mb-6" style={{ color: '#8A8A8A' }}>
              Your order has been placed successfully
            </p>

            {/* Order Details */}
            <div className="w-full mb-6">
              <div 
                className="rounded-2xl p-4"
                style={{
                  background: '#FDECEC',
                  boxShadow: 'inset 4px 4px 8px #e8d4d4, inset -4px -4px 8px #ffffff',
                }}
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p style={{ color: '#8A8A8A' }}>Order Number</p>
                    <p className="font-semibold" style={{ color: '#333333' }}>#12345</p>
                  </div>
                  <div className="flex justify-between">
                    <p style={{ color: '#8A8A8A' }}>Total Amount</p>
                    <p className="font-semibold" style={{ color: '#FF8FA3' }}>Rs 841</p>
                  </div>
                  <div className="flex justify-between">
                    <p style={{ color: '#8A8A8A' }}>Estimated Delivery</p>
                    <p className="font-semibold" style={{ color: '#333333' }}>30-40 mins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="w-full space-y-3">
              <NeuButton onClick={() => navigate('/order-history')}>
                View Orders
              </NeuButton>
              <button
                onClick={() => navigate('/home')}
                className="w-full py-3 font-semibold"
                style={{ color: '#FF7A00' }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}