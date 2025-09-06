// "use client"
// import React, { useState } from 'react';
// import AdminSidebar from './components/AdminSidebar';
// import BlogsPage from './components/BlogsPage';
// import Layout from "@/app/admin/Layout/Layout"
// import { Menu, X } from 'lucide-react';

// function Page() {
//   const [activeSection, setActiveSection] = useState('blogs');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'blogs':
//         return <BlogsPage />;
//       default:
//         return (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <h2 className="text-xl font-semibold text-gray-900 mb-2">
//                 {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
//               </h2>
//               <p className="text-gray-600">This section is under development.</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <Layout>
//     <div className="flex w-full h-screen bg-gray-50">
//       {/* Mobile Menu Button */}
//       {/* <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         type="button"
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
//       >
//         {isSidebarOpen ? (
//           <X className="w-5 h-5 text-gray-600" />
//         ) : (
//           <Menu className="w-5 h-5 text-gray-600" />
//         )}
//       </button> */}

//       {/* Mobile Overlay */}
//       {/* {isSidebarOpen && (
//         <button 
//           className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
//           onClick={() => setIsSidebarOpen(false)}
//           type="button"
//         />
//       )} */}

//       {/* Sidebar */}
//       {/* <div className={`fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//         isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <AdminSidebar 
//           activeSection={activeSection} 
//           onSectionChange={(section) => {
//             setActiveSection(section);
//             setIsSidebarOpen(false);
//           }} 
//         />
//       </div> */}

//       {/* Main Content */}
//       <main className="">
//         <div className="">
//           {renderContent()}
//         </div>
//       </main>
//     </div>
//     </Layout>
//   );
// }

// export default Page;















import React from 'react';
import { BlogAdmin } from './components/BlogAdmin';
import Layout from '@/app/admin/Layout/Layout';

function App() {
  return (
  <Layout>
  <BlogAdmin />
  </Layout>
  )
}

export default App;