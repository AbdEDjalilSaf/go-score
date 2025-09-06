// export interface Blog {
//     id: string;
//     title: string;
//     slug: string;
//     excerpt: string;
//     content: string;
//     author: string;
//     category: string;
//     status: 'draft' | 'published';
//     featured: boolean;
//     publishedAt: string | null;
//     createdAt: string;
//     updatedAt: string;
//     tags: string[];
//     imageUrl: string;
//   }
  
//   export type CreateBlogRequest = Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>;
//   export type UpdateBlogRequest = Partial<CreateBlogRequest>;















export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    status: 'draft' | 'published' | 'archived';
    category: string;
    tags: string[];
    featured_image: string;
    created_at: string;
    updated_at: string;
    views: number;
  }
  
  export interface BlogFilters {
    search: string;
    status: string;
    category: string;
    author: string;
  }