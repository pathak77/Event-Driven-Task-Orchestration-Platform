import { ArrowLeft, ShoppingBag, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';

const stats = [
  { id: 1, label: 'Total Orders', value: '156', icon: ShoppingBag, color: '#FF8FA3' },
  { id: 2, label: 'Revenue', value: 'Rs 24,500', icon: DollarSign, color: '#4CAF50' },
  { id: 3, label: 'Customers', value: '89', icon: Users, color: '#FF6F91' },
  { id: 4, label: 'Growth', value: '+12%', icon: TrendingUp, color: '#9C27B0' },
];

const recentOrders = [
  { id: '#12345', customer: 'Krisha', amount: 550, status: 'preparing' },
  { id: '#12346', customer: 'Aayush', amount: 220, status: 'delivered' },
  { id: '#12347', customer: 'Sujal', amount: 450, status: 'pending' },
];

export function AdminDashboard() {
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
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Admin Dashboard</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <NeuCard key={stat.id} padding="p-5">
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{
                    background: `${stat.color}20`,
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-semibold mb-1" style={{ color: '#333333' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: '#8A8A8A' }}>
                  {stat.label}
                </p>
              </div>
            </NeuCard>
          ))}
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="font-semibold mb-4" style={{ color: '#333333' }}>Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <NeuCard key={order.id} padding="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold" style={{ color: '#333333' }}>{order.id}</p>
                    <p className="text-sm" style={{ color: '#8A8A8A' }}>{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold mb-1" style={{ color: '#FF8FA3' }}>
                      Rs {order.amount}
                    </p>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                      style={{
                        background: order.status === 'delivered' 
                          ? '#4CAF5020' 
                          : order.status === 'preparing' 
                          ? '#FF8FA320' 
                          : '#8A8A8A20',
                        color: order.status === 'delivered' 
                          ? '#4CAF50' 
                          : order.status === 'preparing' 
                          ? '#FF8FA3' 
                          : '#8A8A8A',
                      }}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>
              </NeuCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-semibold mb-4" style={{ color: '#333333' }}>Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="p-4 rounded-2xl font-medium"
              style={{
                background: '#FDECEC',
                boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
                color: '#333333',
              }}
            >
              View All Orders
            </button>
            <button 
              className="p-4 rounded-2xl font-medium"
              style={{
                background: '#FDECEC',
                boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
                color: '#333333',
              }}
            >
              Manage Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
