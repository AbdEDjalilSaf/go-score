import type React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, ShoppingBag, ChartNoAxesCombined, School,
   FolderTree, SquarePen, HandCoins, MailPlus, CircleDollarSign, BadgeAlert, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'الرئيسية', icon: <LayoutDashboard />, path: '/admin' },
    { name: 'المستخدمون', icon: <Users />, path: '/admin/pages/users' },
    { name: 'الاقسام و المهارات', icon: <ChartNoAxesCombined />, path: '/admin/pages/analysis' },
    { name: 'الكورسات & الاسئلة', icon: <School />, path: '/admin/pages/questionAndCourses' },
    { name: 'طلبات الانضمام', icon: <FolderTree />, path: '/admin/pages/join-requests' },
    { name: 'عمليات الدفع', icon: <HandCoins />, path: '/admin/pages/payment-operation' },
    { name: 'قسم الدعم', icon: <BadgeAlert />, path: '/admin/pages/support' },
    { name: 'المدونة', icon: <SquarePen />, path: '/admin/pages/blog' },
    { name: 'باقات الاشتراكات', icon: <CircleDollarSign />, path: '/admin/subscribes' },
    { name: 'طلبات الاشتراكات', icon: <MailPlus />, path: '/admin/subscribesٌRequests' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 right-0 bg-gray-500 opacity-50  xl:hidden"
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          onKeyUp={toggleSidebar}
        >
        </div>
      )}
      
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 py-1 px-0.5 left-0 z-40 w-64 bg-purple-700 text-white transition-transform duration-300 ease-in-out transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          xl:translate-x-0 xl:static xl:w-64
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-800">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold">لوحة التحكم</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-gray-200"
            aria-label="Close sidebar"
            type="button">
            <ChevronLeft className="h-6 w-6 transform rotate-180" />
          </button>
          <button
            onClick={toggleSidebar}
            className="hidden lg:block text-white hover:text-gray-200"
            aria-label="Toggle sidebar"
            type="button">
            <ChevronRight className="h-6 w-6 transform rotate-180" />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="group flex items-center px-2 py-3 text-xs sm:text-sm lg:text-base font-medium rounded-md transition-colors duration-150 hover:bg-purple-800 ">
                <div className="ml-4 text-white h-5 w-5">{item.icon}</div>
                <span className='text-white'>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;