// import React from 'react';
// import { AlertTriangle, X } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface StopTrainingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// export default function StopTrainingModal({ 
//   isOpen, 
//   onClose, 
//   onConfirm
// }: StopTrainingModalProps) {
//   const router = useRouter();
//   if (!isOpen) return null;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div>
//     <button 
//       className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
//       onClick={handleBackdropClick}
//       type="button">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 duration-200">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 pb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
//               <AlertTriangle className="w-6 h-6 text-amber-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">ايقاف التدريب</h2>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
//             type="button">
//             <X className="w-4 h-4 text-gray-400" />
//           </button>
//         </div>

//         {/* Progress Section */}
//         <div className="px-6 pb-6">
//           <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
//             <p className="text-sm text-amber-800">
//               <strong>تحذير:</strong> التوقف الآن سيؤدي إلى فقدان كل التقدم المحرز في جلسة التدريب هذه. 
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex space-x-3 p-6 pt-0">
//           <button
//             onClick={()=> {
//                 onClose
//                 router.back()
//             }}
//             className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
//             type="button">
//             إستمرار التدريب
//             </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-lg hover:shadow-red-200"
//             type="button">
//             إيقاف التدريب
//             </button>
//         </div>
//       </div>
//     </button>
//     </div>
//   );
// }














import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StopTrainingModalProps {
  isOpen: boolean;
  isExit: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StopTrainingModal({ 
  isOpen,
  isExit,
  onClose, 
  onConfirm
}: StopTrainingModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={handleBackdropClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        aria-label="Close modal"
      />
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-in zoom-in-95 duration-200 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">ايقاف التدريب</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Progress Section */}
        <div className="px-6 pb-6">
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800">
              <strong>تحذير:</strong> التوقف الآن سيؤدي إلى فقدان كل التقدم المحرز في جلسة التدريب هذه. 
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={() => {
              onClose();
            }}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            type="button"
          >
            إستمرار التدريب
          </button>
          <button
            onClick={() =>{
                onConfirm();
                isExit();
                router.back();
            }}
            className="flex-1 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-lg hover:shadow-red-200"
            type="button"
          >
            إيقاف التدريب
          </button>
        </div>
      </div>
    </div>
  );
}