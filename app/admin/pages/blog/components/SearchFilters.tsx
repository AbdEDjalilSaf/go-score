// import React from 'react';
// import { Search } from 'lucide-react';
// import { BlogFilters } from '../types/blog';

// interface SearchFiltersProps {
//   filters: BlogFilters;
//   setFilters: React.Dispatch<React.SetStateAction<BlogFilters>>;
//   categories: string[];
//   authors: string[];
//   onSearch: () => void;
// }

// export const SearchFilters: React.FC<SearchFiltersProps> = ({
//   filters,
//   setFilters,
//   categories,
//   authors,
//   onSearch
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Search Input */}
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={filters.search}
//             onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//             onKeyPress={(e) => e.key === 'Enter' && onSearch()}
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row gap-4 lg:gap-3">
//           <select
//             value={filters.status}
//             onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white min-w-[140px]"
//           >
//             <option value="">All Status</option>
//             <option value="published">Published</option>
//             <option value="draft">Draft</option>
//             <option value="archived">Archived</option>
//           </select>

//           <select
//             value={filters.category}
//             onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white min-w-[140px]"
//           >
//             <option value="">All Categories</option>
//             {categories.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>

//           <select
//             value={filters.author}
//             onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white min-w-[140px]"
//           >
//             <option value="">All Authors</option>
//             {authors.map(author => (
//               <option key={author} value={author}>{author}</option>
//             ))}
//           </select>

//           <button
//             onClick={onSearch}
//             className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium whitespace-nowrap"
//           type='button'>
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };













import React from 'react';
import { Search, Filter } from 'lucide-react';
import { BlogFilters } from "../types/blog";

interface SearchFiltersProps {
  filters: BlogFilters;
  setFilters: React.Dispatch<React.SetStateAction<BlogFilters>>;
  categories: string[];
  authors: string[];
  onSearch: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  setFilters,
  categories,
  authors,
  onSearch
}) => {
  const handleFilterChange = (key: keyof BlogFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      author: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6" dir="rtl">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
          البحث
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="البحث في المقالات..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
          />
        </div>

        {/* Category Filter */}
        {/* <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
        >
          <option value="">جميع التصنيفات</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select> */}

        {/* Author Filter */}
        {/* <select
          value={filters.author}
          onChange={(e) => handleFilterChange('author', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
        >
          <option value="">جميع الكُتاب</option>
          {authors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select> */}

        {/* Status Filter */}
        {/* <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
        >
          <option value="">جميع الحالات</option>
          <option value="published">منشور</option>
          <option value="draft">مسودة</option>
          <option value="archived">مؤرشف</option>
        </select> */}
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-wrap gap-2">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
          type="button"
        >
          مسح الفلاتر
        </button>
      </div> */}
    </div>
  );
};