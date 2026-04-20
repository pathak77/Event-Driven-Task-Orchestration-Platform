import { useState } from 'react';
import { Mail, ChefHat, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NeuInput } from '../components/NeuInput';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success and navigate
    alert('Password reset link sent to your email!');
    navigate('/login');
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

          <h2 className="text-center text-xl font-semibold mb-3" style={{ color: '#333333' }}>
            Forgot Password
          </h2>
          <p className="text-center mb-8" style={{ color: '#8A8A8A' }}>
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <NeuInput
              icon={<Mail className="w-5 h-5" />}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="pt-3">
              <NeuButton type="submit" icon={<Send className="w-5 h-5" />}>
                Reset Password
              </NeuButton>
            </div>
          </form>

          <div className="text-center mt-8">
            <button onClick={() => navigate('/login')} className="font-semibold" style={{ color: '#FF8FA3' }}>
              Back to Login
            </button>
          </div>
        </NeuCard>
      </div>
    </div>
  );
}