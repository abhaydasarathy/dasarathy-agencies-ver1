import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Pill, Package, ShoppingCart, Receipt,
  Users, BarChart3, AlertTriangle, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Medicines', path: '/medicines', icon: Pill },
  { title: 'Stock', path: '/stock', icon: Package },
  { title: 'Purchases', path: '/purchases', icon: ShoppingCart },
  { title: 'Sales', path: '/sales', icon: Receipt },
  { title: 'Suppliers', path: '/suppliers', icon: Users },
  { title: 'Reports', path: '/reports', icon: BarChart3 },
  { title: 'Alerts', path: '/alerts', icon: AlertTriangle },
];

const AppSidebar = ({ collapsed, onToggle }: AppSidebarProps) => {
  const { logout } = useAuth();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-52'
      }`}
    >
      {/* Header */}
      <div className="px-3 py-4 border-b border-sidebar-border">
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-sidebar-primary-foreground tracking-wide">DASARATHY</div>
            <div className="text-[10px] text-sidebar-foreground opacity-60">AGENCIES</div>
          </div>
        )}
        {collapsed && <div className="text-sm font-bold text-sidebar-primary-foreground text-center">DA</div>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border">
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 text-sm w-full text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
