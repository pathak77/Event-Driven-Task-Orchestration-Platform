import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.username && formData.email && formData.password) {
        // Mock registration logic
        localStorage.setItem('userId', Math.floor(Math.random() * 1000).toString());
        localStorage.setItem('username', formData.username);
        navigate('/');
    }
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
              <UserPlus className="w-10 h-10" style={{ color: '#4A90E2' }} />
            </div>
            <h1 className="text-2xl font-semibold tracking-wide" style={{ color: '#1F2937' }}>
              TaskApp
            </h1>
          </div>

          <h2 className="text-center text-xl font-semibold mb-8" style={{ color: '#1F2937' }}>
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <NeuInput
              icon={<User className="w-5 h-5" />}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <NeuInput
              icon={<Mail className="w-5 h-5" />}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <NeuInput
              icon={<Lock className="w-5 h-5" />}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            <div className="pt-3">
              <NeuButton type="submit" icon={<ArrowRight className="w-5 h-5" />}>
                Register
              </NeuButton>
            </div>

            <div className="text-center mt-4 text-sm" style={{ color: '#6B7280' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-medium hover:underline" style={{ color: '#4A90E2' }}>
                Log in
              </Link>
            </div>
          </form>
        </NeuCard>
      </div>
    </div>
  );
}
