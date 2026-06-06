import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Dashboard() {
  const stats = [
    { label: 'Total Items', value: '1,247', change: '+12%', trend: 'up', color: 'bg-blue-600' },
    { label: 'Active Locations', value: '8', change: '+2', trend: 'up', color: 'bg-emerald-600' },
    { label: 'Total Value', value: '$127,450', change: '+15%', trend: 'up', color: 'bg-violet-600' },
    { label: 'Low Stock', value: '23', change: '-8%', trend: 'down', color: 'bg-amber-600' },
  ];

  const inventoryData = [
    { id: 'inv-jan', month: 'Jan', value: 98500 },
    { id: 'inv-feb', month: 'Feb', value: 105200 },
    { id: 'inv-mar', month: 'Mar', value: 112800 },
    { id: 'inv-apr', month: 'Apr', value: 118900 },
    { id: 'inv-may', month: 'May', value: 127450 },
  ];

  const categoryData = [
    { id: 'cat-electronics', name: 'Electronics', count: 342 },
    { id: 'cat-furniture', name: 'Furniture', count: 218 },
    { id: 'cat-tools', name: 'Tools', count: 189 },
    { id: 'cat-supplies', name: 'Supplies', count: 298 },
    { id: 'cat-equipment', name: 'Equipment', count: 200 },
  ];

  const locationData = [
    { id: 'loc-warehouse-a', name: 'Warehouse A', value: 487 },
    { id: 'loc-warehouse-b', name: 'Warehouse B', value: 342 },
    { id: 'loc-retail', name: 'Retail Store', value: 218 },
    { id: 'loc-other', name: 'Other', value: 200 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

  const recentActivities = [
    { id: 1, type: 'Item Added', description: 'MacBook Pro 16" - SKU-1234', time: '5 mins ago', status: 'new' },
    { id: 2, type: 'Stock Update', description: 'Office Chairs - Qty: 50', time: '15 mins ago', status: 'updated' },
    { id: 3, type: 'Location Transfer', description: 'Electronics to Warehouse B', time: '1 hour ago', status: 'transferred' },
    { id: 4, type: 'Low Stock Alert', description: 'Printer Paper - Below threshold', time: '2 hours ago', status: 'alert' },
  ];

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
                formatter={(value) => [`$${value}`, 'Value']}
              />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div key="category-chart-container" className="bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Items by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} id="category-chart" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                formatter={(value) => [value, 'Items']}
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
                data={locationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {locationData.map((entry, index) => (
                  <Cell key={entry.id} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-800">
          <h3 className="text-xl mb-4 text-white">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'new' ? 'bg-emerald-500' :
                    activity.status === 'updated' ? 'bg-blue-500' :
                    activity.status === 'transferred' ? 'bg-violet-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <div className="font-medium text-white">{activity.type}</div>
                    <div className="text-sm text-slate-400">{activity.description}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
