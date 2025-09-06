// import React from 'react';
// import { AlertTriangle } from 'lucide-react';
// import Modal from './Model';

// interface ConfirmDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   type?: 'danger' | 'warning' | 'info';
// }

// const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText = 'Confirm',
//   cancelText = 'Cancel',
//   type = 'danger'
// }) => {
//   const typeStyles = {
//     danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
//     warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
//     info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
//       <div className="mb-4">
//         <div className="flex items-center mb-3">
//           <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
//           <p className="text-sm text-gray-700">{message}</p>
//         </div>
//       </div>
      
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           type='button'>
//           {cancelText}
//         </button>
//         <button
//           onClick={() => {
//             onConfirm();
//             onClose();
//           }}
//           className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 ${typeStyles[type]}`}
//           type='button'>
//           {confirmText}
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default ConfirmDialog;

















import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Model';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'danger'
}) => {
  const typeStyles = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="mb-4">
        <div className="flex items-center mb-3" dir="rtl">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 space-x-reverse">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          type='button'>
          {cancelText}
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 ${typeStyles[type]}`}
          type='button'>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;