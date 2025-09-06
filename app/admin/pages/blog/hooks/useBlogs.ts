// "use client"
// import { useState, useEffect } from 'react';
// import { Blog, CreateBlogRequest, UpdateBlogRequest } from '../types/blog';
// import blogsData from '../data/blogs.json';

// export function useBlogs() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);

//   useEffect(() => {
//     // Simulate API loading
//     setTimeout(() => {
//       setBlogs(blogsData as Blog[]);
//       setLoading(false);
//     }, 800);
//   }, []);

//   const createBlog = (blogData: CreateBlogRequest): Blog => {
//     const newBlog: Blog = {
//       ...blogData,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
    
//     setBlogs(prev => [newBlog, ...prev]);
//     return newBlog;
//   };

//   const updateBlog = (id: string, updateData: UpdateBlogRequest): Blog | null => {
//     let updatedBlog: Blog | null = null;
    
//     setBlogs(prev => prev.map(blog => {
//       if (blog.id === id) {
//         updatedBlog = {
//           ...blog,
//           ...updateData,
//           updatedAt: new Date().toISOString(),
//         };
//         return updatedBlog;
//       }
//       return blog;
//     }));
    
//     return updatedBlog;
//   };

//   const deleteBlog = (id: string): boolean => {
//     setBlogs(prev => prev.filter(blog => blog.id !== id));
//     setSelectedBlogs(prev => prev.filter(blogId => blogId !== id));
//     return true;
//   };

//   const deleteSelectedBlogs = (): number => {
//     const deletedCount = selectedBlogs.length;
//     setBlogs(prev => prev.filter(blog => !selectedBlogs.includes(blog.id)));
//     setSelectedBlogs([]);
//     return deletedCount;
//   };

//   const toggleBlogSelection = (id: string) => {
//     setSelectedBlogs(prev => 
//       prev.includes(id) 
//         ? prev.filter(blogId => blogId !== id)
//         : [...prev, id]
//     );
//   };

//   const selectAllBlogs = (blogIds: string[]) => {
//     setSelectedBlogs(blogIds);
//   };

//   const clearSelection = () => {
//     setSelectedBlogs([]);
//   };

//   return {
//     blogs,
//     loading,
//     selectedBlogs,
//     createBlog,
//     updateBlog,
//     deleteBlog,
//     deleteSelectedBlogs,
//     toggleBlogSelection,
//     selectAllBlogs,
//     clearSelection,
//   };
// }













"use client"
import { useState, useEffect } from 'react';
import { Blog, BlogFilters } from '../types/blog';

// Mock data for demonstration
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-react-typescript',
    excerpt: 'Learn how to set up a modern React project with TypeScript and best practices.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'John Doe',
    status: 'published',
    category: 'Development',
    tags: ['React', 'TypeScript', 'Tutorial'],
    featured_image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    views: 1245
  },
  {
    id: '2',
    title: 'Advanced CSS Grid Techniques',
    slug: 'advanced-css-grid-techniques',
    excerpt: 'Explore advanced CSS Grid layouts and responsive design patterns.',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    author: 'Jane Smith',
    status: 'published',
    category: 'Design',
    tags: ['CSS', 'Grid', 'Responsive'],
    featured_image: 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2024-01-14T14:20:00Z',
    updated_at: '2024-01-14T14:20:00Z',
    views: 892
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    excerpt: 'Best practices for creating inclusive and accessible web experiences.',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation...',
    author: 'Mike Johnson',
    status: 'draft',
    category: 'Accessibility',
    tags: ['A11y', 'ARIA', 'Web Standards'],
    featured_image: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-13T16:45:00Z',
    views: 234
  },
  {
    id: '4',
    title: 'Modern JavaScript Frameworks Comparison',
    slug: 'modern-javascript-frameworks-comparison',
    excerpt: 'A comprehensive comparison of React, Vue, and Angular in 2024.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate...',
    author: 'Sarah Wilson',
    status: 'published',
    category: 'Development',
    tags: ['JavaScript', 'React', 'Vue', 'Angular'],
    featured_image: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2024-01-12T11:00:00Z',
    updated_at: '2024-01-12T11:00:00Z',
    views: 1876
  },
  {
    id: '5',
    title: 'The Future of Web Development',
    slug: 'future-of-web-development',
    excerpt: 'Exploring emerging trends and technologies shaping the future of web development.',
    content: 'Excepteur sint occaecat cupidatat non proident...',
    author: 'Alex Chen',
    status: 'archived',
    category: 'Trends',
    tags: ['Future', 'Trends', 'Technology'],
    featured_image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    created_at: '2024-01-10T16:30:00Z',
    updated_at: '2024-01-11T10:15:00Z',
    views: 567
  }
];

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    status: '',
    category: '',
    author: ''
  });

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !filters.search || 
      blog.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
      blog.author.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || blog.status === filters.status;
    const matchesCategory = !filters.category || blog.category === filters.category;
    const matchesAuthor = !filters.author || blog.author === filters.author;

    return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
  });

  const createBlog = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const newBlog: Blog = {
        ...blogData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setBlogs(prev => [newBlog, ...prev]);
      return newBlog;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    setLoading(true);
    try {
      setBlogs(prev => prev.map(blog => 
        blog.id === id 
          ? { ...blog, ...blogData, updated_at: new Date().toISOString() }
          : blog
      ));
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    setLoading(true);
    try {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogs = async (ids: string[]) => {
    setLoading(true);
    try {
      setBlogs(prev => prev.filter(blog => !ids.includes(blog.id)));
    } finally {
      setLoading(false);
    }
  };

  return {
    blogs: filteredBlogs,
    loading,
    filters,
    setFilters,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteBlogs,
    categories: [...new Set(mockBlogs.map(blog => blog.category))],
    authors: [...new Set(mockBlogs.map(blog => blog.author))]
  };
};