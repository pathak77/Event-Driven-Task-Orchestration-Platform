import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';

export function Profile() {
  const navigate = useNavigate();
  
  // Dynamic user data - can be fetched from state/context/API
  const userName = 'Krisha';

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
          <h1 className="text-2xl font-semibold" style={{ color: '#333333' }}>Profile</h1>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #FF8FA3 0%, #FFB3C1 100%)',
              boxShadow: '8px 8px 16px #e8d4d4, -8px -8px 16px #ffffff',
            }}
          >
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-xl font-semibold" style={{ color: '#333333' }}>
            {userName}
          </h2>
          <p style={{ color: '#8A8A8A' }}>Member since 2026</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <NeuCard padding="p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" style={{ color: '#FF8FA3' }} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#8A8A8A' }}>Email</p>
                <p className="font-medium" style={{ color: '#333333' }}>krisha@email.com</p>
              </div>
            </div>
          </NeuCard>

          <NeuCard padding="p-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" style={{ color: '#FF8FA3' }} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#8A8A8A' }}>Phone</p>
                <p className="font-medium" style={{ color: '#333333' }}>+977 98XXXXXXXX</p>
              </div>
            </div>
          </NeuCard>

          <NeuCard padding="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" style={{ color: '#FF8FA3' }} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#8A8A8A' }}>Address</p>
                <p className="font-medium" style={{ color: '#333333' }}>Thamel, Kathmandu, Nepal</p>
              </div>
            </div>
          </NeuCard>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <NeuButton
            variant="secondary"
            icon={<Edit2 className="w-5 h-5" />}
            onClick={() => alert('Edit profile feature')}
          >
            Edit Profile
          </NeuButton>

          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
            style={{
              background: '#FDECEC',
              boxShadow: '6px 6px 12px #e8d4d4, -6px -6px 12px #ffffff',
              color: '#FF6F91',
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
