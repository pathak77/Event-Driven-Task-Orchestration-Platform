import { useState } from 'react';
import { Mail, Lock, CheckSquare, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';
import api from '../api/axios';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Mock login: Accept any credentials
    // Generate a deterministic numeric ID from the username
    const username = formData.username || 'User';
    const mockUserId = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString();
    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('userId', mockUserId);
    localStorage.setItem('username', username);
    
    console.log(`Mock login successful for ${username} (ID: ${mockUserId})`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <NeuCard padding="p-8">
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background: '#E8F0FE',
                boxShadow: 'inset 6px 6px 12px #D1E1F9, inset -6px -6px 12px #ffffff',
              }}
            >
              <CheckSquare className="w-10 h-10" style={{ color: '#4A90E2' }} />
            </div>
            <h1 className="text-2xl font-semibold tracking-wide" style={{ color: '#1F2937' }}>
              BuzOp
            </h1>
          </div>

          <h2 className="text-center text-xl font-semibold mb-8" style={{ color: '#1F2937' }}>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <NeuInput
              icon={<Mail className="w-5 h-5" />}
              type="text"
              name="username"
              placeholder="Username (e.g., John Doe1)"
              value={formData.username}
              onChange={handleChange}
            />
            <NeuInput
              icon={<Lock className="w-5 h-5" />}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            <div className="pt-3">
              <NeuButton type="submit" icon={<ArrowRight className="w-5 h-5" />}>
                Log In
              </NeuButton>
            </div>

            <div className="text-center mt-4 text-sm" style={{ color: '#6B7280' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium hover:underline" style={{ color: '#4A90E2' }}>
                Register
              </Link>
            </div>
          </form>
        </NeuCard>
      </div>
    </div>
  );
}
