"use client"
import React, { useState, useEffect } from 'react';
import { 
  Users, ShoppingBag, Clock, FolderTree, 
  TrendingUp, DollarSign, ShoppingCart, AlertCircle 
} from 'lucide-react';
import MetricCard from './Layout/MetricCard';
import Layout from './Layout/Layout';
import DashboardMain from "./pages/dashboard/dashboard"
import DataTable from './Layout/DataTable';
import { dashboardSummary } from "./Layout/mockData";
import StatusBadge from './Layout/StatusBadge';
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



const refreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.log('No refresh token found');
    return null;
  }

  try {
    const response = await axios.post(`/api/auth/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('token', newAccessToken); // Save new access token
    return newAccessToken;

  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};



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
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log('Unauthorized: Invalid or expired token');
          await refreshToken();
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
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
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
    <Layout>
  <>
      <DashboardMain />
  </>
    </Layout>
  );
};

export default Dashboard;