import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState<'admin' | 'user'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-wide">DASARATHY AGENCIES</h1>
          <p className="text-sm text-muted-foreground mt-1">Since 19XX</p>
        </div>

        <div className="bg-card border border-border rounded-sm p-6">
          {/* Role Toggle */}
          <div className="flex mb-6 border border-border rounded-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                role === 'admin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              User Login
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Username / Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-6">
          Pharmaceutical Distribution Management System
        </p>
      </div>
    </div>
  );
};

export default Login;
