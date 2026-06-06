const API_BASE_URL = 'http://localhost:8000';

// Item API
export interface Item {
  id: number;
  name: string;
  description?: string;
  sku?: string;
  category?: string;
  location?: string;
  quantity: number;
  minQuantity?: number;
  price: number;
  value?: number;
  supplier?: string;
  lastRestocked?: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  created_at?: string;
}

// Items API
export const itemsAPI = {
  async getAll(): Promise<Item[]> {
    const response = await fetch(`${API_BASE_URL}/items/`);
    if (!response.ok) throw new Error('Failed to fetch items');
    const data = await response.json();
    return data.items;
  },

  async getById(id: number): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    const data = await response.json();
    return data.item || data;
  },

  async create(item: Omit<Item, 'id' | 'created_at' | 'updated_at'>): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/items/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to create item');
    const data = await response.json();
    return data.created;
  },

  async update(id: number, item: Omit<Item, 'id' | 'created_at' | 'updated_at'>): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to update item');
    const data = await response.json();
    return data.updated;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
  },
};

// Categories API
export const categoriesAPI = {
  async getAll(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.categories;
  },

  async getById(id: number): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    const data = await response.json();
    return data.category || data;
  },

  async create(category: Omit<Category, 'id' | 'created_at'>): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    const data = await response.json();
    return data.created;
  },

  async update(id: number, category: Omit<Category, 'id' | 'created_at'>): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
    const data = await response.json();
    return data.updated;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
  },
};

// Users API
export const usersAPI = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users/`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data.users;
  },

  async getById(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    const data = await response.json();
    return data.user || data;
  },

  async create(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to create user');
    const data = await response.json();
    return data.created;
  },

  async update(id: number, user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to update user');
    const data = await response.json();
    return data.updated;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};
