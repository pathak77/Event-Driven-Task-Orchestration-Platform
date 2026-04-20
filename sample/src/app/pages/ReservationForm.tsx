import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';

export function ReservationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const tableNumber = location.state?.tableNumber || 1;
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Table reserved successfully!');
    navigate('/home');
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/table-reservation')}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#333333' }} />
          </button>
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Book Table</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Selected Table */}
        <NeuCard>
          <div className="text-center">
            <p style={{ color: '#8A8A8A' }}>Selected Table</p>
            <p className="text-3xl font-semibold mt-2" style={{ color: '#FF8FA3' }}>
              Table {tableNumber}
            </p>
          </div>
        </NeuCard>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <NeuInput
            icon={<Calendar className="w-5 h-5" />}
            type="date"
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
          />

          <NeuInput
            icon={<Clock className="w-5 h-5" />}
            type="time"
            name="time"
            placeholder="Time"
            value={formData.time}
            onChange={handleChange}
          />

          <NeuInput
            icon={<Users className="w-5 h-5" />}
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            onChange={handleChange}
          />

          <div className="pt-3">
            <NeuButton type="submit">
              Confirm Reservation
            </NeuButton>
          </div>
        </form>
      </div>
    </div>
  );
}