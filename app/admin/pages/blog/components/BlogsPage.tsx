"use client"
import React, { useState } from 'react';
import BlogTable from './BlogTable';
import BlogModal from './BlogModal';
import ConfirmDialog from './ConfirmDialog';
import { useBlogs } from '../hooks/useBlogs';
import { Blog, CreateBlogRequest, UpdateBlogRequest } from '../types/blog';

const BlogsPage: React.FC = () => {
  const {
    blogs,
    loading,
    selectedBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteSelectedBlogs,
    toggleBlogSelection,
    selectAllBlogs,
    clearSelection,
  } = useBlogs();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);

  const handleCreateClick = () => {
    setModalMode('create');
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (blog: Blog) => {
    setModalMode('edit');
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleModalSubmit = (data: CreateBlogRequest | UpdateBlogRequest) => {
    if (modalMode === 'create') {
      createBlog(data as CreateBlogRequest);
    } else if (editingBlog) {
      updateBlog(editingBlog.id, data);
    }
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteBlog(blogToDelete.id);
      setBlogToDelete(null);
    }
  };

  const handleConfirmBulkDelete = () => {
    deleteSelectedBlogs();
  };

  return (
    <div className="space-y-6">
      <BlogTable
        blogs={blogs}
        loading={loading}
        selectedBlogs={selectedBlogs}
        onCreateClick={handleCreateClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onBulkDelete={() => setIsBulkDeleteDialogOpen(true)}
        onToggleSelection={toggleBlogSelection}
        onSelectAll={selectAllBlogs}
        onClearSelection={clearSelection}
      />

      {/* Create/Edit Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        blog={editingBlog}
        mode={modalMode}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        isOpen={isBulkDeleteDialogOpen}
        onClose={() => setIsBulkDeleteDialogOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Selected Blogs"
        message={`Are you sure you want to delete ${selectedBlogs.length} blog${selectedBlogs.length === 1 ? '' : 's'}? This action cannot be undone.`}
        confirmText={`Delete ${selectedBlogs.length} Blog${selectedBlogs.length === 1 ? '' : 's'}`}
        variant="danger"
      />
    </div>
  );
};

export default BlogsPage;