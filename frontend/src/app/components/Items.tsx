import { useState } from 'react';
import { Search, Add, Edit, Delete, FilterList } from '@mui/icons-material';

interface Item {
  id: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  quantity: number;
  value: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface ItemsProps {
  onViewItem?: (itemId: string) => void;
}

export function Items({ onViewItem }: ItemsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const items: Item[] = [
    { id: '1', name: 'MacBook Pro 16"', sku: 'SKU-1001', category: 'Electronics', location: 'Warehouse A', quantity: 24, value: 2499, status: 'In Stock' },
    { id: '2', name: 'Office Chair Pro', sku: 'SKU-1002', category: 'Furniture', location: 'Warehouse B', quantity: 15, value: 299, status: 'In Stock' },
    { id: '3', name: 'Wireless Mouse', sku: 'SKU-1003', category: 'Electronics', location: 'Retail Store', quantity: 8, value: 49, status: 'Low Stock' },
    { id: '4', name: 'Desk Lamp LED', sku: 'SKU-1004', category: 'Furniture', location: 'Warehouse A', quantity: 45, value: 79, status: 'In Stock' },
    { id: '5', name: 'USB-C Cable', sku: 'SKU-1005', category: 'Electronics', location: 'Warehouse B', quantity: 0, value: 15, status: 'Out of Stock' },
    { id: '6', name: 'Standing Desk', sku: 'SKU-1006', category: 'Furniture', location: 'Warehouse A', quantity: 12, value: 599, status: 'In Stock' },
    { id: '7', name: 'Mechanical Keyboard', sku: 'SKU-1007', category: 'Electronics', location: 'Retail Store', quantity: 18, value: 159, status: 'In Stock' },
    { id: '8', name: 'Monitor 27" 4K', sku: 'SKU-1008', category: 'Electronics', location: 'Warehouse B', quantity: 6, value: 449, status: 'Low Stock' },
  ];

  const categories = ['all', 'Electronics', 'Furniture', 'Tools', 'Supplies', 'Equipment'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-500/20 text-emerald-400';
      case 'Low Stock': return 'bg-amber-500/20 text-amber-400';
      case 'Out of Stock': return 'bg-rose-500/20 text-rose-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <div className="mb-6">
        <h2 className="text-3xl mb-1 text-white">Items</h2>
        <p className="text-slate-400">Manage your inventory items</p>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 flex gap-4 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fontSize="small" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Add fontSize="small" />
              Add Item
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left p-4 text-slate-400 font-medium text-sm">SKU</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Name</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Category</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Location</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Quantity</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Value</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Status</th>
                <th className="text-left p-4 text-slate-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-300 font-mono text-sm">{item.sku}</td>
                  <td className="p-4 text-white font-medium">{item.name}</td>
                  <td className="p-4 text-slate-300">{item.category}</td>
                  <td className="p-4 text-slate-300">{item.location}</td>
                  <td className="p-4 text-white">{item.quantity}</td>
                  <td className="p-4 text-white">${item.value}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewItem?.(item.id)}
                        className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-blue-400"
                      >
                        <Edit fontSize="small" />
                      </button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-rose-400">
                        <Delete fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No items found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
