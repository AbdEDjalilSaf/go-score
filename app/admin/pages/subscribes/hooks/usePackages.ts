// "use client"
// import { useState, useEffect } from 'react';
// import { Package } from '../types/Package';

// // Mock data for demonstration
// const mockPackages: Package[] = [
//   {
//     id: '1',
//     name: 'Basic Plan',
//     description: 'Perfect for individuals and small teams getting started',
//     price: 9.99,
//     billingCycle: 'monthly',
//     features: ['5 Users', '10 Projects', 'Basic Support', '10GB Storage'],
//     status: 'active',
//     maxUsers: 5,
//     maxProjects: 10,
//     storageLimit: 10,
//     createdAt: new Date('2024-01-01'),
//     updatedAt: new Date('2024-01-01')
//   },
//   {
//     id: '2',
//     name: 'Pro Plan',
//     description: 'Ideal for growing businesses with advanced features',
//     price: 29.99,
//     billingCycle: 'monthly',
//     features: ['25 Users', '50 Projects', 'Priority Support', '100GB Storage', 'Advanced Analytics'],
//     status: 'active',
//     maxUsers: 25,
//     maxProjects: 50,
//     storageLimit: 100,
//     createdAt: new Date('2024-01-01'),
//     updatedAt: new Date('2024-01-15')
//   },
//   {
//     id: '3',
//     name: 'Enterprise',
//     description: 'Complete solution for large organizations',
//     price: 99.99,
//     billingCycle: 'monthly',
//     features: ['Unlimited Users', 'Unlimited Projects', 'Dedicated Support', 'Unlimited Storage', 'Custom Integrations', 'SLA'],
//     status: 'active',
//     createdAt: new Date('2024-01-01'),
//     updatedAt: new Date('2024-01-20')
//   },
//   {
//     id: '4',
//     name: 'Starter Annual',
//     description: 'Basic plan with annual billing discount',
//     price: 99.99,
//     billingCycle: 'yearly',
//     features: ['5 Users', '10 Projects', 'Email Support', '10GB Storage'],
//     status: 'inactive',
//     maxUsers: 5,
//     maxProjects: 10,
//     storageLimit: 10,
//     createdAt: new Date('2024-02-01'),
//     updatedAt: new Date('2024-02-01')
//   }
// ];

// export const usePackages = () => {
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setPackages(mockPackages);
//       setLoading(false);
//     }, 500);
//   }, []);

//   const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     const newPackage: Package = {
//       ...packageData,
//       id: Math.random().toString(36).substr(2, 9),
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };
    
//     setPackages(prev => [...prev, newPackage]);
//     return newPackage;
//   };

//   const updatePackage = async (id: string, packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     setPackages(prev => prev.map(pkg => 
//       pkg.id === id 
//         ? { ...pkg, ...packageData, updatedAt: new Date() }
//         : pkg
//     ));
//   };

//   const deletePackage = async (id: string) => {
//     setPackages(prev => prev.filter(pkg => pkg.id !== id));
//   };

//   const togglePackageStatus = async (id: string) => {
//     setPackages(prev => prev.map(pkg => 
//       pkg.id === id 
//         ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active', updatedAt: new Date() }
//         : pkg
//     ));
//   };

//   return {
//     packages,
//     loading,
//     createPackage,
//     updatePackage,
//     deletePackage,
//     togglePackageStatus
//   };
// };















import { useState, useEffect } from 'react';
import { Package } from '../types/Package';

// Mock data for demonstration
const mockPackages: Package[] = [
  {
    id: '1',
    name: 'الباقة الأساسية',
    description: 'مثالية للأفراد والفرق الصغيرة التي تبدأ رحلتها',
    price: 9.99,
    billingCycle: 'monthly',
    features: ['5 مستخدمين', '10 مشاريع', 'دعم أساسي', '10 جيجا تخزين'],
    status: 'active',
    maxUsers: 5,
    maxProjects: 10,
    storageLimit: 10,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'الباقة المتقدمة',
    description: 'مثالية للشركات النامية مع المميزات المتقدمة',
    price: 29.99,
    billingCycle: 'monthly',
    features: ['25 مستخدم', '50 مشروع', 'دعم أولوية', '100 جيجا تخزين', 'تحليلات متقدمة'],
    status: 'active',
    maxUsers: 25,
    maxProjects: 50,
    storageLimit: 100,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'باقة المؤسسات',
    description: 'حل شامل للمؤسسات الكبيرة',
    price: 99.99,
    billingCycle: 'monthly',
    features: ['مستخدمون غير محدودون', 'مشاريع غير محدودة', 'دعم مخصص', 'تخزين غير محدود', 'تكاملات مخصصة', 'اتفاقية مستوى الخدمة'],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'الباقة السنوية المبتدئة',
    description: 'الباقة الأساسية مع خصم الفوترة السنوية',
    price: 99.99,
    billingCycle: 'yearly',
    features: ['5 مستخدمين', '10 مشاريع', 'دعم بريد إلكتروني', '10 جيجا تخزين'],
    status: 'inactive',
    maxUsers: 5,
    maxProjects: 10,
    storageLimit: 10,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPackages(mockPackages);
      setLoading(false);
    }, 500);
  }, []);

  const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPackage: Package = {
      ...packageData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setPackages(prev => [...prev, newPackage]);
    return newPackage;
  };

  const updatePackage = async (id: string, packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id 
        ? { ...pkg, ...packageData, updatedAt: new Date() }
        : pkg
    ));
  };

  const deletePackage = async (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const togglePackageStatus = async (id: string) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id 
        ? { ...pkg, status: pkg.status === 'active' ? 'inactive' : 'active', updatedAt: new Date() }
        : pkg
    ));
  };

  return {
    packages,
    loading,
    createPackage,
    updatePackage,
    deletePackage,
    togglePackageStatus
  };
};