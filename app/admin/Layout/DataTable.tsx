"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MoreVertical } from 'lucide-react';
import {  useDispatch } from 'react-redux';
import { changeUserId } from "../Layout/features/auth/authSlice"
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title: string;
  onchangeUserId?: (userId: string) => void;
  onDispatchData?: (item: any) => void;
  onShowDetails?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  title,
  onDispatchData,
  onchangeUserId,
  onShowDetails,
  onEdit,
  onDelete 
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const dispatch = useDispatch();
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };
const handleClickOutside = () => {
    setActiveMenu(null);
  };
  
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];
        
        if (valueA === valueB) return 0;
        
        const comparison = valueA > valueB ? 1 : -1;
        return sortDirection === 'desc' ? comparison * -1 : comparison;
      })
    : filteredData;

  React.useEffect(() => {
    if (activeMenu !== null) {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.action-menu')) {
          handleClickOutside();
        }
      };
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [activeMenu]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <h2 className="text-base sm:text-lg lg:text-xl font-medium text-gray-900">{title}</h2>
        <div className="w-full sm:w-64 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer select-none' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortKey === column.key && (
                      <span className="inline-flex">
                        {sortDirection === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {column.render
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium relative">
                    <div className="action-menu relative inline-block text-left">
                      {/* <button
                        onClick={() => {
                          toggleMenu(index);
                          if (onDispatchData) onDispatchData(dispatch(changeUserId(item.id)));
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        type="button">
                        <MoreVertical className="h-5 w-5 cursor-pointer" />
                      </button> */}

                      
                      {/* {activeMenu === index && (
                     
                        <div className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1  ring-opacity-5 ">
                          <div className="py-1 flex flex-col z-50 outline-none border-none">
                            {onShowDetails && ( 
                              <button
                                onClick={() => {
                                  onShowDetails(item);
                                  dispatch(changeUserId(item.id));
                                  if (onchangeUserId) onchangeUserId(item.id);
                                  handleClickOutside();
                                }}
                                className="w-full text-left cursor-pointer px-4 py-2 text-xs sm:text-sm rounded-md text-gray-700 hover:bg-gray-100"
                                type="button">
                                show details
                              </button>
                            )}
                            {onEdit && (
                              <button
                                onClick={() => {
                                  onEdit(item);
                                  handleClickOutside();
                                }}
                                className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                                type="button">
                                Edit
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => {
                                  onDelete(item);
                                  handleClickOutside();
                                }}
                                className="w-full text-left rounded-md px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                                type="button">
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-4 text-center text-xs sm:text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Mobile Card View */}
        <div className="md:hidden">
          {sortedData.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {sortedData.map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 relative">
                  <div className="absolute top-4 right-4">
                    <div className="action-menu relative inline-block text-left">
                      <button
                        onClick={() => toggleMenu(index)}
                        className="text-gray-400 hover:text-gray-600"
                        type="button">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {activeMenu === index && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            {onShowDetails && (
                              <button
                                onClick={() => {
                                  onShowDetails(item);
                                  handleClickOutside();
                                }}
                                className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                                type="button">
                                Show Details
                              </button>
                            )}
                            {onEdit && (
                              <button
                                onClick={() => {
                                  onEdit(item);
                                  handleClickOutside();
                                }}
                                className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                                type="button">
                                Edit
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => {
                                  onDelete(item);
                                  handleClickOutside();
                                }}
                                className="w-full text-left px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                                type="button">
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {columns.map((column) => (
                    <div key={column.key} className="flex justify-between py-1">
                      <div className="font-medium text-xs sm:text-sm text-gray-700">{column.label}</div>
                      <div className="text-xs sm:text-sm text-gray-900">
                        {column.render
                          ? column.render(item[column.key], item)
                          : item[column.key]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;