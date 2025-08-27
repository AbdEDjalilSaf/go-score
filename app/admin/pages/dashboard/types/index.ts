export interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  lastLogin: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface WaitingProduct {
  id: number;
  name: string;
  category: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
}

export interface Subcategory {
  id: number;
  name: string;
  parentCategory: string;
  productsCount: number;
  status: 'active' | 'inactive';
}

export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  waitingProducts: number;
  totalCategories: number;
  recentUsers: User[];
  recentProducts: Product[];
}


export interface Wilaya {
  number: number;
  name: string;
}



export interface FormError {
  [key: string]: string;
}

export interface ProductFormData {
  title: string;
  price: string;
  description: string;
  location: string;
  wilaya: string;
  category: string;
  subcategoryId: string;
  picture: File | null;
}