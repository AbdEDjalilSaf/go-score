"use client"
import React, { useState, useEffect } from 'react';
import { X, Upload, ImageIcon } from 'lucide-react';
import { Blog } from '../types/blog';

interface BlogFormProps {
  blog?: Blog;
  onSubmit: (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
  loading: boolean;
}

export const BlogForm: React.FC<BlogFormProps> = ({ blog, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    status: 'draft' as const,
    category: '',
    tags: [] as string[],
    featured_image: '',
    views: 0
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        status: blog.status,
        category: blog.category,
        tags: blog.tags,
        featured_image: blog.featured_image,
        views: blog.views
      });
    }
  }, [blog]);

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !blog ? generateSlug(title) : prev.slug
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </h3>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter blog title..."
                />
              </div>

              {/* Slug */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </h3>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="blog-url-slug"
                />
              </div>

              {/* Author */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </h3>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Author name..."
                />
              </div>

              {/* Category */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </h3>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Blog category..."
                />
              </div>

              {/* Status */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </h3>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Featured Image */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </h3>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </h3>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                placeholder="Brief description of the blog post..."
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-purple-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </h3>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={8}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : (blog ? 'Update Blog' : 'Create Blog')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};













// "use client"
// import React, { useState, useEffect } from 'react';
// import { X, Save } from 'lucide-react';
// import { Blog } from '../types/blog';

// interface BlogFormProps {
//   blog: Blog | null;
//   onSubmit: (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => void;
//   onClose: () => void;
//   loading: boolean;
// }

// export const BlogForm: React.FC<BlogFormProps> = ({
//   blog,
//   onSubmit,
//   onClose,
//   loading
// }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     excerpt: '',
//     author: '',
//     category: '',
//     status: 'draft' as const,
//     featured_image: '',
//     tags: [] as string[],
//     published_at: ''
//   });
//   const [tagInput, setTagInput] = useState('');

//   useEffect(() => {
//     if (blog) {
//       setFormData({
//         title: blog.title,
//         content: blog.content,
//         excerpt: blog.excerpt,
//         author: blog.author,
//         category: blog.category,
//         status: blog.status,
//         featured_image: blog.featured_image || '',
//         tags: blog.tags,
//         published_at: blog.published_at || ''
//       });
//     }
//   }, [blog]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }));
//       setTagInput('');
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" dir="rtl">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//             {blog ? 'تعديل المقالة' : 'إنشاء مقالة جديدة'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
//             type="button"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Title */}
//             <div className="md:col-span-2">
//               <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 عنوان المقالة *
//               </h3>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                 required
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 placeholder="أدخل عنوان المقالة"
//               />
//             </div>

//             {/* Author */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 الكاتب *
//               </h3>
//               <input
//                 type="text"
//                 value={formData.author}
//                 onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
//                 required
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 placeholder="اسم الكاتب"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 التصنيف *
//               </h3>
//               <input
//                 type="text"
//                 value={formData.category}
//                 onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                 required
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 placeholder="تصنيف المقالة"
//               />
//             </div>

//             {/* Status */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 الحالة
//               </h3>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//               >
//                 <option value="draft">مسودة</option>
//                 <option value="published">منشور</option>
//                 <option value="archived">مؤرشف</option>
//               </select>
//             </div>

//             {/* Featured Image */}
//             <div>
//               <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                 الصورة المميزة
//               </h3>
//               <input
//                 type="url"
//                 value={formData.featured_image}
//                 onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 placeholder="رابط الصورة"
//               />
//             </div>
//           </div>

//           {/* Excerpt */}
//           <div>
//             <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//               المقتطف
//             </h3>
//             <textarea
//               value={formData.excerpt}
//               onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
//               rows={3}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] leading-relaxed"
//               placeholder="وصف مختصر للمقالة"
//             />
//           </div>

//           {/* Content */}
//           <div>
//             <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//               المحتوى *
//             </h3>
//             <textarea
//               value={formData.content}
//               onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
//               required
//               rows={8}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif] leading-relaxed"
//               placeholder="اكتب محتوى المقالة هنا..."
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <h3 className="block text-sm font-medium text-gray-700 mb-2 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//               الوسوم
//             </h3>
//             <div className="flex gap-2 mb-3">
//               <input
//                 type="text"
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 placeholder="أضف وسم"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//               >
//                 إضافة
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {formData.tags.map(tag => (
//                 <span
//                   key={tag}
//                   className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveTag(tag)}
//                     className="mr-1 text-purple-500 hover:text-purple-700"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//             >
//               إلغاء
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
//               ) : (
//                 <Save className="h-4 w-4 ml-2" />
//               )}
//               {blog ? 'تحديث' : 'إنشاء'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };