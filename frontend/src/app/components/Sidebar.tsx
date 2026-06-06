import {
  Dashboard,
  ViewList,
  LocationOn,
  Login,
  Menu
} from '@mui/icons-material';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Dashboard },
    { id: 'items', label: 'Items', icon: ViewList },
    { id: 'locations', label: 'Locations', icon: LocationOn },
    { id: 'login', label: 'Login', icon: Login },
  ];

  return (
    <div
      className={`bg-slate-900 text-white h-full flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!isCollapsed && <h1 className="text-xl">Inventory Pro</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-800 rounded-lg"
        >
          <Menu />
        </button>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Icon />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            JD
          </div>
          {!isCollapsed && (
            <div>
              <div className="text-sm">John Doe</div>
              <div className="text-xs text-slate-400">Manager</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
