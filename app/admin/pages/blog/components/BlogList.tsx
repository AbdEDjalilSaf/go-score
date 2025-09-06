"use client"
import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Tag,
} from 'lucide-react';
import { Blog } from '../types/blog';

interface BlogListProps {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onDeleteSelected: (ids: string[]) => void;
  loading: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  blogs,
  onEdit,
  onDelete,
  onDeleteSelected,
  loading
}) => {
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(blogs.map(blog => blog.id));
    }
  };

  const toggleSelectBlog = (blogId: string) => {
    setSelectedBlogs(prev => 
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              All Blogs ({blogs.length})
            </h3>
            {selectedBlogs.length > 0 && (
              <button
                onClick={() => onDeleteSelected(selectedBlogs)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              type='button'>
                Delete Selected ({selectedBlogs.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
          <p className="text-gray-500">Get started by creating your first blog post.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBlogs.length === blogs.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog.id)}
                        onChange={() => toggleSelectBlog(blog.id)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.featured_image && (
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="h-12 w-12 rounded-lg object-cover bg-gray-100"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {blog.excerpt}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {blog.category}
                            </span>
                            {blog.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {blog.author}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {blog.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(blog.updated_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(blog)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                        type='button'>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(blog.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        type='button'>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog.id)}
                    onChange={() => toggleSelectBlog(blog.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => onEdit(blog)}
                          className="p-2 text-gray-400 hover:text-purple-600 rounded-lg"
                        type='button'>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(blog.id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                        type='button'>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {blog.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.updated_at)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                          {blog.status}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};












// "use client"
// import React, { useState } from 'react';
// import { Edit, Trash2, Calendar, User, Tag, MoreHorizontal } from 'lucide-react';
// import { Blog } from '../types/blog';

// interface BlogListProps {
//   blogs: Blog[];
//   onEdit: (blog: Blog) => void;
//   onDelete: (id: string) => void;
//   onDeleteSelected: (ids: string[]) => void;
//   loading: boolean;
// }

// export const BlogList: React.FC<BlogListProps> = ({
//   blogs,
//   onEdit,
//   onDelete,
//   onDeleteSelected,
//   loading
// }) => {
//   const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
//   const [showActions, setShowActions] = useState<string | null>(null);

//   const handleSelectBlog = (id: string) => {
//     setSelectedBlogs(prev => 
//       prev.includes(id) 
//         ? prev.filter(blogId => blogId !== id)
//         : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedBlogs.length === blogs.length) {
//       setSelectedBlogs([]);
//     } else {
//       setSelectedBlogs(blogs.map(blog => blog.id));
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'published':
//         return 'bg-green-100 text-green-800';
//       case 'draft':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'archived':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'published':
//         return 'منشور';
//       case 'draft':
//         return 'مسودة';
//       case 'archived':
//         return 'مؤرشف';
//       default:
//         return status;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-2 text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//             جاري التحميل...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (blogs.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//         <div className="text-center">
//           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//             لا توجد مقالات
//           </h3>
//           <p className="text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//             ابدأ بإنشاء أول مقالة لك
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <div className="px-6 py-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <input
//               type="checkbox"
//               checked={selectedBlogs.length === blogs.length && blogs.length > 0}
//               onChange={handleSelectAll}
//               className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//             />
//             <h3 className="text-lg font-semibold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//               المقالات ({blogs.length})
//             </h3>
//           </div>
//           {selectedBlogs.length > 0 && (
//             <button
//               onClick={() => onDeleteSelected(selectedBlogs)}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//             type='button'>
//               حذف المحدد ({selectedBlogs.length})
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Blog Items */}
//       <div className="divide-y divide-gray-200">
//         {blogs.map((blog) => (
//           <div key={blog.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//             <div className="flex items-start gap-4">
//               <input
//                 type="checkbox"
//                 checked={selectedBlogs.includes(blog.id)}
//                 onChange={() => handleSelectBlog(blog.id)}
//                 className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//               />
              
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex-1">
//                     <h4 className="text-lg font-semibold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] leading-relaxed">
//                       {blog.title}
//                     </h4>
//                     <p className="text-gray-600 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] leading-relaxed">
//                       {blog.excerpt}
//                     </p>
//                   </div>
                  
//                   <div className="relative mr-4">
//                     <button
//                       onClick={() => setShowActions(showActions === blog.id ? null : blog.id)}
//                       className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
//                       type='button'>
//                       <MoreHorizontal className="h-4 w-4" />
//                     </button>
                    
//                     {showActions === blog.id && (
//                       <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
//                         <div className="py-1">
//                           <button
//                             onClick={() => {
//                               onEdit(blog);
//                               setShowActions(null);
//                             }}
//                             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                           type='button'>
//                             <Edit className="h-4 w-4 ml-3" />
//                             تعديل
//                           </button>
//                           <button
//                             onClick={() => {
//                               onDelete(blog.id);
//                               setShowActions(null);
//                             }}
//                             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                           type='button'>
//                             <Trash2 className="h-4 w-4 ml-3" />
//                             حذف
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Meta Information */}
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
//                   <div className="flex items-center gap-1">
//                     <User className="h-4 w-4" />
//                     <span className="font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                       {blog.author}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Tag className="h-4 w-4" />
//                     <span className="font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                       {blog.category}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-4 w-4" />
//                     <span className="font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                       {new Date(blog.created_at).toLocaleDateString('ar-EG')}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Tags and Status */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-wrap gap-2">
//                     {blog.tags.slice(0, 3).map(tag => (
//                       <span
//                         key={tag}
//                         className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                     {blog.tags.length > 3 && (
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                         +{blog.tags.length - 3}
//                       </span>
//                     )}
//                   </div>
                  
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)} font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]`}>
//                     {getStatusText(blog.status)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };