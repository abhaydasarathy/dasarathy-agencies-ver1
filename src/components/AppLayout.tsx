import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={`transition-all duration-200 min-h-screen ${
          collapsed ? 'ml-14' : 'ml-52'
        }`}
      >
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
