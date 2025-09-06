// "use client"
// import React, { useState, useEffect } from 'react';
// import { Package } from '../types/Package';

// interface PackageFormProps {
//   package?: Package | null;
//   onSubmit: (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => void;
//   onCancel: () => void;
//   isSubmitting?: boolean;
// }

// const PackageForm: React.FC<PackageFormProps> = ({ 
//   package: pkg, 
//   onSubmit, 
//   onCancel, 
//   isSubmitting = false 
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     billingCycle: 'monthly' as 'monthly' | 'yearly',
//     features: [''],
//     status: 'active' as 'active' | 'inactive',
//     maxUsers: '',
//     maxProjects: '',
//     storageLimit: ''
//   });

//   useEffect(() => {
//     if (pkg) {
//       setFormData({
//         name: pkg.name,
//         description: pkg.description,
//         price: pkg.price.toString(),
//         billingCycle: pkg.billingCycle,
//         features: pkg.features.length > 0 ? pkg.features : [''],
//         status: pkg.status,
//         maxUsers: pkg.maxUsers?.toString() || '',
//         maxProjects: pkg.maxProjects?.toString() || '',
//         storageLimit: pkg.storageLimit?.toString() || ''
//       });
//     }
//   }, [pkg]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const packageData = {
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       billingCycle: formData.billingCycle,
//       features: formData.features.filter(feature => feature.trim() !== ''),
//       status: formData.status,
//       maxUsers: formData.maxUsers ? parseInt(formData.maxUsers) : undefined,
//       maxProjects: formData.maxProjects ? parseInt(formData.maxProjects) : undefined,
//       storageLimit: formData.storageLimit ? parseInt(formData.storageLimit) : undefined
//     };
    
//     onSubmit(packageData);
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, '']
//     }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const updateFeature = (index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => i === index ? value : feature)
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Package Name *
//           </h3>
//           <input
//             type="text"
//             required
//             value={formData.name}
//             onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="e.g., Pro Plan"
//           />
//         </div>

//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Price *
//           </h3>
//           <div className="relative">
//             <span className="absolute left-3 top-2 text-gray-500">$</span>
//             <input
//               type="number"
//               required
//               step="0.01"
//               min="0"
//               value={formData.price}
//               onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
//               className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="29.99"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Billing Cycle
//           </h3>
//           <select
//             value={formData.billingCycle}
//             onChange={(e) => setFormData(prev => ({ ...prev, billingCycle: e.target.value as 'monthly' | 'yearly' }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//         </div>

//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Status
//           </h3>
//           <select
//             value={formData.status}
//             onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         <h3 className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </h3>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Brief description of the package..."
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Max Users
//           </h3>
//           <input
//             type="number"
//             min="1"
//             value={formData.maxUsers}
//             onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: e.target.value }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Unlimited"
//           />
//         </div>

//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Max Projects
//           </h3>
//           <input
//             type="number"
//             min="1"
//             value={formData.maxProjects}
//             onChange={(e) => setFormData(prev => ({ ...prev, maxProjects: e.target.value }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Unlimited"
//           />
//         </div>

//         <div>
//           <h3 className="block text-sm font-medium text-gray-700 mb-1">
//             Storage (GB)
//           </h3>
//           <input
//             type="number"
//             min="1"
//             value={formData.storageLimit}
//             onChange={(e) => setFormData(prev => ({ ...prev, storageLimit: e.target.value }))}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Unlimited"
//           />
//         </div>
//       </div>

//       <div>
//         <h3 className="block text-sm font-medium text-gray-700 mb-2">
//           Features
//         </h3>
//         <div className="space-y-2">
//           {formData.features.map((feature, index) => (
//             <div key={index} className="flex gap-2">
//               <input
//                 type="text"
//                 value={feature}
//                 onChange={(e) => updateFeature(index, e.target.value)}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter feature..."
//               />
//               {formData.features.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeFeature(index)}
//                   className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addFeature}
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//           >
//             + Add Feature
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Saving...' : (pkg ? 'Update Package' : 'Create Package')}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default PackageForm;










import React, { useState, useEffect } from 'react';
import { Package } from '../types/Package';

interface PackageFormProps {
  package?: Package | null;
  onSubmit: (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ 
  package: pkg, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    features: [''],
    status: 'active' as 'active' | 'inactive',
    maxUsers: '',
    maxProjects: '',
    storageLimit: ''
  });

  useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        description: pkg.description,
        price: pkg.price.toString(),
        billingCycle: pkg.billingCycle,
        features: pkg.features.length > 0 ? pkg.features : [''],
        status: pkg.status,
        maxUsers: pkg.maxUsers?.toString() || '',
        maxProjects: pkg.maxProjects?.toString() || '',
        storageLimit: pkg.storageLimit?.toString() || ''
      });
    }
  }, [pkg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const packageData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      features: formData.features.filter(feature => feature.trim() !== ''),
      status: formData.status,
      maxUsers: formData.maxUsers ? parseInt(formData.maxUsers) : undefined,
      maxProjects: formData.maxProjects ? parseInt(formData.maxProjects) : undefined,
      storageLimit: formData.storageLimit ? parseInt(formData.storageLimit) : undefined
    };
    
    onSubmit(packageData);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            اسم الباقة *
          </h3>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            placeholder="مثال: الباقة المتقدمة"
          />
        </div>

        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            السعر *
          </h3>
          <div className="relative">
            <span className="absolute right-3 top-2 text-gray-500">ر.س</span>
            <input
              type="number"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full pr-12 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              placeholder="29.99"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            دورة الفوترة
          </h3>
          <select
            value={formData.billingCycle}
            onChange={(e) => setFormData(prev => ({ ...prev, billingCycle: e.target.value as 'monthly' | 'yearly' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          >
            <option value="monthly">شهري</option>
            <option value="yearly">سنوي</option>
          </select>
        </div>

        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الحالة
          </h3>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
          الوصف
        </h3>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          placeholder="وصف مختصر للباقة..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الحد الأقصى للمستخدمين
          </h3>
          <input
            type="number"
            min="1"
            value={formData.maxUsers}
            onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            placeholder="غير محدود"
          />
        </div>

        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الحد الأقصى للمشاريع
          </h3>
          <input
            type="number"
            min="1"
            value={formData.maxProjects}
            onChange={(e) => setFormData(prev => ({ ...prev, maxProjects: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            placeholder="غير محدود"
          />
        </div>

        <div>
          <h3 className="block text-sm font-medium text-gray-700 mb-1 text-right">
            التخزين (جيجا)
          </h3>
          <input
            type="number"
            min="1"
            value={formData.storageLimit}
            onChange={(e) => setFormData(prev => ({ ...prev, storageLimit: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            placeholder="غير محدود"
          />
        </div>
      </div>

      <div>
        <h3 className="block text-sm font-medium text-gray-700 mb-2 text-right">
          المميزات
        </h3>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                placeholder="أدخل الميزة..."
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  إزالة
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + إضافة ميزة
          </button>
        </div>
      </div>

      <div className="flex gap-3 justify-end space-x-3 space-x-reverse pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'جاري الحفظ...' : (pkg ? 'تحديث الباقة' : 'إنشاء الباقة')}
        </button>
      </div>
    </form>
  );
};

export default PackageForm;