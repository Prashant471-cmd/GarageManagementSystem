import { useState } from 'react';
import { ArrowBack, Save, Delete } from '@mui/icons-material';

interface ItemDetailProps {
  itemId?: string;
  onBack: () => void;
}

export function ItemDetail({ itemId, onBack }: ItemDetailProps) {
  const [formData, setFormData] = useState({
    name: 'MacBook Pro 16"',
    sku: 'SKU-1001',
    category: 'Electronics',
    location: 'Warehouse A',
    quantity: '24',
    minQuantity: '10',
    value: '2499',
    description: 'High-performance laptop with M3 Pro chip, 16GB RAM, 512GB SSD',
    supplier: 'Apple Inc.',
    lastRestocked: '2026-05-15',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving item:', formData);
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowBack fontSize="small" />
          Back to Items
        </button>
        <h2 className="text-3xl mb-1 text-white">
          {itemId ? 'Edit Item' : 'New Item'}
        </h2>
        <p className="text-slate-400">
          {itemId ? 'Update item details and inventory information' : 'Add a new item to your inventory'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Tools">Tools</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Retail Store">Retail Store</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Min Quantity
                  </label>
                  <input
                    type="number"
                    name="minQuantity"
                    value={formData.minQuantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Unit Value ($)
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Restocked
                  </label>
                  <input
                    type="date"
                    name="lastRestocked"
                    value={formData.lastRestocked}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save fontSize="small" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                {itemId && (
                  <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors ml-auto"
                  >
                    <Delete fontSize="small" />
                    Delete Item
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Item Summary</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-400">Total Value</div>
                <div className="text-2xl text-white">
                  ${(parseInt(formData.quantity) * parseInt(formData.value)).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Status</div>
                <div className="mt-1">
                  {parseInt(formData.quantity) > parseInt(formData.minQuantity) ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      In Stock
                    </span>
                  ) : parseInt(formData.quantity) > 0 ? (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                      Low Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Recent History</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="text-slate-400">May 15, 2026</div>
                <div className="text-white">Restocked +50 units</div>
              </div>
              <div className="text-sm">
                <div className="text-slate-400">May 10, 2026</div>
                <div className="text-white">Updated price to $2,499</div>
              </div>
              <div className="text-sm">
                <div className="text-slate-400">May 5, 2026</div>
                <div className="text-white">Moved to Warehouse A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
