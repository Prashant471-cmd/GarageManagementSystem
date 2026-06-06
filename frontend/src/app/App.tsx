import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Items } from './components/Items';
import { ItemDetail } from './components/ItemDetail';
import { Locations } from './components/Locations';
import { Login } from './components/Login';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleViewItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleBackToItems = () => {
    setSelectedItemId(null);
    setActiveTab('items');
  };

  const renderContent = () => {
    if (selectedItemId) {
      return <ItemDetail itemId={selectedItemId} onBack={handleBackToItems} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'items':
        return <Items onViewItem={handleViewItem} />;
      case 'locations':
        return <Locations />;
      case 'login':
        return <Login />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="size-full flex bg-slate-950">
      {activeTab !== 'login' && (
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}