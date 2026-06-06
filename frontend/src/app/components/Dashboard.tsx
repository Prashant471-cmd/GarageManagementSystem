import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { itemsAPI } from '../../services/api';

export function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await itemsAPI.getAll();
        setItems(data || []);
      } catch (err) {
        console.error('Failed to fetch stats for dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Compute stats
  const distinctItemsCount = items.length;
  const activeLocations = Array.from(new Set(items.map(item => item.location).filter(Boolean)));
  const locationsCount = activeLocations.length || 1; // Default to 1 if empty
  const totalValue = items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.value || item.price || 0)), 0);
  const lowStockCount = items.filter(item => {
    const qty = item.quantity || 0;
    const minQty = item.minQuantity !== undefined && item.minQuantity !== null ? Number(item.minQuantity) : 10;
    return qty > 0 && qty <= minQty;
  }).length;

  const stats = [
    { label: 'Total Item Types', value: distinctItemsCount.toLocaleString(), change: '+4%', trend: 'up', color: 'bg-blue-600' },
    { label: 'Active Locations', value: locationsCount.toString(), change: '+1', trend: 'up', color: 'bg-emerald-600' },
    { label: 'Total Value', value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: '+8%', trend: 'up', color: 'bg-violet-600' },
    { label: 'Low Stock Alert', value: lowStockCount.toString(), change: '-3%', trend: 'down', color: 'bg-amber-600' },
  ];

  // Aggregated data for charts
  const categoryCounts: { [key: string]: number } = {};
  items.forEach(item => {
    const cat = item.category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + (item.quantity || 0);
  });
  const categoryData = Object.keys(categoryCounts).map(name => ({
    id: `cat-${name.toLowerCase()}`,
    name,
    count: categoryCounts[name],
  }));

  const locationCounts: { [key: string]: number } = {};
  items.forEach(item => {
    const loc = item.location || 'Warehouse A';
    locationCounts[loc] = (locationCounts[loc] || 0) + (item.quantity || 0);
  });
  const locationData = Object.keys(locationCounts).map(name => ({
    id: `loc-${name.toLowerCase()}`,
    name,
    value: locationCounts[name],
  }));

  // Line chart trend mock data (but calibrated to actual current total value)
  const inventoryData = [
    { id: 'inv-jan', month: 'Jan', value: totalValue * 0.8 },
    { id: 'inv-feb', month: 'Feb', value: totalValue * 0.85 },
    { id: 'inv-mar', month: 'Mar', value: totalValue * 0.9 },
    { id: 'inv-apr', month: 'Apr', value: totalValue * 0.95 },
    { id: 'inv-may', month: 'May', value: totalValue },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Calculate recent actions from items list (e.g. items added or updated)
  const recentActivities = items.slice(-4).reverse().map((item, idx) => {
    const isNew = new Date(item.created_at || '').getTime() === new Date(item.updated_at || '').getTime();
    return {
      id: item.id || idx,
      type: isNew ? 'Item Added' : 'Stock Update',
      description: `${item.name} - SKU: ${item.sku || 'N/A'} (Qty: ${item.quantity})`,
      time: item.lastRestocked ? `Restocked: ${item.lastRestocked}` : 'Recently',
      status: isNew ? 'new' : 'updated',
    };
  });

  if (loading) {
    return (
      <div className="p-6 bg-slate-950 min-h-screen text-white flex items-center justify-center">
        Loading dashboard statistics...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen">
      <div>
        <h2 className="text-3xl mb-1 text-white">Dashboard</h2>
        <p className="text-slate-400">Overview of your inventory management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <h3 className="text-3xl mb-2 text-white">{stat.value}</h3>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.trend === 'up' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div key="inventory-chart-container" className="bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Inventory Value Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryData} id="inventory-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Value']}
              />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div key="category-chart-container" className="bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Items Quantity by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData.length > 0 ? categoryData : [{ name: 'None', count: 0 }]} id="category-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                formatter={(value) => [value, 'Quantity']}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div key="location-chart-container" className="bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Items by Location</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart id="location-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Pie
                data={locationData.length > 0 ? locationData : [{ name: 'None', value: 1 }]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(locationData.length > 0 ? locationData : [{ id: 'none', value: 1 }]).map((entry, index) => (
                  <Cell key={entry.id || index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'new' ? 'bg-emerald-500' :
                      activity.status === 'updated' ? 'bg-blue-500' : 'bg-amber-500'
                    }`} />
                    <div>
                      <div className="font-medium text-white">{activity.type}</div>
                      <div className="text-sm text-slate-400">{activity.description}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{activity.time}</div>
                </div>
              ))
            ) : (
              <div className="text-slate-500 p-4 text-center">No recent activities. Add items to see log activity.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
