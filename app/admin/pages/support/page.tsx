// "use client"
// import React, { useState } from 'react';
// import { Plus, FileText, TrendingUp, Archive } from 'lucide-react';
// import { useBlogs } from '../hooks/useBlogs';
// import { SearchFilters } from './SearchFilters';
// import { BlogList } from './BlogList';
// import { BlogForm } from './BlogForm';
// import { Blog } from '../types/blog';

// export const BlogAdmin: React.FC = () => {
//   const {
//     blogs,
//     loading,
//     filters,
//     setFilters,
//     createBlog,
//     updateBlog,
//     deleteBlog,
//     deleteBlogs,
//     categories,
//     authors
//   } = useBlogs();

//   const [showForm, setShowForm] = useState(false);
//   const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
//   const [formLoading, setFormLoading] = useState(false);

//   const handleCreateBlog = () => {
//     setEditingBlog(null);
//     setShowForm(true);
//   };

//   const handleEditBlog = (blog: Blog) => {
//     setEditingBlog(blog);
//     setShowForm(true);
//   };

//   const handleFormSubmit = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
//     setFormLoading(true);
//     try {
//       if (editingBlog) {
//         await updateBlog(editingBlog.id, blogData);
//       } else {
//         await createBlog(blogData);
//       }
//       setShowForm(false);
//       setEditingBlog(null);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDeleteBlog = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this blog post?')) {
//       await deleteBlog(id);
//     }
//   };

//   const handleDeleteSelected = async (ids: string[]) => {
//     if (window.confirm(`Are you sure you want to delete ${ids.length} blog posts?`)) {
//       await deleteBlogs(ids);
//     }
//   };

//   const handleSearch = () => {
//     // Search is handled automatically by the useBlogs hook
//     // This is just for explicit search button clicks
//   };

//   // Calculate stats
//   const stats = {
//     total: blogs.length,
//     published: blogs.filter(b => b.status === 'published').length,
//     drafts: blogs.filter(b => b.status === 'draft').length,
//     archived: blogs.filter(b => b.status === 'archived').length
//   };

//   return (
//     <div className="min-h-[90vh] bg-gray-50">
//       {/* Header */}
//       <div className=" border-b px-4 sm:px-6 lg:px-8">
//         <div className="max-w-full mx-auto py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
//               <p className="text-gray-600 mt-1">Manage and organize your blog content</p>
//             </div>
//             <button
//               onClick={handleCreateBlog}
//               className="inline-flex items-center px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium shadow-sm"
//             type='button'>
//               <Plus className="h-4 w-4 mr-2" />
//               Create Blog
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Blogs</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//               </div>
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <FileText className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Published</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
//               </div>
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Drafts</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
//               </div>
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <FileText className="h-6 w-6 text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Archived</p>
//                 <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
//               </div>
//               <div className="p-2 bg-gray-100 rounded-lg">
//                 <Archive className="h-6 w-6 text-gray-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <SearchFilters
//           filters={filters}
//           setFilters={setFilters}
//           categories={categories}
//           authors={authors}
//           onSearch={handleSearch}
//         />

//         {/* Blog List */}
//         <BlogList
//           blogs={blogs}
//           onEdit={handleEditBlog}
//           onDelete={handleDeleteBlog}
//           onDeleteSelected={handleDeleteSelected}
//           loading={loading}
//         />
//       </div>

//       {/* Blog Form Modal */}
//       {showForm && (
//         <BlogForm
//           blog={editingBlog}
//           onSubmit={handleFormSubmit}
//           onClose={() => {
//             setShowForm(false);
//             setEditingBlog(null);
//           }}
//           loading={formLoading}
//         />
//       )}
//     </div>
//   );
// };














// "use client"
// import React from 'react';
// import Layout from '@/app/admin/Layout/Layout';
// import { Plus, FileText, TrendingUp, Archive } from 'lucide-react';


// export default function Page() {


//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//       {/* Header */}
//       <div className="border-b px-4 sm:px-6 lg:px-8">
//         <div className="max-w-full mx-auto py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                   قسم الدعم
//               </h1>
//               <p className="text-gray-600 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 إدارة وتنظيم محتوى قسم الدعم
//               </p>
//             </div>
//             <button
//               className="inline-flex items-center px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium shadow-sm font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//               type='button'
//             >
//               <Plus className="h-4 w-4 ml-2" />
//               إنشاء طلب دعم
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
//           <div className="bg-white w-full p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                   إجمالي الطلبات
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">0</p>
//               </div>
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <FileText className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white w-full p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                   طلبات مكتملة
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">0</p>
//               </div>
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           {/* <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 طلبات معلقة
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">0</p>
//               </div>
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <FileText className="h-6 w-6 text-yellow-600" />
//               </div>
//             </div>
//           </div> */}

//           <div className="bg-white w-full p-6 rounded-lg shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 طلبات مفتوحة 
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">0</p>
//               </div>
//               <div className="p-2 bg-gray-100 rounded-lg">
//                 <Archive className="h-6 w-6 text-gray-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>









//     </div>
//     </Layout>
//   );
// };















"use client"
import React, { useState } from 'react';
import Layout from '@/app/admin/Layout/Layout';
import { Plus, FileText, TrendingUp, Archive, Search, Filter, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for demonstration
  const supportRequests = [
    {
      id: '001',
      title: 'مشكلة في تسجيل الدخول',
      status: 'open',
      priority: 'high',
      date: '2024-01-15',
      user: 'أحمد محمد'
    },
    {
      id: '002', 
      title: 'طلب تحديث البيانات',
      status: 'completed',
      priority: 'medium',
      date: '2024-01-14',
      user: 'فاطمة علي'
    },
    {
      id: '003',
      title: 'استفسار عن الخدمات',
      status: 'open',
      priority: 'low',
      date: '2024-01-13',
      user: 'محمد سالم'
    }
  ];

  const stats = {
    total: 156,
    completed: 89,
    open: 45
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'open':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'open':
        return 'مفتوح';
      default:
        return 'غير محدد';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

//   const getPriorityText = (priority: string) => {
//     switch (priority) {
//       case 'high':
//         return 'عالية';
//       case 'medium':
//         return 'متوسطة';
//       case 'low':
//         return 'منخفضة';
//       default:
//         return 'عادية';
//     }
//   };

  return (
    <Layout>
    <div className="min-h-[90vh] bg-gray-50" dir="rtl">
      {/* Header */}
      <div className=" border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-4 sm:py-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                  قسم الدعم
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                  إدارة وتنظيم محتوى قسم الدعم
                </p>
              </div>
              {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium shadow-sm font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] text-sm sm:text-base" type='button'>
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء طلب دعم
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Stats Cards */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white w-full p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                  إجمالي الطلبات
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="flex-shrink-0 p-2 sm:p-3 bg-purple-100 rounded-xl">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white w-full p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                  طلبات مكتملة
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                  {stats.completed}
                </p>
              </div>
              <div className="flex-shrink-0 p-2 sm:p-3 bg-green-100 rounded-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                  طلبات معلقة
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="flex-shrink-0 p-2 sm:p-3 bg-yellow-100 rounded-xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
          </div> */}

          <div className="bg-white w-full p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                  طلبات مفتوحة
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
                  {stats.open}
                </p>
              </div>
              <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-100 rounded-xl">
                <Archive className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الطلبات..."
                  className="w-full pr-10 pl-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] text-sm sm:text-base"
                />
              </div>
              <div className="flex space-x-2 space-x-reverse">
                {/* {['all', 'open', 'pending', 'completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] ${
                      activeTab === tab
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                   type='button'>
                    {tab === 'all' ? 'الكل' : 
                     tab === 'open' ? 'مفتوح' : 
                     tab === 'completed' ? 'مكتمل' : ''}
                  </button>
                ))} */}
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table/Cards */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
              طلبات الدعم
            </h3>
          </div>
          
          {/* Mobile Cards View */}
          <div className="block sm:hidden">
            {supportRequests.map((request) => (
              <div key={request.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] truncate">
                      {request.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      #{request.id} • {request.user}
                    </p>
                  </div>
                  <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600" type='button'>
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(request.status)}
                    <span className="text-xs font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      {getStatusText(request.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    
                    <span className="text-xs text-gray-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      {request.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                    رقم الطلب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                    العنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                    التاريخ
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">الإجراءات</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {supportRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      <div className="max-w-xs truncate">
                        {request.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      {request.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="mr-2 text-sm font-medium text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                          {getStatusText(request.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      {request.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors" type='button'>
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {/* <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
            عرض 1 إلى 3 من أصل 156 نتيجة
          </div>
          <div className="flex space-x-1 space-x-reverse">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]" type='button'>
              السابق
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-md hover:bg-purple-700" type='button'>
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]" type='button'>
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]" type='button'>
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]" type='button'>
              التالي
            </button>
          </div>
        </div> */}
      </div>
    </div>
    </Layout>
  );
}