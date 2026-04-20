import { useState, useEffect } from 'react';
import { User, Mail, Edit2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { NeuInput } from '../components/NeuInput';
import api from '../api/axios';

export function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ username: '', avatarUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', avatarUrl: '' });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) fetchProfile();
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

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
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
                value={editForm.avatarUrl}
                onChange={(e) => setEditForm({...editForm, avatarUrl: e.target.value})}
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
