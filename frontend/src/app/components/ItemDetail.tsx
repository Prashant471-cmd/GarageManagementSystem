import { useState, useEffect } from 'react';
import { ArrowBack, Save, Delete } from '@mui/icons-material';
import { itemsAPI, categoriesAPI } from '../../services/api';

interface ItemDetailProps {
  itemId?: string;
  onBack: () => void;
}

export function ItemDetail({ itemId, onBack }: ItemDetailProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    location: 'Warehouse A',
    quantity: '0',
    minQuantity: '10',
    value: '0',
    description: '',
    supplier: '',
    lastRestocked: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(['Electronics', 'Furniture', 'Tools', 'Supplies', 'Equipment']);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load categories
        try {
          const cats = await categoriesAPI.getAll();
          if (cats && cats.length > 0) {
            setCategories(cats.map(c => c.name));
          }
        } catch (catErr) {
          console.warn('Failed to load categories, using defaults:', catErr);
        }

        // Load item if editing
        if (itemId && itemId !== 'new') {
          const item = await itemsAPI.getById(Number(itemId));
          setFormData({
            name: item.name || '',
            sku: item.sku || '',
            category: item.category || 'Electronics',
            location: item.location || 'Warehouse A',
            quantity: String(item.quantity || 0),
            minQuantity: String(item.minQuantity !== undefined && item.minQuantity !== null ? item.minQuantity : 10),
            value: String(item.value || item.price || 0),
            description: item.description || '',
            supplier: item.supplier || '',
            lastRestocked: item.lastRestocked || '',
          });
        } else {
          // Initialize defaults for new item
          setFormData({
            name: '',
            sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
            category: 'Electronics',
            location: 'Warehouse A',
            quantity: '0',
            minQuantity: '10',
            value: '0',
            description: '',
            supplier: '',
            lastRestocked: new Date().toISOString().split('T')[0],
          });
        }
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch item details.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        category: formData.category,
        location: formData.location,
        quantity: Number(formData.quantity) || 0,
        minQuantity: Number(formData.minQuantity) || 0,
        price: Number(formData.value) || 0,
        value: Number(formData.value) || 0,
        description: formData.description,
        supplier: formData.supplier,
        lastRestocked: formData.lastRestocked,
      };

      if (itemId && itemId !== 'new') {
        await itemsAPI.update(Number(itemId), payload);
      } else {
        await itemsAPI.create(payload);
      }
      onBack();
    } catch (err: any) {
      alert('Failed to save item: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (itemId && itemId !== 'new' && window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemsAPI.delete(Number(itemId));
        onBack();
      } catch (err: any) {
        alert('Failed to delete item: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-slate-950 min-h-screen text-white flex items-center justify-center">
        Loading details...
      </div>
    );
  }

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
          {itemId && itemId !== 'new' ? 'Edit Item' : 'New Item'}
        </h2>
        <p className="text-slate-400">
          {itemId && itemId !== 'new' ? 'Update item details and inventory information' : 'Add a new item to your inventory'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-800">
          {error}
        </div>
      )}

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
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
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
                {itemId && itemId !== 'new' && (
                  <button
                    type="button"
                    onClick={handleDelete}
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
                  ${((Number(formData.quantity) || 0) * (Number(formData.value) || 0)).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Status</div>
                <div className="mt-1">
                  {(Number(formData.quantity) || 0) > (Number(formData.minQuantity) || 10) ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                      In Stock
                    </span>
                  ) : (Number(formData.quantity) || 0) > 0 ? (
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
              {formData.lastRestocked && (
                <div className="text-sm">
                  <div className="text-slate-400">{formData.lastRestocked}</div>
                  <div className="text-white">Restocked/Updated to {formData.quantity} units</div>
                </div>
              )}
              <div className="text-sm">
                <div className="text-slate-400">Initial Setup</div>
                <div className="text-white">Item added to inventory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
