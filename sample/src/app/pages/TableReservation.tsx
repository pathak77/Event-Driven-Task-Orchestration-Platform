import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';

const tables = [
  { id: 1, number: 1, seats: 2, status: 'available' },
  { id: 2, number: 2, seats: 4, status: 'occupied' },
  { id: 3, number: 3, seats: 2, status: 'available' },
  { id: 4, number: 4, seats: 6, status: 'available' },
  { id: 5, number: 5, seats: 4, status: 'occupied' },
  { id: 6, number: 6, seats: 2, status: 'available' },
  { id: 7, number: 7, seats: 8, status: 'available' },
  { id: 8, number: 8, seats: 4, status: 'occupied' },
  { id: 9, number: 9, seats: 2, status: 'available' },
];

export function TableReservation() {
  const navigate = useNavigate();

  const handleTableSelect = (table: any) => {
    if (table.status === 'available') {
      navigate('/reservation-form', { state: { tableNumber: table.number } });
    }
  };

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
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Reserve Table</h1>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)' }}></div>
            <span className="text-sm" style={{ color: '#8A8A8A' }}>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: '#e8d4d4' }}></div>
            <span className="text-sm" style={{ color: '#8A8A8A' }}>Occupied</span>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="px-6 grid grid-cols-3 gap-4">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => handleTableSelect(table)}
            disabled={table.status === 'occupied'}
            className="transition-transform active:scale-95"
          >
            <NeuCard padding="p-6">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center font-semibold text-white"
                  style={{
                    background: table.status === 'available' 
                      ? 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)' 
                      : '#e8d4d4',
                  }}
                >
                  {table.number}
                </div>
                <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>
                  {table.seats} seats
                </p>
                <p className="text-xs font-medium" style={{ 
                  color: table.status === 'available' ? '#4CAF50' : '#e8d4d4' 
                }}>
                  {table.status === 'available' ? 'Available' : 'Occupied'}
                </p>
              </div>
            </NeuCard>
          </button>
        ))}
      </div>
    </div>
  );
}
