import { useState } from 'react';
import { Mail, Lock, ChefHat, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <NeuCard padding="p-8">
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background: '#FDECEC',
                boxShadow: 'inset 6px 6px 12px #e8d4d4, inset -6px -6px 12px #ffffff',
              }}
            >
              <ChefHat className="w-10 h-10" style={{ color: '#FF8FA3' }} />
            </div>
            <h1 className="text-2xl font-semibold tracking-wide" style={{ color: '#333333' }}>
              Gokyo
            </h1>
          </div>

          <h2 className="text-center text-xl font-semibold mb-8" style={{ color: '#333333' }}>
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="font-medium"
                style={{ color: '#FF8FA3' }}
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-3">
              <NeuButton type="submit" icon={<ArrowRight className="w-5 h-5" />}>
                Log In
              </NeuButton>
            </div>
          </form>

          <div className="text-center mt-8">
            <p style={{ color: '#8A8A8A' }}>
              Don't have an account?{' '}
              <button onClick={() => navigate('/')} className="font-semibold" style={{ color: '#FF8FA3' }}>
                Create Account
              </button>
            </p>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}