// "use client"
// import React, { useState } from 'react';
// import Layout from '../../Layout/Layout';
// // import Image from 'next/image';
// import { useBlogs } from './hooks/useBlogs';
// import { Search, Filter, ChevronDown,Archive,TrendingUp,FileText,Info, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// interface PaymentRecord {
//   id: string;
//   tableNumber: string;
//   dateTime: string;
//   visitorName: string;
// //   visitorAvatar: string;
//   total: number;
//   leftToPay: number;
//   tips: number;
//   status: 'unpaid' | 'partially' | 'paid';
// }

//  const {
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

// const mockData: PaymentRecord[] = [
//   {
//     id: '#8',
//     tableNumber: '8',
//     dateTime: '2:05 PM, Jan 26',
//     visitorName: 'Emma Johnson',
//     // visitorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 70.00,
//     leftToPay: 70.00,
//     tips: 0.00,
//     status: 'unpaid'
//   },
//   {
//     id: '#5',
//     tableNumber: '5',
//     dateTime: '1:50 PM, Jan 26',
//     visitorName: 'Olivia Smith',
//     // visitorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 100.00,
//     leftToPay: 100.00,
//     tips: 0.00,
//     status: 'unpaid'
//   },
//   {
//     id: '#4',
//     tableNumber: '4',
//     dateTime: '1:20 PM, Jan 26',
//     visitorName: 'Liam Johnson',
//     // visitorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 50.00,
//     leftToPay: 25.00,
//     tips: 10.00,
//     status: 'partially'
//   },
//   {
//     id: '#2',
//     tableNumber: '2',
//     dateTime: '12:50 PM, Jan 26',
//     visitorName: 'Noah Smith',
//     // visitorAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 10.00,
//     leftToPay: 0.00,
//     tips: 2.00,
//     status: 'paid'
//   },
//   {
//     id: '#1',
//     tableNumber: '1',
//     dateTime: '12:20 PM, Jan 26',
//     visitorName: 'Lily Clark',
//     // visitorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 65.00,
//     leftToPay: 0.00,
//     tips: 15.00,
//     status: 'paid'
//   },
//   {
//     id: '#3',
//     tableNumber: '3',
//     dateTime: '11:20 AM, Jan 26',
//     visitorName: 'Oliver Brown',
//     // visitorAvatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 120.00,
//     leftToPay: 0.00,
//     tips: 5.00,
//     status: 'paid'
//   },
//   {
//     id: '#6',
//     tableNumber: '6',
//     dateTime: '11:00 AM, Jan 26',
//     visitorName: 'William Harris',
//     // visitorAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64',
//     total: 43.00,
//     leftToPay: 0.00,
//     tips: 10.00,
//     status: 'paid'
//   }
// ];

// function App() {
//   const [activeTab, setActiveTab] = useState<'open' | 'close'>('open');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'unpaid':
//         return 'bg-red-100 text-red-700 border-red-200';
//       case 'partially':
//         return 'bg-orange-100 text-orange-700 border-orange-200';
//       case 'paid':
//         return 'bg-green-100 text-green-700 border-green-200';
//       default:
//         return 'bg-gray-100 text-gray-700 border-gray-200';
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case 'unpaid':
//         return 'غير مدفوع';
//       case 'partially':
//         return 'مدفوع جزئياً';
//       case 'paid':
//         return 'مدفوع';
//       default:
//         return status;
//     }
//   };

//   const getStatusDot = (status: string) => {
//     switch (status) {
//       case 'unpaid':
//         return 'bg-red-500';
//       case 'partially':
//         return 'bg-orange-500';
//       case 'paid':
//         return 'bg-green-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const filteredData = mockData.filter(record =>
//     record.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     record.tableNumber.includes(searchQuery) ||
//     record.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate stats
//   const stats = {
//     total: blogs.length,
//     published: blogs.filter(b => b.status === 'published').length,
//     drafts: blogs.filter(b => b.status === 'draft').length,
//     archived: blogs.filter(b => b.status === 'archived').length
//   };

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = filteredData.slice(startIndex, endIndex);

//   return (
//     <Layout>
//     <div className="min-h-[90vh] bg-gray-50" dir="rtl">
//       {/* Header */}
//       {/* <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-purple-600">تشاو!</h1>
//             </div>

//             <div className="flex items-center space-x-4 space-x-reverse">
//               <div className="relative">
//                 <button className="flex items-center space-x-2 space-x-reverse text-sm text-gray-700 hover:text-gray-900 transition-colors" type='button'>
//                   <span>العربية</span>
//                   <ChevronDown size={16} />
//                 </button>
//               </div>
              
//               <div className="h-6 w-px bg-gray-300"></div>
              
//               <div className="flex items-center space-x-3 space-x-reverse">
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">طوني</p>
//                   <p className="text-xs text-gray-500">نيو يورك, الولايات المتحدة</p>
//                 </div>
//                 <Image
//                   className="h-8 w-8 rounded-full"
//                   src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64"
//                   alt="User profile"
//                   width={32}
//                   height={32}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header> */}

//       {/* Main Content */}
//       <div className="border-b px-4 sm:px-6 lg:px-8">
//                     <div className="max-w-full mx-auto py-6">
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                         <div>
//                           <h1 className="text-2xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                             طلبات الدفع 
//                           </h1>
//                           <p className="text-gray-600 mt-1 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                             إدارة وتنظيم طلبات الدفع
//                           </p>
//                         </div>
//                         {/* <button
//                           className="inline-flex items-center px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all font-medium shadow-sm font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]"
//                           type='button'
//                         >
//                           <Plus className="h-4 w-4 ml-2" />
//                           إنشاء مقالة
//                         </button> */}
//                       </div>
//                     </div>
//                   </div>
//       <main className="max-w-full mx-auto px-2 sm:px-3 lg:px-4 py-4">
//         <div className="bg-white rounded-xl shadow-sm">
             
//           {/* Restaurant Selector */}
//           {/* <div className="p-6 border-b">
//             <div className="relative inline-block">
//               <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors" type='button'>
//                 <span className="text-sm font-medium">عرض جميع المطاعم</span>
//                 <ChevronDown size={16} />
//               </button>
//             </div>
//           </div> */}

//           {/* Tickets Header */}
//           <div className="p-6 ">
//             <div className=" mb-6">
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                                   إجمالي المقالات
//                                 </p>
//                                 <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
//                               </div>
//                               <div className="p-2 bg-purple-100 rounded-lg">
//                                 <FileText className="h-6 w-6 text-purple-600" />
//                               </div>
//                             </div>
//                           </div>
                
//                           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                                   منشور
//                                 </p>
//                                 <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
//                               </div>
//                               <div className="p-2 bg-green-100 rounded-lg">
//                                 <TrendingUp className="h-6 w-6 text-green-600" />
//                               </div>
//                             </div>
//                           </div>
                
//                           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                                   مسودات
//                                 </p>
//                                 <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
//                               </div>
//                               <div className="p-2 bg-yellow-100 rounded-lg">
//                                 <FileText className="h-6 w-6 text-yellow-600" />
//                               </div>
//                             </div>
//                           </div>
                
//                           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//                             <div className="flex items-center justify-between">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
//                                   مؤرشف
//                                 </p>
//                                 <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
//                               </div>
//                               <div className="p-2 bg-gray-100 rounded-lg">
//                                 <Archive className="h-6 w-6 text-gray-600" />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//               {/* <div className="flex items-center space-x-6 space-x-reverse"> */}
//                 {/* <h2 className="text-2xl font-bold text-gray-900">التذاكر</h2> */}
                
//                 {/* Tabs */}
//                 {/* <div className="flex bg-gray-100 p-1 rounded-lg">
//                   <button
//                     onClick={() => setActiveTab('open')}
//                     className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
//                       activeTab === 'open'
//                         ? 'bg-purple-600 text-white shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   type="button">
//                     مفتوح
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('close')}
//                     className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
//                       activeTab === 'close'
//                         ? 'bg-purple-600 text-white shadow-sm'
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   type="button">
//                     مغلق
//                   </button>
//                 </div> */}
//               {/* </div> */}

//               {/* Search and Filter */}
//               <div className="flex items-center space-x-4 space-x-reverse">
//                 <div className="relative">
//                   <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="text"
//                     placeholder="بحث..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
//                   />
//                 </div>
//                 {/* <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" type="button">
//                   <Filter size={16} />
//                   <span className="text-sm">فلتر</span>
//                 </button> */}
//               </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-hidden">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطاولة</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ والوقت</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الزائر</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">المجموع $</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">المتبقي للدفع $</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">البقشيش USD $</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
//                     <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {currentData.map((record) => (
//                     <tr key={record.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="py-4 px-4 text-sm font-medium text-gray-900">{record.id}</td>
//                       <td className="py-4 px-4 text-sm text-gray-600">{record.dateTime}</td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center space-x-3 space-x-reverse">
//                           {/* <Image
//                             className="h-8 w-8 rounded-full"
//                             src={record.visitorAvatar}
//                             width={32}
//                             height={32}
//                             alt={record.visitorName}
//                           /> */}
//                           <span className="text-sm font-medium text-gray-900">{record.visitorName}</span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4 text-sm font-medium text-gray-900">{record.total.toFixed(2)}</td>
//                       <td className="py-4 px-4 text-sm text-gray-600">{record.leftToPay.toFixed(2)}</td>
//                       <td className="py-4 px-4 text-sm text-gray-600">{record.tips.toFixed(2)}</td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center space-x-2 space-x-reverse">
//                           <div className={`w-2 h-2 rounded-full ${getStatusDot(record.status)}`}></div>
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
//                             {getStatusText(record.status)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <button className="text-gray-400 hover:text-gray-600 transition-colors" type='button'>
//                           <Info size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-between mt-6 pt-6 border-t">
//               <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
//                 <span>عرض</span>
//                 <select className="border border-gray-300 rounded px-2 py-1 text-sm">
//                   <option>6</option>
//                   <option>12</option>
//                   <option>24</option>
//                 </select>
//                 <span>من أصل {filteredData.length}</span>
//               </div>

//               <div className="flex items-center space-x-2 space-x-reverse">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   type="button">
//                   <ChevronRight size={16} />
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       currentPage === page
//                         ? 'bg-purple-600 text-white'
//                         : 'text-gray-600 hover:bg-gray-50'
//                     }`}
//                   type="button">
//                     {page}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   type="button">
//                   <ChevronLeft size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </main>
//     </div>
//     </Layout>
//   );
// }

// export default App;













"use client"
import React, { useState } from 'react';
import Layout from "../../Layout/Layout"
import { Search, Filter, ChevronDown, Archive, TrendingUp, FileText, Info, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface PaymentRecord {
  id: string;
  tableNumber: string;
  dateTime: string;
  visitorName: string;
  total: number;
  leftToPay: number;
  tips: number;
  status: 'unpaid' | 'partially' | 'paid';
}

const mockData: PaymentRecord[] = [
  {
    id: '#8',
    tableNumber: '8',
    dateTime: '2:05 PM, Jan 26',
    visitorName: 'Emma Johnson',
    total: 70.00,
    leftToPay: 70.00,
    tips: 0.00,
    status: 'unpaid'
  },
  {
    id: '#5',
    tableNumber: '5',
    dateTime: '1:50 PM, Jan 26',
    visitorName: 'Olivia Smith',
    total: 100.00,
    leftToPay: 100.00,
    tips: 0.00,
    status: 'unpaid'
  },
  {
    id: '#4',
    tableNumber: '4',
    dateTime: '1:20 PM, Jan 26',
    visitorName: 'Liam Johnson',
    total: 50.00,
    leftToPay: 25.00,
    tips: 10.00,
    status: 'partially'
  },
  {
    id: '#2',
    tableNumber: '2',
    dateTime: '12:50 PM, Jan 26',
    visitorName: 'Noah Smith',
    total: 10.00,
    leftToPay: 0.00,
    tips: 2.00,
    status: 'paid'
  },
  {
    id: '#1',
    tableNumber: '1',
    dateTime: '12:20 PM, Jan 26',
    visitorName: 'Lily Clark',
    total: 65.00,
    leftToPay: 0.00,
    tips: 15.00,
    status: 'paid'
  },
  {
    id: '#3',
    tableNumber: '3',
    dateTime: '11:20 AM, Jan 26',
    visitorName: 'Oliver Brown',
    total: 120.00,
    leftToPay: 0.00,
    tips: 5.00,
    status: 'paid'
  },
  {
    id: '#6',
    tableNumber: '6',
    dateTime: '11:00 AM, Jan 26',
    visitorName: 'William Harris',
    total: 43.00,
    leftToPay: 0.00,
    tips: 10.00,
    status: 'paid'
  }
];

function App() {
//   const [activeTab, setActiveTab] = useState<'open' | 'close'>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'partially':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'غير مدفوع';
      case 'partially':
        return 'مدفوع جزئياً';
      case 'paid':
        return 'مدفوع';
      default:
        return status;
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'unpaid':
        return 'bg-red-500';
      case 'partially':
        return 'bg-orange-500';
      case 'paid':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredData = mockData.filter(record =>
    record.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.tableNumber.includes(searchQuery) ||
    record.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats from payment data
  const stats = {
    total: mockData.length,
    unpaid: mockData.filter(r => r.status === 'unpaid').length,
    partially: mockData.filter(r => r.status === 'partially').length,
    paid: mockData.filter(r => r.status === 'paid').length
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">تشاو!</h1>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <button className="flex items-center space-x-2 space-x-reverse text-sm text-gray-700 hover:text-gray-900 transition-colors" type='button'>
                  <span>العربية</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">طوني</p>
                  <p className="text-xs text-gray-500">نيو يورك, الولايات المتحدة</p>
                </div>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64"
                  alt="User profile"
                />
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Page Title */}
      <div className="px-2 sm:px-3 lg:px-4">
        <div className="max-w-full mx-auto py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                طلبات الدفع 
              </h1>
              <p className="text-gray-600 mt-2 text-lg font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                إدارة وتنظيم طلبات الدفع للمطعم
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      إجمالي الطلبات
                    </p>
                    <p className="text-3xl font-bold text-purple-900 mt-1">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-xl">
                    <FileText className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      مدفوع
                    </p>
                    <p className="text-3xl font-bold text-green-900 mt-1">{stats.paid}</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      مدفوع جزئياً
                    </p>
                    <p className="text-3xl font-bold text-orange-900 mt-1">{stats.partially}</p>
                  </div>
                  <div className="p-3 bg-orange-200 rounded-xl">
                    <FileText className="h-6 w-6 text-orange-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      غير مدفوع
                    </p>
                    <p className="text-3xl font-bold text-red-900 mt-1">{stats.unpaid}</p>
                  </div>
                  <div className="p-3 bg-red-200 rounded-xl">
                    <Archive className="h-6 w-6 text-red-700" />
                  </div>
                </div>
              </div>
            </div>

      <main className="max-w-full mx-auto px-2 sm:px-1.5 lg:px-2 py-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          
          {/* Stats Cards */}
          <div className="p-8 border-b border-gray-100">
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      إجمالي الطلبات
                    </p>
                    <p className="text-3xl font-bold text-purple-900 mt-1">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-xl">
                    <FileText className="h-6 w-6 text-purple-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      مدفوع
                    </p>
                    <p className="text-3xl font-bold text-green-900 mt-1">{stats.paid}</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      مدفوع جزئياً
                    </p>
                    <p className="text-3xl font-bold text-orange-900 mt-1">{stats.partially}</p>
                  </div>
                  <div className="p-3 bg-orange-200 rounded-xl">
                    <FileText className="h-6 w-6 text-orange-700" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
                      غير مدفوع
                    </p>
                    <p className="text-3xl font-bold text-red-900 mt-1">{stats.unpaid}</p>
                  </div>
                  <div className="p-3 bg-red-200 rounded-xl">
                    <Archive className="h-6 w-6 text-red-700" />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Search and Filter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="بحث في الطلبات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm w-80 transition-all"
                  />
                </div>
                {/* <button className="flex items-center space-x-2 space-x-reverse px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors" type="button">
                  <Filter size={16} />
                  <span className="text-sm font-medium">فلتر</span>
                </button> */}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">رقم الطاولة</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">التاريخ والوقت</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">اسم الزائر</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">المجموع $</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">المتبقي للدفع $</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">البقشيش $</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">الحالة</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 text-sm font-semibold text-gray-900">{record.id}</td>
                    <td className="py-5 px-6 text-sm text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">{record.dateTime}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {record.visitorName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">{record.visitorName}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm font-bold text-gray-900">${record.total.toFixed(2)}</td>
                    <td className="py-5 px-6 text-sm font-medium text-gray-700">${record.leftToPay.toFixed(2)}</td>
                    <td className="py-5 px-6 text-sm font-medium text-green-600">${record.tips.toFixed(2)}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusDot(record.status)}`}></div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <button className="text-gray-400 hover:text-purple-600 transition-colors p-1 rounded-lg hover:bg-purple-50" type='button'>
                        <Info size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 font-['Tajawal',_'Cairo',_'Noto_Sans_Arabic',_sans-serif]">
              <span>عرض</span>
              <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white">
                <option>6</option>
                <option>12</option>
                <option>24</option>
              </select>
              <span>من أصل {filteredData.length} طلب</span>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                type="button">
                <ChevronRight size={16} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  page = currentPage - 2 + i;
                  if (page > totalPages) page = totalPages - 4 + i;
                }
                return page;
              }).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-white border border-gray-300'
                  }`}
                  type="button">
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                type="button">
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Layout>
  );
}

export default App;