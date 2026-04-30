import { useState, useEffect } from 'react';
import { User, Mail, Edit2, LogOut, ClipboardList, Phone, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { NeuInput } from '../components/NeuInput';
import api from '../api/axios';

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', avatarUrl: '', bio: '', phoneNumber: '', email: '' });
  const [assignments, setAssignments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', avatarUrl: '', bio: '', phoneNumber: '', email: '' });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchAssignments();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/api/profile/${userId}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
      // Fallback
      setProfile({ username: localStorage.getItem('username'), avatarUrl: '' });
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/api/assignments/me');
      setAssignments(response.data || []);
    } catch (error) {
      console.error('Failed to fetch assignments', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/profile/${userId}`, editForm);
      localStorage.setItem('username', editForm.username);
      setProfile({ ...editForm });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Profile</h1>

      <div className="flex flex-col items-center">
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)',
            boxShadow: '8px 8px 16px #D1E1F9, -8px -8px 16px #ffffff',
          }}
        >
          {profile.avatarUrl && profile.avatarUrl !== 'images/user.png' ? (
            <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-white" />
          )}
        </div>
        <h2 className="text-xl font-semibold" style={{ color: '#1F2937' }}>
          {profile.username || 'User'}
        </h2>
        <p style={{ color: '#6B7280' }}>ID: {userId}</p>
      </div>

      <div className="space-y-4">
        {!isEditing ? (
          <>
            <NeuCard padding="p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" style={{ color: '#4A90E2' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Username</p>
                  <p className="font-medium" style={{ color: '#1F2937' }}>{profile.username}</p>
                </div>
              </div>
            </NeuCard>

            <NeuCard padding="p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" style={{ color: '#4A90E2' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Email</p>
                  <p className="font-medium" style={{ color: '#1F2937' }}>{profile.email || 'Not provided'}</p>
                </div>
              </div>
            </NeuCard>

            <NeuCard padding="p-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: '#4A90E2' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Phone Number</p>
                  <p className="font-medium" style={{ color: '#1F2937' }}>{profile.phoneNumber || 'Not provided'}</p>
                </div>
              </div>
            </NeuCard>

            <NeuCard padding="p-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5" style={{ color: '#4A90E2' }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: '#6B7280' }}>Bio</p>
                  <p className="font-medium" style={{ color: '#1F2937' }}>{profile.bio || 'No bio available'}</p>
                </div>
              </div>
            </NeuCard>

            {/* AMEX Premium Subscription Card */}
            <div className="w-full rounded-2xl p-6 relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #1f1f22 0%, #111111 100%)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
              color: '#e5e7eb',
              border: '1px solid #333'
            }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700 rounded-full mix-blend-overlay filter blur-2xl opacity-20 transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-500 rounded-full mix-blend-overlay filter blur-2xl opacity-20 transform -translate-x-10 translate-y-10"></div>
              
              <div className="flex justify-between items-start z-10 relative">
                <div className="uppercase tracking-widest text-[10px] sm:text-xs font-semibold text-gray-400">Premium Subscription</div>
                <div className="text-sm sm:text-xl font-serif italic text-gray-300">AMERICAN EXPRESS</div>
              </div>
              
              <div className="mt-8 z-10 relative flex justify-between items-center">
                <div className="text-xl sm:text-2xl font-mono tracking-widest text-gray-200">
                  **** **** **** 1024
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-end z-10 relative">
                <div>
                  <div className="text-[10px] uppercase text-gray-500 tracking-wider">Card Member</div>
                  <div className="font-semibold text-xs sm:text-sm tracking-wide uppercase">{profile.username || 'Valued Member'}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-gray-500 tracking-wider">Valid Thru</div>
                  <div className="font-semibold text-xs sm:text-sm tracking-wide">12/28</div>
                </div>
              </div>
              
              <div className="absolute top-16 left-6 w-10 h-8 rounded bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 opacity-80 mix-blend-luminosity">
                <div className="w-full h-full border border-gray-400/30 rounded flex items-center justify-center">
                  <div className="w-6 h-4 border border-gray-400/40 rounded-sm"></div>
                </div>
              </div>
            </div>

            <NeuCard padding="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-5 h-5" style={{ color: '#4A90E2' }} />
                <h3 className="font-bold" style={{ color: '#1F2937' }}>My Assignments</h3>
              </div>
              {assignments.length > 0 ? (
                <ul className="space-y-3">
                  {assignments.map(task => (
                    <li key={task.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col">
                      <span className="font-semibold text-gray-800">{task.title}</span>
                      <span className="text-xs text-gray-500 mt-1">Status: {task.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No assignments found.</p>
              )}
            </NeuCard>
            
            <div className="pt-4 space-y-4">
              <NeuButton
                variant="secondary"
                icon={<Edit2 className="w-5 h-5" />}
                onClick={() => { setEditForm({ ...profile }); setIsEditing(true); }}
              >
                Edit Profile
              </NeuButton>

              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
                style={{
                  background: '#E8F0FE',
                  boxShadow: '6px 6px 12px #D1E1F9, -6px -6px 12px #ffffff',
                  color: '#2D74DA',
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>
          </>
        ) : (
          <NeuCard padding="p-6">
            <h3 className="font-bold mb-4" style={{ color: '#1F2937' }}>Edit Profile</h3>
            <div className="space-y-4">
              <NeuInput
                icon={<User className="w-5 h-5" />}
                name="username"
                placeholder="Username"
                value={editForm.username}
                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              />
              <NeuInput
                icon={<span className="w-5 h-5" />}
                name="avatarUrl"
                placeholder="Avatar URL"
                value={editForm.avatarUrl || ''}
                onChange={(e) => setEditForm({...editForm, avatarUrl: e.target.value})}
              />
              <NeuInput
                icon={<Mail className="w-5 h-5" />}
                name="email"
                placeholder="Email Address"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              />
              <NeuInput
                icon={<Phone className="w-5 h-5" />}
                name="phoneNumber"
                placeholder="Phone Number (10 digits)"
                value={editForm.phoneNumber || ''}
                onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
              />
              <NeuInput
                icon={<Info className="w-5 h-5" />}
                name="bio"
                placeholder="Short Bio"
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
              />
              <div className="flex gap-4 pt-4">
                <NeuButton variant="secondary" onClick={() => setIsEditing(false)}>Cancel</NeuButton>
                <NeuButton onClick={handleSave}>Save</NeuButton>
              </div>
            </div>
          </NeuCard>
        )}
      </div>
    </div>
  );
}
