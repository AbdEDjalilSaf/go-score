import type { User, Product, DashboardSummary, WaitingProduct, Subcategory } from './types';

// Mock Users Data
export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    role: 'Admin',
    lastLogin: '2023-05-15T10:30:00',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    role: 'Manager',
    lastLogin: '2023-05-14T08:45:00',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    status: 'inactive',
    role: 'User',
    lastLogin: '2023-04-20T14:20:00',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'active',
    role: 'Editor',
    lastLogin: '2023-05-12T11:15:00',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    status: 'active',
    role: 'User',
    lastLogin: '2023-05-13T09:30:00',
  },
];

// Mock Products Data
export const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone X',
    category: 'Electronics',
    price: 799.99,
    stock: 45,
    status: 'in-stock',
  },
  {
    id: 2,
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 12,
    status: 'low-stock',
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 149.99,
    stock: 78,
    status: 'in-stock',
  },
  {
    id: 4,
    name: 'Gaming Console',
    category: 'Gaming',
    price: 499.99,
    stock: 0,
    status: 'out-of-stock',
  },
  {
    id: 5,
    name: 'Smartwatch',
    category: 'Wearables',
    price: 249.99,
    stock: 23,
    status: 'in-stock',
  },
];

// Mock Waiting Products Data
export const waitingProducts: WaitingProduct[] = [
  {
    id: 1,
    name: 'Ultra HD Monitor',
    category: 'Electronics',
    submittedBy: 'Vendor A',
    submittedDate: '2023-05-10T09:15:00',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Peripherals',
    submittedBy: 'Vendor B',
    submittedDate: '2023-05-11T14:30:00',
    status: 'reviewing',
  },
  {
    id: 3,
    name: 'Wireless Mouse',
    category: 'Peripherals',
    submittedBy: 'Vendor C',
    submittedDate: '2023-05-09T11:45:00',
    status: 'approved',
  },
  {
    id: 4,
    name: 'External SSD',
    category: 'Storage',
    submittedBy: 'Vendor A',
    submittedDate: '2023-05-08T10:20:00',
    status: 'rejected',
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    submittedBy: 'Vendor D',
    submittedDate: '2023-05-12T16:00:00',
    status: 'pending',
  },
];

// Mock Subcategories Data
export const subcategories: Subcategory[] = [
  {
    id: 1,
    name: 'Smartphones',
    parentCategory: 'Electronics',
    productsCount: 32,
    status: 'active',
  },
  {
    id: 2,
    name: 'Laptops',
    parentCategory: 'Electronics',
    productsCount: 24,
    status: 'active',
  },
  {
    id: 3,
    name: 'Headphones',
    parentCategory: 'Audio',
    productsCount: 18,
    status: 'active',
  },
  {
    id: 4,
    name: 'Consoles',
    parentCategory: 'Gaming',
    productsCount: 9,
    status: 'active',
  },
  {
    id: 5,
    name: 'PC Games',
    parentCategory: 'Gaming',
    productsCount: 0,
    status: 'inactive',
  },
];

// Dashboard Summary Data
export const dashboardSummary: DashboardSummary = {
  totalUsers: 156,
  totalProducts: 478,
  waitingProducts: 23,
  totalCategories: 32,
  recentUsers: users.slice(0, 3),
  recentProducts: products.slice(0, 3),
};