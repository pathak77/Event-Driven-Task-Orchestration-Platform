import { ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';

const orders = [
  {
    id: '#12345',
    date: 'Apr 3, 2026',
    items: ['Momo', 'Dal Bhat'],
    total: 550,
    status: 'delivered',
  },
  {
    id: '#12344',
    date: 'Apr 1, 2026',
    items: ['Chowmein', 'Coffee'],
    total: 220,
    status: 'delivered',
  },
  {
    id: '#12343',
    date: 'Mar 28, 2026',
    items: ['Burger', 'Coke'],
    total: 240,
    status: 'delivered',
  },
  {
    id: '#12342',
    date: 'Mar 25, 2026',
    items: ['Sel Roti', 'Samosa'],
    total: 110,
    status: 'delivered',
  },
];

export function OrderHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Order History</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-6 space-y-4">
        {orders.map((order) => (
          <NeuCard key={order.id} padding="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold" style={{ color: '#333333' }}>{order.id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" style={{ color: '#8A8A8A' }} />
                  <p className="text-sm" style={{ color: '#8A8A8A' }}>{order.date}</p>
                </div>
              </div>
              <div 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                  color: '#ffffff',
                }}
              >
                {order.status}
              </div>
            </div>
            <div className="mb-3">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm" style={{ color: '#8A8A8A' }}>
                  • {item}
                </p>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: '#e8d4d4' }}>
              <p className="font-semibold" style={{ color: '#FF8FA3' }}>
                Rs {order.total}
              </p>
              <button
                onClick={() => navigate('/feedback')}
                className="font-medium text-sm"
                style={{ color: '#FF8FA3' }}
              >
                Leave Feedback
              </button>
            </div>
          </NeuCard>
        ))}
      </div>
    </div>
  );
}
