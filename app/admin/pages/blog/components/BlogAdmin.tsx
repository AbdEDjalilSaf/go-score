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














"use client"
import React, { useState } from 'react';
import { Plus, FileText, TrendingUp, Archive } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import { SearchFilters } from './SearchFilters';
import { BlogList } from './BlogList';
import { BlogForm } from './BlogForm';
import { Blog } from '../types/blog';

export const BlogAdmin: React.FC = () => {
  const {
    blogs,
    loading,
    filters,
    setFilters,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteBlogs,
    categories,
    authors
  } = useBlogs();

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleFormSubmit = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
    setFormLoading(true);
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, blogData);
      } else {
        await createBlog(blogData);
      }
      setShowForm(false);
      setEditingBlog(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المقالة؟')) {
      await deleteBlog(id);
    }
  };

  const handleDeleteSelected = async (ids: string[]) => {
    if (window.confirm(`هل أنت متأكد من حذف ${ids.length} مقالة؟`)) {
      await deleteBlogs(ids);
    }
  };

  const handleSearch = () => {
    // Search is handled automatically by the useBlogs hook
    // This is just for explicit search button clicks
  };

  // Calculate stats
  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    drafts: blogs.filter(b => b.status === 'draft').length,
    archived: blogs.filter(b => b.status === 'archived').length
  };

  return (
    <div className="min-h-[90vh] bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="border-b px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                إدارة المدونة
              </h1>
              <p className="text-gray-600 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                إدارة وتنظيم محتوى مدونتك
              </p>
            </div>
            <button
              onClick={handleCreateBlog}
              className="inline-flex items-center px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium shadow-sm font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
              type='button'
            >
              <Plus className="h-4 w-4 ml-2" />
              إنشاء مقالة
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                  إجمالي المقالات
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                  منشور
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                  مسودات
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                  مؤرشف
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Archive className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          authors={authors}
          onSearch={handleSearch}
        />

        {/* Blog List */}
        <BlogList
          blogs={blogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          onDeleteSelected={handleDeleteSelected}
          loading={loading}
        />
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingBlog(null);
          }}
          loading={formLoading}
        />
      )}
    </div>
  );
};