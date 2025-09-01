"use client"
import React, { useState, useEffect } from 'react';
import { 
  Users, ShoppingBag, School, Clock, FolderTree, 
  TrendingUp, DollarSign, CreditCard, MailPlus, Mails, GraduationCap, BookOpenText, ShoppingCart, AlertCircle 
} from 'lucide-react';
import MetricCard from "../../Layout/MetricCard"
import DataTable from '../../Layout/DataTable';
import { dashboardSummary } from './mockData';
import StatusBadge from '../../Layout/StatusBadge';
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  total: number;
  description: string;
}


const Dashboard: React.FC = () => {
  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

    const [role] = useState('admin');
    const [folders, setFolders] = useState<any[]>([]);
  

    const [products, setProducts] = useState<Product[]>([]);
  
  const productColumns = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price', render: (price: number) => `$${price.toFixed(2)}` },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => {
        const statusMap: Record<string, { type: 'success' | 'warning' | 'error', text: string }> = {
          'in-stock': { type: 'success', text: 'In Stock' },
          'low-stock': { type: 'warning', text: 'Low Stock' },
          'out-of-stock': { type: 'error', text: 'Out of Stock' }
        };
        const { type, text } = statusMap[status] || { type: 'info', text: status };
        return <StatusBadge status={type} text={text} />;
      }
    },
  ];



  
  function normalizeData(input: any[] | { data: any[] }): any[] {
  // إذا كان المدخل مصفوفة، إرجاعها كما هي
  if (Array.isArray(input)) {
    return input;
  }
  // إذا كان المدخل كائنًا يحتوي على خاصية `data` مصفوفة، إرجاعها
  else if (input && typeof input === 'object' && 'data' in input && Array.isArray(input.data)) {
    return input.data;
  }
  // في حالات أخرى، إرجاع مصفوفة فارغة كقيمة افتراضية
  return [];
}






  const fetchData = async () => {
    if (role !== 'admin') {
      console.log('Unauthorized: Only admins can fetch user data');
      return;
    }

    // setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      
      if (!token) {
        console.log('No authentication token found');
        return;
      }

      const response = await axios.get(
        `/api/users`, // Adjusted URL to include pagination
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        const normalize = normalizeData(response.data);
        
        setFolders(normalize);
       
       
      }
    } catch (error) {
        const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (refreshSuccess) {
                return fetchData()
          }
          console.log('Unauthorized: Invalid or expired token');
        } else {
          console.log('Error fetching users:', error.message);
        }
      }
    } finally {
    }
  };


  const fetchDataProducts = async () => {
    if (role !== 'admin') {
      console.log('Unauthorized: Only admins can fetch user data');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      
      if (!token) {
        console.log('No authentication token found');
        return;
      }

      const response = await axios.get(
        `/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
      
        setProducts(response.data.products);
        console.log('Products fetched successfully:', response.data);


      }
    } catch (error) {
        const refreshSuccess = await refreshAuthToken()
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          if (refreshSuccess) {
                return fetchDataProducts()
          }
          console.log('Unauthorized: Invalid or expired token');
        } else {
          console.log('Error fetching users:', error.message);
        }
      }
    } finally {
    }
  };



  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData();
      await fetchDataProducts();
    };
    fetchAllData();
  }, []);




  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl mb-4 font-normal text-gray-800">الرئيسية</h1>
        <p className="text-gray-600">اهلا في الصفحة الرئيسية الخاصة بك</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title=" مجموع الطلاب" 
          value={folders.length} 
          icon={<GraduationCap />} 
          iconColor="text-blue-500"
        />
        <MetricCard 
          title="مجموع الاساتذة" 
          value={products.length} 
          icon={<BookOpenText />} 
          iconColor="text-green-500"
        />
        <MetricCard 
          title="مجموع المدارس" 
          value={dashboardSummary.waitingProducts} 
          icon={<School />} 
          iconColor="text-amber-500"
        />
        <MetricCard 
          title="مجموع طلبات الاساتذة" 
          value={dashboardSummary.totalCategories} 
          icon={<Mails />} 
          iconColor="text-indigo-500"
        />
        <MetricCard 
          title="مجموع طلبات المدارس" 
          value={products.length} 
          icon={<MailPlus />} 
          iconColor="text-green-500"
        />
        <MetricCard 
          title="مجموع طلبات الدفع المعلقة" 
          value={dashboardSummary.waitingProducts} 
          icon={<CreditCard />} 
          iconColor="text-amber-500"
        />
        <MetricCard 
          title="مجموع طلبات الاشتراكات" 
          value={dashboardSummary.totalCategories} 
          icon={<FolderTree />} 
          iconColor="text-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
            <select className="text-sm border-gray-300 rounded-md">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-md p-2 mr-3">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-xl font-semibold">$24,780</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-md p-2 mr-3">
                  <ShoppingCart className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-xl font-semibold">356</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-amber-100 rounded-md p-2 mr-3">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-xl font-semibold">$16,273</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-md p-2 mr-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Refunds</p>
                  <p className="text-xl font-semibold">$1,420</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Sales Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-5">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-500">Jane Smith joined as Manager</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">New product added</p>
                  <p className="text-sm text-gray-500">Wireless Headphones - $149.99</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Product approval</p>
                  <p className="text-sm text-gray-500">Ultra HD Monitor approved</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FolderTree className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Category updated</p>
                  <p className="text-sm text-gray-500">Gaming category restructured</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable 
          title="Recent Users" 
          columns={userColumns} 
          data={dashboardSummary.recentUsers} 
        />
        <DataTable 
          title="Recent Products" 
          columns={productColumns} 
          data={dashboardSummary.recentProducts} 
        />
      </div>
    </div>
  );
};

export default Dashboard;