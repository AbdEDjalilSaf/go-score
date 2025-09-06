// "use client"
// import React, { useState, useMemo } from 'react';
// import Layout from '@/app/admin/Layout/Layout';
// import { Search, Plus, Edit, Trash2, Power, Filter, MoreHorizontal } from 'lucide-react';
// import { usePackages } from './hooks/usePackages';
// import { Package } from './types/Package';
// import Modal from './components/Model';
// import PackageForm from './components/PackageForm';
// import ConfirmDialog from './components/ConfirmDialog';

// function Page() {
//   const { packages, loading, createPackage, updatePackage, deletePackage, togglePackageStatus } = usePackages();
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
//   const [billingFilter, setBillingFilter] = useState<'all' | 'monthly' | 'yearly'>('all');
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Filtered packages
//   const filteredPackages = useMemo(() => {
//     return packages.filter(pkg => {
//       const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
//       const matchesBilling = billingFilter === 'all' || pkg.billingCycle === billingFilter;
      
//       return matchesSearch && matchesStatus && matchesBilling;
//     });
//   }, [packages, searchTerm, statusFilter, billingFilter]);

//   const handleCreatePackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     setIsSubmitting(true);
//     try {
//       await createPackage(packageData);
//       setIsCreateModalOpen(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdatePackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     if (!selectedPackage) return;
    
//     setIsSubmitting(true);
//     try {
//       await updatePackage(selectedPackage.id, packageData);
//       setIsEditModalOpen(false);
//       setSelectedPackage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeletePackage = async () => {
//     if (!selectedPackage) return;
    
//     await deletePackage(selectedPackage.id);
//     setSelectedPackage(null);
//   };

//   const openEditModal = (pkg: Package) => {
//     setSelectedPackage(pkg);
//     setIsEditModalOpen(true);
//   };

//   const openDeleteDialog = (pkg: Package) => {
//     setSelectedPackage(pkg);
//     setIsDeleteDialogOpen(true);
//   };

//   const formatPrice = (price: number, cycle: string) => {
//     return `$${price.toFixed(2)}/${cycle === 'monthly' ? 'mo' : 'yr'}`;
//   };

//   const getStatusBadge = (status: 'active' | 'inactive') => {
//     const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
//     return status === 'active'
//       ? `${baseClasses} bg-green-100 text-green-800`
//       : `${baseClasses} bg-gray-100 text-gray-800`;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div>
//             <h1 className="text-2xl font-bold mb-2 text-gray-900">Subscription Packages</h1>
//             <p className="text-sm text-gray-500">Manage your subscription packages</p>
//             </div>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               type="button">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Package
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 min-w-0">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search packages..."
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div className="sm:w-40">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
//                 className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>

//             {/* Billing Filter */}
//             <div className="sm:w-40">
//               <select
//                 value={billingFilter}
//                 onChange={(e) => setBillingFilter(e.target.value as typeof billingFilter)}
//                 className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Billing</option>
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table - Desktop */}
//         <div className="hidden lg:block bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Package
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Billing
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Limits
//                 </th>
//                 <th className="relative px-6 py-3">
//                   <span className="sr-only">Actions</span>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredPackages.map((pkg) => (
//                 <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
//                       <div className="text-sm text-gray-500 max-w-xs truncate">{pkg.description}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-semibold text-gray-900">
//                       {formatPrice(pkg.price, pkg.billingCycle)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900 capitalize">{pkg.billingCycle}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={getStatusBadge(pkg.status)}>
//                       {pkg.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-xs text-gray-600 space-y-1">
//                       <div>Users: {pkg.maxUsers || 'Unlimited'}</div>
//                       <div>Projects: {pkg.maxProjects || 'Unlimited'}</div>
//                       <div>Storage: {pkg.storageLimit ? `${pkg.storageLimit}GB` : 'Unlimited'}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex items-center justify-end space-x-2">
//                       <button
//                         onClick={() => togglePackageStatus(pkg.id)}
//                         className={`p-1 rounded-md transition-colors ${
//                           pkg.status === 'active' 
//                             ? 'text-green-600 hover:bg-green-50' 
//                             : 'text-gray-400 hover:bg-gray-50'
//                         }`}
//                         title={pkg.status === 'active' ? 'Deactivate' : 'Activate'}
//                         type="button">
//                         <Power className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => openEditModal(pkg)}
//                         className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
//                         title="Edit"
//                         type="button">
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         onClick={() => openDeleteDialog(pkg)}
//                         className="p-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
//                         title="Delete"
//                         type="button">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Cards - Mobile & Tablet */}
//         <div className="lg:hidden grid gap-4 sm:grid-cols-2">
//           {filteredPackages.map((pkg) => (
//             <div key={pkg.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg font-semibold text-gray-900 truncate">{pkg.name}</h3>
//                   <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pkg.description}</p>
//                 </div>
//                 <div className="ml-4 flex-shrink-0">
//                   <button className="p-1 rounded-md text-gray-400 hover:bg-gray-50" type="button">
//                     <MoreHorizontal className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Price</span>
//                   <span className="text-lg font-semibold text-gray-900">
//                     {formatPrice(pkg.price, pkg.billingCycle)}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Billing</span>
//                   <span className="text-sm text-gray-900 capitalize">{pkg.billingCycle}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Status</span>
//                   <span className={getStatusBadge(pkg.status)}>
//                     {pkg.status}
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-500">Limits:</div>
//                   <div className="text-xs text-gray-600 space-y-1">
//                     <div>Users: {pkg.maxUsers || 'Unlimited'}</div>
//                     <div>Projects: {pkg.maxProjects || 'Unlimited'}</div>
//                     <div>Storage: {pkg.storageLimit ? `${pkg.storageLimit}GB` : 'Unlimited'}</div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={() => togglePackageStatus(pkg.id)}
//                     className={`p-2 rounded-md transition-colors ${
//                       pkg.status === 'active' 
//                         ? 'text-green-600 hover:bg-green-50' 
//                         : 'text-gray-400 hover:bg-gray-50'
//                     }`}
//                     type="button">
//                     <Power className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => openEditModal(pkg)}
//                     className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
//                     type="button">
//                     <Edit className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => openDeleteDialog(pkg)}
//                     className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
//                     type="button">
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredPackages.length === 0 && (
//           <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <Filter className="h-12 w-12 mx-auto" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
//             <p className="text-sm text-gray-500 mb-6">
//               {searchTerm || statusFilter !== 'all' || billingFilter !== 'all'
//                 ? 'Try adjusting your filters or search terms.'
//                 : 'Get started by creating your first subscription package.'
//               }
//             </p>
//             {!searchTerm && statusFilter === 'all' && billingFilter === 'all' && (
//               <button
//                 onClick={() => setIsCreateModalOpen(true)}
//                 className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 type="button">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Your First Package
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <Modal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         title="Create New Package"
//         size="lg"
//       >
//         <PackageForm
//           onSubmit={handleCreatePackage}
//           onCancel={() => setIsCreateModalOpen(false)}
//           isSubmitting={isSubmitting}
//         />
//       </Modal>

//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedPackage(null);
//         }}
//         title="Edit Package"
//         size="lg"
//       >
//         <PackageForm
//           package={selectedPackage}
//           onSubmit={handleUpdatePackage}
//           onCancel={() => {
//             setIsEditModalOpen(false);
//             setSelectedPackage(null);
//           }}
//           isSubmitting={isSubmitting}
//         />
//       </Modal>

//       <ConfirmDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => {
//           setIsDeleteDialogOpen(false);
//           setSelectedPackage(null);
//         }}
//         onConfirm={handleDeletePackage}
//         title="Delete Package"
//         message={`Are you sure you want to delete "${selectedPackage?.name}"? This action cannot be undone.`}
//         confirmText="Delete"
//         type="danger"
//       />
//     </div>
//     </Layout>
//   );
// }

// export default Page;










"use client"
import React, { useState, useMemo } from 'react';
import Layout from '@/app/admin/Layout/Layout';
import { Search, Plus, Edit, Trash2, Power, Filter, MoreHorizontal } from 'lucide-react';
import { usePackages } from './hooks/usePackages';
import { Package } from './types/Package';
// import Modal from './components/Model';
// import PackageForm from './components/PackageForm';
import ConfirmDialog from './components/ConfirmDialog';

function Page() {
//   const { packages, loading, createPackage, updatePackage, deletePackage, togglePackageStatus } = usePackages();
  
const { packages, loading, togglePackageStatus } = usePackages();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [billingFilter, setBillingFilter] = useState<'all' | 'monthly' | 'yearly'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
      const matchesBilling = billingFilter === 'all' || pkg.billingCycle === billingFilter;
      
      return matchesSearch && matchesStatus && matchesBilling;
    });
  }, [packages, searchTerm, statusFilter, billingFilter]);

//   const handleCreatePackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     setIsSubmitting(true);
//     try {
//       await createPackage(packageData);
//       setIsCreateModalOpen(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdatePackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => {
//     if (!selectedPackage) return;
    
//     setIsSubmitting(true);
//     try {
//       await updatePackage(selectedPackage.id, packageData);
//       setIsEditModalOpen(false);
//       setSelectedPackage(null);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeletePackage = async () => {
//     if (!selectedPackage) return;
    
//     await deletePackage(selectedPackage.id);
//     setSelectedPackage(null);
//   };

  const openEditModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDeleteDialogOpen(true);
  };

  const formatPrice = (price: number, cycle: string) => {
    return `${price.toFixed(2)} $/${cycle === 'monthly' ? 'شهر' : 'سنة'}`;
  };

  const getStatusBadge = (status: 'active' | 'inactive') => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    return status === 'active'
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getStatusText = (status: 'active' | 'inactive') => {
    return status === 'active' ? 'نشط' : 'غير نشط';
  };

  const getBillingText = (cycle: 'monthly' | 'yearly') => {
    return cycle === 'monthly' ? 'شهري' : 'سنوي';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-[90vh] bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="">
        <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-4">
          <div className="flex flex-col mb-7 md:mb-0 gap-3 md:gap-0 md:flex-row justify-between items-center h-16">
            <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">باقات الاشتراك</h1>
            <p className="text-sm text-gray-500">إدارة باقات الاشتراك الخاصة بك</p>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              type="button">
              <Plus className="h-4 w-4 ml-2" />
              إضافة باقة
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="البحث في الباقات..."
                  className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-40">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="block w-full pr-3 pl-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>

            {/* Billing Filter */}
            <div className="sm:w-40">
              <select
                value={billingFilter}
                onChange={(e) => setBillingFilter(e.target.value as typeof billingFilter)}
                className="block w-full pr-3 pl-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              >
                <option value="all">جميع أنواع الفوترة</option>
                <option value="monthly">شهري</option>
                <option value="yearly">سنوي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden lg:block bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الباقة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نوع الفوترة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحدود
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">الإجراءات</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{pkg.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(pkg.price, pkg.billingCycle)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getBillingText(pkg.billingCycle)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(pkg.status)}>
                      {getStatusText(pkg.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>المستخدمون: {pkg.maxUsers || 'غير محدود'}</div>
                      <div>المشاريع: {pkg.maxProjects || 'غير محدود'}</div>
                      <div>التخزين: {pkg.storageLimit ? `${pkg.storageLimit} جيجا` : 'غير محدود'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <button
                        onClick={() => togglePackageStatus(pkg.id)}
                        className={`p-1 rounded-md transition-colors ${
                          pkg.status === 'active' 
                            ? 'text-green-600 hover:bg-green-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={pkg.status === 'active' ? 'إلغاء التفعيل' : 'تفعيل'}
                        type="button">
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(pkg)}
                        className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                        title="تعديل"
                        type="button">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(pkg)}
                        className="p-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        title="حذف"
                        type="button">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - Mobile & Tablet */}
        <div className="lg:hidden grid gap-4 sm:grid-cols-2">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pkg.description}</p>
                </div>
                <div className="mr-4 flex-shrink-0">
                  <button className="p-1 rounded-md text-gray-400 hover:bg-gray-50" type="button">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">السعر</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(pkg.price, pkg.billingCycle)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">نوع الفوترة</span>
                  <span className="text-sm text-gray-900">{getBillingText(pkg.billingCycle)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">الحالة</span>
                  <span className={getStatusBadge(pkg.status)}>
                    {getStatusText(pkg.status)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500">الحدود:</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>المستخدمون: {pkg.maxUsers || 'غير محدود'}</div>
                    <div>المشاريع: {pkg.maxProjects || 'غير محدود'}</div>
                    <div>التخزين: {pkg.storageLimit ? `${pkg.storageLimit} جيجا` : 'غير محدود'}</div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 space-x-reverse pt-4 border-t border-gray-200">
                  <button
                    onClick={() => togglePackageStatus(pkg.id)}
                    className={`p-2 rounded-md transition-colors ${
                      pkg.status === 'active' 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    type="button">
                    <Power className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                    type="button">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openDeleteDialog(pkg)}
                    className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    type="button">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لم يتم العثور على باقات</h3>
            <p className="text-sm text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || billingFilter !== 'all'
                ? 'حاول تعديل المرشحات أو مصطلحات البحث.'
                : 'ابدأ بإنشاء أول باقة اشتراك.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && billingFilter === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="button">
                <Plus className="h-4 w-4 ml-2" />
                إضافة أول باقة
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {/* <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="إنشاء باقة جديدة"
        size="lg"
      >
        <PackageForm
          onSubmit={handleCreatePackage}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal> */}

      {/* <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPackage(null);
        }}
        title="تعديل الباقة"
        size="lg"
      >
        <PackageForm
          package={selectedPackage}
          onSubmit={handleUpdatePackage}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedPackage(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal> */}

      {/* <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedPackage(null);
        }}
        onConfirm={handleDeletePackage}
        title="حذف الباقة"
        message={`هل أنت متأكد من حذف "${selectedPackage?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        type="danger"
      /> */}
    </div>
    </Layout>
  );
}

export default Page;