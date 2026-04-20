import { useState } from 'react';
import { User, MapPin, Phone, Calendar, UserCircle, Lock, ChefHat, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';

export function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    dateOfBirth: '',
    username: '',
    password: '',
  });
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
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <NeuInput
              icon={<User className="w-5 h-5" />}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <NeuInput
              icon={<MapPin className="w-5 h-5" />}
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <NeuInput
              icon={<Phone className="w-5 h-5" />}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <NeuInput
              icon={<Calendar className="w-5 h-5" />}
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <NeuInput
              icon={<UserCircle className="w-5 h-5" />}
              name="username"
              placeholder="Username"
              value={formData.username}
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
                Create Account
              </NeuButton>
            </div>
          </form>

          <div className="text-center mt-8">
            <p style={{ color: '#8A8A8A' }}>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="font-semibold" style={{ color: '#FF6B9D' }}>
                Log In
              </button>
            </p>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}