import { useState, useEffect } from 'react';
import { Warehouse, Store, LocationCity, Add } from '@mui/icons-material';
import { itemsAPI } from '../../services/api';

interface Location {
  id: string;
  name: string;
  type: 'Warehouse' | 'Retail' | 'Storage';
  address: string;
  capacity: number;
  itemCount: number;
  manager: string;
}

export function Locations() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await itemsAPI.getAll();
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch items for locations:', err);
      }
    };
    fetchItems();
  }, []);

  const getLocCount = (locName: string, locType: string) => {
    return items
      .filter(item => {
        const itemLoc = (item.location || '').toLowerCase();
        const nameLower = locName.toLowerCase();
        const typeLower = locType.toLowerCase();
        return itemLoc === nameLower ||
               itemLoc === typeLower ||
               (nameLower.includes('retail') && itemLoc.includes('retail')) ||
               (nameLower.includes('storage') && itemLoc.includes('storage'));
      })
      .reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  const locations: Location[] = [
    {
      id: '1',
      name: 'Warehouse A',
      type: 'Warehouse',
      address: '123 Industrial Blvd, City, ST 12345',
      capacity: 1000,
      itemCount: getLocCount('Warehouse A', 'Warehouse'),
      manager: 'John Smith',
    },
    {
      id: '2',
      name: 'Warehouse B',
      type: 'Warehouse',
      address: '456 Storage Ave, City, ST 12345',
      capacity: 800,
      itemCount: getLocCount('Warehouse B', 'Warehouse'),
      manager: 'Sarah Johnson',
    },
    {
      id: '3',
      name: 'Main Retail Store',
      type: 'Retail',
      address: '789 Main St, City, ST 12345',
      capacity: 500,
      itemCount: getLocCount('Main Retail Store', 'Retail'),
      manager: 'Mike Davis',
    },
    {
      id: '4',
      name: 'Downtown Store',
      type: 'Retail',
      address: '321 Downtown Rd, City, ST 12345',
      capacity: 300,
      itemCount: getLocCount('Downtown Store', 'Retail'),
      manager: 'Emily Brown',
    },
    {
      id: '5',
      name: 'Overflow Storage',
      type: 'Storage',
      address: '555 Depot Ln, City, ST 12345',
      capacity: 600,
      itemCount: getLocCount('Overflow Storage', 'Storage'),
      manager: 'Tom Wilson',
    },
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'Warehouse': return Warehouse;
      case 'Retail': return Store;
      case 'Storage': return LocationCity;
      default: return Warehouse;
    }
  };

  const getCapacityColor = (itemCount: number, capacity: number) => {
    const percentage = (itemCount / capacity) * 100;
    if (percentage >= 90) return 'bg-rose-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-1 text-white">Locations</h2>
          <p className="text-slate-400">Manage your storage locations and facilities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Add fontSize="small" />
          Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => {
          const Icon = getLocationIcon(location.type);
          const capacityPercentage = (location.itemCount / location.capacity) * 100;

          return (
            <div
              key={location.id}
              className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Icon className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{location.name}</h3>
                    <p className="text-sm text-slate-400">{location.type}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <div className="text-slate-500 text-sm mt-0.5">📍</div>
                  <div className="text-sm text-slate-300">{location.address}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-slate-500 text-sm">👤</div>
                  <div className="text-sm text-slate-300">{location.manager}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Capacity</span>
                  <span className="text-white">
                    {location.itemCount} / {location.capacity}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCapacityColor(location.itemCount, location.capacity)}`}
                    style={{ width: `${capacityPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500">
                  {capacityPercentage.toFixed(1)}% utilized
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">Items</div>
                  <div className="text-lg font-medium text-white">{location.itemCount}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Available</div>
                  <div className="text-lg font-medium text-white">
                    {location.capacity - location.itemCount}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
          <div className="text-sm text-slate-400 mb-1">Total Locations</div>
          <div className="text-3xl text-white">{locations.length}</div>
        </div>
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
          <div className="text-sm text-slate-400 mb-1">Total Capacity</div>
          <div className="text-3xl text-white">
            {locations.reduce((sum, loc) => sum + loc.capacity, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
          <div className="text-sm text-slate-400 mb-1">Total Items Stored</div>
          <div className="text-3xl text-white">
            {locations.reduce((sum, loc) => sum + loc.itemCount, 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
