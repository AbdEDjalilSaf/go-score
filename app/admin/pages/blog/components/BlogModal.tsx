"use client"
import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';
import { Blog, CreateBlogRequest, UpdateBlogRequest } from '../types/blog';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBlogRequest | UpdateBlogRequest) => void;
  blog?: Blog | null;
  mode: 'create' | 'edit';
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, onSubmit, blog, mode }) => {
  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    status: 'draft',
    featured: false,
    publishedAt: null,
    tags: [],
    imageUrl: '',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (blog && mode === 'edit') {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        status: blog.status,
        featured: blog.featured,
        publishedAt: blog.publishedAt,
        tags: blog.tags,
        imageUrl: blog.imageUrl,
      });
      setTagInput(blog.tags.join(', '));
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        status: 'draft',
        featured: false,
        publishedAt: null,
        tags: [],
        imageUrl: '',
      });
      setTagInput('');
    }
  }, [blog, mode, isOpen]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleTagsChange = (value: string) => {
    setTagInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      publishedAt: formData.status === 'published' && !formData.publishedAt
        ? new Date().toISOString()
        : formData.publishedAt,
    };
    
    onSubmit(submitData);
    onClose();
  };

  const categories = ['Development', 'Design', 'Backend', 'Technology', 'Tutorial'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <button className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} type="button" />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Create New Blog' : 'Edit Blog'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              type="button">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </h3>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </h3>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </h3>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </h3>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </h3>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="lg:col-span-2">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                </div>
                {formData.imageUrl && (
                  <Image 
                    src={formData.imageUrl} 
                    width={24}
                    height={16}
                    alt="Preview" 
                    className="mt-3 w-24 h-16 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Excerpt */}
              <div className="lg:col-span-2">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </h3>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-2">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </h3>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Tags */}
              <div className="lg:col-span-2">
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </h3>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="React, JavaScript, Tutorial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Toggle */}
              <div className="lg:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Blog</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {mode === 'create' ? 'Create Blog' : 'Update Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;