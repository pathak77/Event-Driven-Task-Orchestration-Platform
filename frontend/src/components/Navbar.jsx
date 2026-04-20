import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, User, LogOut } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full p-4 z-50 md:sticky md:top-0 md:p-6 bg-[#4874e2]">
      <div 
        className="flex justify-around items-center rounded-3xl p-4 max-w-2xl mx-auto"
        style={{
          background: '#E8F0FE',
          boxShadow: '6px 6px 12px #D1E1F9, -6px -6px 12px #ffffff',
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? '' : 'text-[#9CA3AF]'}`}
              style={{ color: isActive ? '#4A90E2' : undefined }}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 text-[#7c94be] transition-colors hover:text-[#5a82c7]"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
