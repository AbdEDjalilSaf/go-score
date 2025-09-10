// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Route, Calendar, X, Star, Settings, RotateCcw, Lock, Target, BarChart3 } from 'lucide-react';
// import { useAnalyticalStatistics } from '../hooks/useAnalyticalStatistics';
// import StatisticsCard from './StatisticsCard';
// import LoadingSpinner from './LoadingSpinner';
// import ErrorMessage from './ErrorMessage';

// interface Setting {
//   id: string;
//   label: string;
//   description: string;
//   icon: string;
//   defaultValue: boolean;
//   color: string;
// }

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// // Mock data for demonstration
// const mockData = {
//   header: {
//     title: "واجهة التدريب الذكي",
//     buttons: [
//       { text: "ابدأ التدريب" },
//       { text: "عرض النتائج" }
//     ],
//     description: [
//       "مرحباً بك في نظام التدريب الذكي المتطور",
//       "يمكنك تخصيص إعدادات التدريب وفقاً لاحتياجاتك"
//     ]
//   },
//   title: "إعدادات التدريب",
//   resetButton: "إعادة تعيين الإعدادات",
//   questionsBank: {
//     lastUpdated: "آخر تحديث: 15 يناير 2024",
//     filterLabels: {
//       newest: "الأحدث",
//       oldest: "الأقدم"
//     }
//   },
//   settings: [
//     {
//       id: "randomize",
//       label: "ترتيب عشوائي للأسئلة",
//       description: "عرض الأسئلة بترتيب عشوائي",
//       icon: "settings",
//       defaultValue: true,
//       color: "blue"
//     },
//     {
//       id: "timer",
//       label: "عرض المؤقت",
//       description: "إظهار الوقت المتبقي أثناء الاختبار",
//       icon: "star",
//       defaultValue: false,
//       color: "green"
//     },
//     {
//       id: "hints",
//       label: "إظهار التلميحات",
//       description: "عرض تلميحات مساعدة للأسئلة الصعبة",
//       icon: "x",
//       defaultValue: true,
//       color: "red"
//     }
//   ]
// };

// export default function TrainingInterface() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentDifficulty, setCurrentDifficulty] = useState(50);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   // API integration
//   const { data: statisticsData, loading, error, refetch } = useAnalyticalStatistics();

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentDifficulty(parseInt(e.target.value));
//   };

//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     mockData.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     mockData.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         {/* Main Container */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           {/* Header */}
//           <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//             <div className="order-2 lg:order-1">
//               <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">
//                 {mockData.header.title}
//               </h1>
//             </div>
//             <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//               <button className="bg-purple-800 text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center gap-2" type="button">
//                 <Target className="w-4 h-4" />
//                 ابدأ التدريب
//               </button>
//               <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2" type="button">
//                 <BarChart3 className="w-4 h-4" />
//                 {mockData.header.buttons[1].text}
//               </button>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="text-right mb-8">
//             {mockData.header.description.map((text, index) => (
//               <p key={index} className="text-gray-600 mb-2 leading-relaxed">
//                 {text}
//               </p>
//             ))}
//           </div>

//           {/* Statistics Section */}
//           {loading && <LoadingSpinner text="جاري تحميل الإحصائيات..." />}
//           {error && <ErrorMessage message={error} onRetry={refetch} />}
//           {statisticsData && <StatisticsCard testTypes={statisticsData.testTypes} />}

//           {/* Advanced Options */}
//           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//             <div className="flex justify-between items-center p-4 bg-purple-100">
//               <div className="flex items-center gap-2">
//                 <Route className="w-5 h-5 text-purple-600" />
//                 <h2 className="text-lg font-semibold text-purple-800">خيارات متقدمة</h2>
//               </div>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="text-purple-600 hover:text-purple-800 transition-colors"
//                 type="button"
//               >
//                 {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>
//             </div>

//             {isExpanded && (
//               <div className="p-6 space-y-6">
//                 {/* Last Updated Info */}
//                 <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                   <Calendar className="w-4 h-4 text-purple-600" />
//                   <span className="text-sm font-medium">
//                     {mockData.questionsBank.lastUpdated}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Settings Panel */}
//                   <div>
//                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                       <div className="bg-purple-700 p-4 text-center">
//                         <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                           <Lock className="w-4 h-4 text-white" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-white">
//                           {mockData.title}
//                         </h3>
//                       </div>

//                       <div className="p-4">
//                         {mockData.settings.map((setting: Setting) => (
//                           <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//                             <div className="flex items-center gap-3 flex-1">
//                               <IconComponent iconName={setting.icon} color={setting.color} />
//                               <div className="flex-1">
//                                 <div className="text-sm font-medium text-gray-900 mb-1">
//                                   {setting.label}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {setting.description}
//                                 </div>
//                               </div>
//                             </div>
//                             <ToggleSwitch
//                               isOn={settings[setting.id] || false}
//                               onToggle={() => toggleSetting(setting.id)}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <button
//                       onClick={resetSettings}
//                       className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//                       type="button"
//                     >
//                       <RotateCcw className="w-4 h-4" />
//                       {mockData.resetButton}
//                     </button>
//                   </div>

//                   {/* Sliders Panel */}
//                   <div className="space-y-6">
//                     {/* Questions Count Slider */}
//                     <div className="border border-purple-200 rounded-lg p-4">
//                       <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-4">
//                         <span>{mockData.questionsBank.filterLabels.newest}</span>
//                         <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                           <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                           <span className="text-purple-600">سؤال</span>
//                         </div>
//                         <span>{mockData.questionsBank.filterLabels.oldest}</span>
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="range"
//                           min="1"
//                           max="100"
//                           value={currentValue}
//                           onChange={handleSliderChange}
//                           className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{
//                             background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentValue}%, #E5E7EB ${currentValue}%, #E5E7EB 100%)`
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Difficulty Slider */}
//                     <div className="border border-purple-200 rounded-lg p-4">
//                       <div className="flex items-center justify-center mb-4">
//                         <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                           <span className="text-purple-800 text-lg font-semibold">صعوبة الأسئلة</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                         <span>سهل</span>
//                         <span className="font-bold text-purple-600">{currentDifficulty}%</span>
//                         <span>صعب</span>
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="range"
//                           min="1"
//                           max="100"
//                           value={currentDifficulty}
//                           onChange={handleDifficultyChange}
//                           className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{
//                             background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentDifficulty}%, #E5E7EB ${currentDifficulty}%, #E5E7EB 100%)`
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
//         * {
//           font-family: 'Tajawal', sans-serif;
//         }
        
//         /* Custom slider styling */
//         input[type="range"]::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: #8B5CF6;
//           cursor: pointer;
//           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
//           transition: all 0.2s ease;
//         }
        
//         input[type="range"]::-webkit-slider-thumb:hover {
//           transform: scale(1.1);
//           box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
//         }
        
//         input[type="range"]::-moz-range-thumb {
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: #8B5CF6;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }
















// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Route, Calendar, X, Star, Settings, RotateCcw, Lock, Target, BarChart3 } from 'lucide-react';
// import { useAnalyticalStatistics } from '../hooks/useStatistics';
// import StatisticsCard from './StatisticsCard';
// import LoadingSpinner from './LoadingSpinner';
// import ErrorMessage from './ErrorMessage';

// interface Setting {
//   id: string;
//   label: string;
//   description: string;
//   icon: string;
//   defaultValue: boolean;
//   color: string;
// }

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// // Mock data for demonstration
// const mockData = {
//   header: {
//     title: "واجهة التدريب الذكي",
//     buttons: [
//       { text: "ابدأ التدريب" },
//       { text: "عرض النتائج" }
//     ],
//     description: [
//       "مرحباً بك في نظام التدريب الذكي المتطور",
//       "يمكنك تخصيص إعدادات التدريب وفقاً لاحتياجاتك"
//     ]
//   },
//   title: "إعدادات التدريب",
//   resetButton: "إعادة تعيين الإعدادات",
//   questionsBank: {
//     lastUpdated: "آخر تحديث: 15 يناير 2024",
//     filterLabels: {
//       newest: "الأحدث",
//       oldest: "الأقدم"
//     }
//   },
//   settings: [
//     {
//       id: "randomize",
//       label: "ترتيب عشوائي للأسئلة",
//       description: "عرض الأسئلة بترتيب عشوائي",
//       icon: "settings",
//       defaultValue: true,
//       color: "blue"
//     },
//     {
//       id: "timer",
//       label: "عرض المؤقت",
//       description: "إظهار الوقت المتبقي أثناء الاختبار",
//       icon: "star",
//       defaultValue: false,
//       color: "green"
//     },
//     {
//       id: "hints",
//       label: "إظهار التلميحات",
//       description: "عرض تلميحات مساعدة للأسئلة الصعبة",
//       icon: "x",
//       defaultValue: true,
//       color: "red"
//     }
//   ]
// };

// export default function TrainingInterface() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentDifficulty, setCurrentDifficulty] = useState(50);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   // API integration
//   const { data: statisticsData, loading, error, refetch } = useAnalyticalStatistics();

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentDifficulty(parseInt(e.target.value));
//   };

//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     mockData.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     mockData.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         {/* Main Container */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           {/* Header */}
//           <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//             <div className="order-2 lg:order-1">
//               <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">
//                 {mockData.header.title}
//               </h1>
//             </div>
//             <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//               <button className="bg-purple-800 text-white py-3 px-8 rounded-lg font-medium hover:bg-purple-900 transition-colors flex items-center gap-2" type="button">
//                 <Target className="w-4 h-4" />
//                 ابدأ التدريب
//               </button>
//               <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2" type="button">
//                 <BarChart3 className="w-4 h-4" />
//                 {mockData.header.buttons[1].text}
//               </button>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="text-right mb-8">
//             {mockData.header.description.map((text, index) => (
//               <p key={index} className="text-gray-600 mb-2 leading-relaxed">
//                 {text}
//               </p>
//             ))}
//           </div>

//           {/* Statistics Section */}
//           {loading && <LoadingSpinner text="جاري تحميل الإحصائيات..." />}
//           {error && <ErrorMessage message={error} onRetry={refetch} />}
//           {statisticsData?.testTypes && <StatisticsCard testTypes={statisticsData.testTypes} />}

//           {/* Advanced Options */}
//           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//             <div className="flex justify-between items-center p-4 bg-purple-100">
//               <div className="flex items-center gap-2">
//                 <Route className="w-5 h-5 text-purple-600" />
//                 <h2 className="text-lg font-semibold text-purple-800">خيارات متقدمة</h2>
//               </div>
//               <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="text-purple-600 hover:text-purple-800 transition-colors"
//                 type="button"
//               >
//                 {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>
//             </div>

//             {isExpanded && (
//               <div className="p-6 space-y-6">
//                 {/* Last Updated Info */}
//                 <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                   <Calendar className="w-4 h-4 text-purple-600" />
//                   <span className="text-sm font-medium">
//                     {mockData.questionsBank.lastUpdated}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {/* Settings Panel */}
//                   <div>
//                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                       <div className="bg-purple-700 p-4 text-center">
//                         <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                           <Lock className="w-4 h-4 text-white" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-white">
//                           {mockData.title}
//                         </h3>
//                       </div>

//                       <div className="p-4">
//                         {mockData.settings.map((setting: Setting) => (
//                           <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//                             <div className="flex items-center gap-3 flex-1">
//                               <IconComponent iconName={setting.icon} color={setting.color} />
//                               <div className="flex-1">
//                                 <div className="text-sm font-medium text-gray-900 mb-1">
//                                   {setting.label}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                   {setting.description}
//                                 </div>
//                               </div>
//                             </div>
//                             <ToggleSwitch
//                               isOn={settings[setting.id] || false}
//                               onToggle={() => toggleSetting(setting.id)}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <button
//                       onClick={resetSettings}
//                       className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
//                       type="button"
//                     >
//                       <RotateCcw className="w-4 h-4" />
//                       {mockData.resetButton}
//                     </button>
//                   </div>

//                   {/* Sliders Panel */}
//                   <div className="space-y-6">
//                     {/* Questions Count Slider */}
//                     <div className="border border-purple-200 rounded-lg p-4">
//                       <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-4">
//                         <span>{mockData.questionsBank.filterLabels.newest}</span>
//                         <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                           <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                           <span className="text-purple-600">سؤال</span>
//                         </div>
//                         <span>{mockData.questionsBank.filterLabels.oldest}</span>
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="range"
//                           min="1"
//                           max="100"
//                           value={currentValue}
//                           onChange={handleSliderChange}
//                           className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{
//                             background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentValue}%, #E5E7EB ${currentValue}%, #E5E7EB 100%)`
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* Difficulty Slider */}
//                     <div className="border border-purple-200 rounded-lg p-4">
//                       <div className="flex items-center justify-center mb-4">
//                         <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                           <span className="text-purple-800 text-lg font-semibold">صعوبة الأسئلة</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                         <span>سهل</span>
//                         <span className="font-bold text-purple-600">{currentDifficulty}%</span>
//                         <span>صعب</span>
//                       </div>

//                       <div className="relative">
//                         <input
//                           type="range"
//                           min="1"
//                           max="100"
//                           value={currentDifficulty}
//                           onChange={handleDifficultyChange}
//                           className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                           style={{
//                             background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentDifficulty}%, #E5E7EB ${currentDifficulty}%, #E5E7EB 100%)`
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
//         * {
//           font-family: 'Tajawal', sans-serif;
//         }
        
//         /* Custom slider styling */
//         input[type="range"]::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: #8B5CF6;
//           cursor: pointer;
//           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
//           transition: all 0.2s ease;
//         }
        
//         input[type="range"]::-webkit-slider-thumb:hover {
//           transform: scale(1.1);
//           box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
//         }
        
//         input[type="range"]::-moz-range-thumb {
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           background: #8B5CF6;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }



















// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import QuizSections from "./QuizSections";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Route, 
//   Calendar, 
//   X, 
//   Star, 
//   Settings, 
//   RotateCcw, 
//   Lock,
//   AlertCircle,
//   Loader2
// } from "lucide-react";
// import TestInfo from './TestInfo'; 
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { getAnalyticalStatistics } from '../services/api';
// import { staticConfig } from '../data/staticConfig';
// import { TestClass, Setting, TestType } from '../types/api';

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// export default function TrainingInterface() {
//   // State management
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([]);
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
// //   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
//   const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);

//   // Get current title from Redux (assuming this exists)
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);

//   // Initialize settings
//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   // Fetch data based on current title
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await getAnalyticalStatistics();
        
//         if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح");
//         }

//         const testTypes = response.data.testTypes;

//         // Process Qudrat data
//         const qudratTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Qudrat")
//         );

//         if (qudratTestType?.testClasses) {
//           const processedQudratClasses = processTestClasses(qudratTestType.testClasses);
//           setQudratTestClasses(processedQudratClasses);
//         }

//         // Process Tahsili data
//         const tahsiliTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Tahsili")
//         );

//         if (tahsiliTestType?.testClasses) {
//           const processedTahsiliClasses = processTestClasses(tahsiliTestType.testClasses);
//           setTahsiliTestClasses(processedTahsiliClasses);
//         }

//         if (!qudratTestType && !tahsiliTestType) {
//           setError("لم يتم العثور على بيانات الاختبارات");
//         }

//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculateSelectionStats = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     let totalQuestions = 0;
//     let totalCategories = 0;

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill) {
//               totalQuestions += skill.questionsCount || 0;
//               totalCategories += 1;
//             }
//           });
//         }
//       }
//     });

//     setSelectedQuestionsCount(totalQuestions);
//     setSelectedCategoriesCount(totalCategories);
//   }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

//   // Helper function to process test classes
//   const processTestClasses = (testClasses: TestClass[]): TestClass[] => {
//     const uniqueClasses = testClasses.filter((testClass, index, array) => {
//       return array.findIndex((c) => c.value === testClass.value) === index;
//     });

//     return uniqueClasses
//       .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//       .map((testClass) => {
//         const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//           return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
//         });

//         const processedSkills = uniqueSkills.map((skill) => ({
//           ...skill,
//           selected: false,
//           questionsCount: skill.questionsCount || 0,
//           correctAnswersCount: skill.correctAnswersCount || 0,
//           ratio: skill.ratio || 0,
//         }));

//         return {
//           ...testClass,
//           skillTestsStatistics: processedSkills,
//           selectAll: false,
//         };
//       })
//       .filter((testClass) => testClass.skillTestsStatistics.length > 0);
//   };

//   // Event handlers
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };

//   // Get current test classes based on selected title
//   const getCurrentTestClasses = () => {
//     return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
//   };

//   if (loading) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-purple-600">
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span className="text-lg font-medium">جاري تحميل البيانات...</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   if (error) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-6 h-6" />
//             <span className="text-lg font-medium">{error}</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
//                   {staticConfig.header.title}
//                 </h1>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 {/* <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">
//                   ابدأ التدريب
//                 </button> */}
//                 <button 
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   type="button"
//                 >
//                   {isRefreshing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     staticConfig.header.buttons[1].text
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {staticConfig.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Subject Grid */}
//             <div className="flex flex-col sm:flex-row  items-center justify-between gap-4">
//               {getCurrentTestClasses().map((testClass) => (
//                 <QuizSections
//                   key={testClass.id}
//                   title={testClass.value}
//                   id={testClass.id.toString()}
//                   categories={testClass.skillTestsStatistics.map((skill) => ({
//                     id: skill.id.toString(),
//                     text: skill.value,
//                     selected: skill.selected || false,
//                     questionsCount: skill.questionsCount,
//                     correctAnswersCount: skill.correctAnswersCount,
//                     ratio: skill.ratio,
//                   }))}
//                   onSelectionChange={(selectedCategories) => {
//                     console.log('Selected categories:', selectedCategories);
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Advanced Options */}


//             {/* <div className="bg-white mt-7 rounded-lg border border-gray-200 overflow-hidden">
//               <div className="flex justify-between items-center p-4 bg-purple-100">
//                 <div className="flex items-center gap-2">
//                   <Route />
//                   <h2 className="bg-purple-100">خيارات متقدمة</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="bg-purple-100"
//                   type="button"
//                 >
//                   {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//               </div>

//               {isExpanded && (
//                 <>
//                   <div className="p-6 space-y-6">
//                     <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                       <Calendar className="w-4 h-4 text-purple-600" />
//                       <span className="text-sm font-medium">
//                         {staticConfig.questionsBank.lastUpdated}
//                       </span>
//                     </div>

//                     <div className="flex gap-4 w-full flex-col-reverse md:flex-row-reverse">
//                       <div>
//                         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                           <div className="bg-purple-700 p-4 text-center">
//                             <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                               <Lock className="w-4 h-4 text-white" />
//                             </div>
//                             <h1 className="text-lg font-semibold text-white">
//                               {staticConfig.title}
//                             </h1>
//                           </div>

//                           <div className="p-4">
//                             {staticConfig.settings.map((setting: Setting) => (
//                               <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//                                 <div className="flex items-center gap-3 flex-1">
//                                   <IconComponent iconName={setting.icon} color={setting.color} />
//                                   <div className="flex-1">
//                                     <div className="text-sm font-medium text-gray-900 mb-1">
//                                       {setting.label}
//                                     </div>
//                                     <div className="text-xs text-gray-500">
//                                       {setting.description}
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <ToggleSwitch
//                                   isOn={settings[setting.id] || false}
//                                   onToggle={() => toggleSetting(setting.id)}
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <button
//                           onClick={resetSettings}
//                           className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//                           type="button"
//                         >
//                           <RotateCcw className="w-4 h-4" />
//                           {staticConfig.resetButton}
//                         </button>
//                       </div>

//                       <div className="w-[100%] md:w-[70%]">
//                         <div className="space-y-4 md:h-[39%] border-[1px] mb-6 rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <span>{staticConfig.questionsBank.filterLabels.newest}</span>
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                               <span className="text-purple-600">سؤال</span>
//                             </div>
//                             <span>{staticConfig.questionsBank.filterLabels.oldest}</span>
//                           </div>
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentValue}
//                               onChange={handleSliderChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                               style={{
//                                 background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentValue}%, #E5E7EB ${currentValue}%, #E5E7EB 100%)`
//                               }}
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-4 md:h-[39%] border-[1px] rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-800 text-lg">صعوبة الأسئلة</span>
//                             </div>
//                           </div>
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentVale}
//                               onChange={handleSliderHardChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                               style={{
//                                 background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentVale}%, #E5E7EB ${currentVale}%, #E5E7EB 100%)`
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div> */}





//           </div>

//           {/* <TestInfo testInfo={staticConfig.testInfo} /> */}

//            {/* Updated TestInfo with dynamic data */}
//            <TestInfo 
//             testInfo={staticConfig.testInfo}
//             selectedQuestionsCount={selectedQuestionsCount}
//             selectedCategoriesCount={selectedCategoriesCount}
//             isLoading={loading}
//           />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//           input[type="range"]::-webkit-slider-thumb {
//             appearance: none;
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #8B5CF6;
//             cursor: pointer;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             transition: all 0.2s ease;
//           }
//           input[type="range"]::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   );
// }















// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import QuizSections from "./QuizSections";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Route, 
//   Calendar, 
//   X, 
//   Star, 
//   Settings, 
//   RotateCcw, 
//   Lock,
//   AlertCircle,
//   Loader2
// } from "lucide-react";
// import TestInfo from './TestInfo';
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { getAnalyticalStatistics } from '../services/api';
// import { staticConfig } from '../data/staticConfig';
// import { TestClass, Setting, TestType } from '../types/api';

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// export default function TrainingInterface() {
//   // State management
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([]);
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   // Selection tracking state
//   const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
//   const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
//   const [selectedCategoriesCount, setSelectedCategoriesCount] = useState(0);
  
//   // Get current title from Redux (assuming this exists)
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);

//   // Initialize settings
//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   // Calculate selected questions and categories count
//   const calculateSelectionStats = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     let totalQuestions = 0;
//     let totalCategories = 0;

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill) {
//               totalQuestions += skill.questionsCount || 0;
//               totalCategories += 1;
//             }
//           });
//         }
//       }
//     });

//     setSelectedQuestionsCount(totalQuestions);
//     setSelectedCategoriesCount(totalCategories);
//   }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

//   // Update selection stats when selections change
//   useEffect(() => {
//     calculateSelectionStats();
//   }, [calculateSelectionStats]);

//   // Handle selection changes from QuizSections
//   const handleSelectionChange = (testClassId: string, selectedCategoryIds: string[]) => {
//     setSelectedCategories(prev => ({
//       ...prev,
//       [testClassId]: selectedCategoryIds
//     }));
//   };

//   // Fetch data based on current title
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await getAnalyticalStatistics();
        
//         if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح");
//         }

//         const testTypes = response.data.testTypes;
//     console.log("data is ++++++++++++",response.data)
//         // Process Qudrat data
//         const qudratTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Qudrat")
//         );

//         if (qudratTestType?.testClasses) {
//           const processedQudratClasses = processTestClasses(qudratTestType.testClasses);
//           setQudratTestClasses(processedQudratClasses);
//         }

//         // Process Tahsili data
//         const tahsiliTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Tahsili")
//         );

//         if (tahsiliTestType?.testClasses) {
//           const processedTahsiliClasses = processTestClasses(tahsiliTestType.testClasses);
//           setTahsiliTestClasses(processedTahsiliClasses);
//         }

//         if (!qudratTestType && !tahsiliTestType) {
//           setError("لم يتم العثور على بيانات الاختبارات");
//         }

//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Helper function to process test classes
//   const processTestClasses = (testClasses: TestClass[]): TestClass[] => {
//     const uniqueClasses = testClasses.filter((testClass, index, array) => {
//       return array.findIndex((c) => c.value === testClass.value) === index;
//     });

//     return uniqueClasses
//       .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//       .map((testClass) => {
//         const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//           return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
//         });

//         const processedSkills = uniqueSkills.map((skill) => ({
//           ...skill,
//           selected: false,
//           questionsCount: skill.questionsCount || 0,
//           correctAnswersCount: skill.correctAnswersCount || 0,
//           ratio: skill.ratio || 0,
//         }));

//         return {
//           ...testClass,
//           skillTestsStatistics: processedSkills,
//           selectAll: false,
//         };
//       })
//       .filter((testClass) => testClass.skillTestsStatistics.length > 0);
//   };

//   // Event handlers
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//     // Also reset selections
//     setSelectedCategories({});
//   };

//   // Get current test classes based on selected title
//   const getCurrentTestClasses = () => {
//     return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
//   };

//   if (loading) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-purple-600">
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span className="text-lg font-medium">جاري تحميل البيانات...</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   if (error) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-6 h-6" />
//             <span className="text-lg font-medium">{error}</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
//                   {staticConfig.header.title}
//                 </h1>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 {/* <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">
//                   ابدأ التدريب
//                 </button> */}
//                 <button 
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   type="button"
//                 >
//                   {isRefreshing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     staticConfig.header.buttons[1].text
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {staticConfig.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Subject Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {getCurrentTestClasses().map((testClass) => (
//                 <QuizSections
//                   key={testClass.id}
//                   title={testClass.value}
//                   id={testClass.id.toString()}
//                   categories={testClass.skillTestsStatistics.map((skill) => ({
//                     id: skill.id.toString(),
//                     text: skill.value,
//                     selected: skill.selected || false,
//                     questionsCount: skill.questionsCount,
//                     correctAnswersCount: skill.correctAnswersCount,
//                     ratio: skill.ratio,
//                   }))}
//                   onSelectionChange={(selectedCategoryIds) => 
//                     handleSelectionChange(testClass.id.toString(), selectedCategoryIds)
//                   }
//                 />
//               ))}
//             </div>

//             {/* Advanced Options */}

//             {/* <div className="bg-white mt-7 rounded-lg border border-gray-200 overflow-hidden">
//               <div className="flex justify-between items-center p-4 bg-purple-100">
//                 <div className="flex items-center gap-2">
//                   <Route />
//                   <h2 className="bg-purple-100">خيارات متقدمة</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsExpanded(!isExpanded)}
//                   className="bg-purple-100"
//                   type="button"
//                 >
//                   {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                 </button>
//               </div>

//               {isExpanded && (
//                 <>
//                   <div className="p-6 space-y-6">
//                     <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                       <Calendar className="w-4 h-4 text-purple-600" />
//                       <span className="text-sm font-medium">
//                         {staticConfig.questionsBank.lastUpdated}
//                       </span>
//                     </div>

//                     <div className="flex gap-4 w-full flex-col-reverse md:flex-row-reverse">
//                       <div>
//                         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                           <div className="bg-purple-700 p-4 text-center">
//                             <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                               <Lock className="w-4 h-4 text-white" />
//                             </div>
//                             <h1 className="text-lg font-semibold text-white">
//                               {staticConfig.title}
//                             </h1>
//                           </div>

//                           <div className="p-4">
//                             {staticConfig.settings.map((setting: Setting) => (
//                               <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//                                 <div className="flex items-center gap-3 flex-1">
//                                   <IconComponent iconName={setting.icon} color={setting.color} />
//                                   <div className="flex-1">
//                                     <div className="text-sm font-medium text-gray-900 mb-1">
//                                       {setting.label}
//                                     </div>
//                                     <div className="text-xs text-gray-500">
//                                       {setting.description}
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <ToggleSwitch
//                                   isOn={settings[setting.id] || false}
//                                   onToggle={() => toggleSetting(setting.id)}
//                                 />
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <button
//                           onClick={resetSettings}
//                           className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//                           type="button"
//                         >
//                           <RotateCcw className="w-4 h-4" />
//                           {staticConfig.resetButton}
//                         </button>
//                       </div>

//                       <div className="w-[100%] md:w-[70%]">
//                         <div className="space-y-4 md:h-[39%] border-[1px] mb-6 rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <span>{staticConfig.questionsBank.filterLabels.newest}</span>
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                               <span className="text-purple-600">سؤال</span>
//                             </div>
//                             <span>{staticConfig.questionsBank.filterLabels.oldest}</span>
//                           </div>
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentValue}
//                               onChange={handleSliderChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                               style={{
//                                 background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentValue}%, #E5E7EB ${currentValue}%, #E5E7EB 100%)`
//                               }}
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-4 md:h-[39%] border-[1px] rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-800 text-lg">صعوبة الأسئلة</span>
//                             </div>
//                           </div>
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentVale}
//                               onChange={handleSliderHardChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                               style={{
//                                 background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentVale}%, #E5E7EB ${currentVale}%, #E5E7EB 100%)`
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div> */}









//           </div>

//           {/* Updated TestInfo with dynamic data */}
//           <TestInfo 
//             testInfo={staticConfig.testInfo}
//             selectedQuestionsCount={selectedQuestionsCount}
//             selectedCategoriesCount={selectedCategoriesCount}
//             isLoading={loading}
//           />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//           input[type="range"]::-webkit-slider-thumb {
//             appearance: none;
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #8B5CF6;
//             cursor: pointer;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             transition: all 0.2s ease;
//           }
//           input[type="range"]::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   );
// }














// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import QuizSections from "./QuizSections";
// import TrainingModal from "./TrainingModal";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   Route, 
//   Calendar, 
//   X, 
//   Star, 
//   Settings, 
//   RotateCcw, 
//   Lock,
//   AlertCircle,
//   Loader2
// } from "lucide-react";
// import TestInfo from './TestInfo';
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { getAnalyticalStatistics, getFilteredQuestions } from '../services/api';
// import { staticConfig } from '../data/staticConfig';
// import { TestClass, Setting, TestType, Question, TrainingSession } from '../types/api';

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// export default function TrainingInterface() {
//   // State management
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClass[]>([]);
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClass[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   // Selection tracking state
//   const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
//   const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
//   const [selectedCategoriesCount, setSelectedCategoriesCount] = useState(0);
  
//   // Training session state
//   const [trainingSession, setTrainingSession] = useState<TrainingSession | null>(null);
//   const [loadingQuestions, setLoadingQuestions] = useState(false);
//   const [showTrainingModal, setShowTrainingModal] = useState(false);
  
//   // Get current title from Redux (assuming this exists)
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);

//   // Initialize settings
//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   // Calculate selected questions and categories count
//   const calculateSelectionStats = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     let totalQuestions = 0;
//     let totalCategories = 0;

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill) {
//               totalQuestions += skill.questionsCount || 0;
//               totalCategories += 1;
//             }
//           });
//         }
//       }
//     });

//     setSelectedQuestionsCount(totalQuestions);
//     setSelectedCategoriesCount(totalCategories);
//   }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

//   // Update selection stats when selections change
//   useEffect(() => {
//     calculateSelectionStats();
//   }, [calculateSelectionStats]);

//   // Handle selection changes from QuizSections
//   const handleSelectionChange = (testClassId: string, selectedCategoryIds: string[]) => {
//     setSelectedCategories(prev => ({
//       ...prev,
//       [testClassId]: selectedCategoryIds
//     }));
//   };

//   // Fetch data based on current title
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await getAnalyticalStatistics();
        
//         if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
//           throw new Error("هيكل البيانات غير صحيح");
//         }

//         const testTypes = response.data.testTypes;
//         console.log("data is ++++++++++++",response.data)
        
//         // Process Qudrat data
//         const qudratTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Qudrat")
//         );

//         if (qudratTestType?.testClasses) {
//           const processedQudratClasses = processTestClasses(qudratTestType.testClasses);
//           setQudratTestClasses(processedQudratClasses);
//         }

//         // Process Tahsili data
//         const tahsiliTestType = testTypes.find((testType: TestType) => 
//           testType?.value && testType.value.includes("Tahsili")
//         );

//         if (tahsiliTestType?.testClasses) {
//           const processedTahsiliClasses = processTestClasses(tahsiliTestType.testClasses);
//           setTahsiliTestClasses(processedTahsiliClasses);
//         }

//         if (!qudratTestType && !tahsiliTestType) {
//           setError("لم يتم العثور على بيانات الاختبارات");
//         }

//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Helper function to process test classes
//   const processTestClasses = (testClasses: TestClass[]): TestClass[] => {
//     const uniqueClasses = testClasses.filter((testClass, index, array) => {
//       return array.findIndex((c) => c.value === testClass.value) === index;
//     });

//     return uniqueClasses
//       .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//       .map((testClass) => {
//         const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//           return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
//         });

//         const processedSkills = uniqueSkills.map((skill) => ({
//           ...skill,
//           selected: false,
//           questionsCount: skill.questionsCount || 0,
//           correctAnswersCount: skill.correctAnswersCount || 0,
//           ratio: skill.ratio || 0,
//         }));

//         return {
//           ...testClass,
//           skillTestsStatistics: processedSkills,
//           selectAll: false,
//         };
//       })
//       .filter((testClass) => testClass.skillTestsStatistics.length > 0);
//   };

//   // Handle starting training session
//   const handleStartTraining = async () => {
//     try {
//       setLoadingQuestions(true);
//       setError(null);

//       // Get selected skill IDs
//       const selectedSkillIds: number[] = [];
//       const currentTestClasses = getCurrentTestClasses();

//       Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//         if (categoryIds.length > 0) {
//           const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//           if (testClass) {
//             categoryIds.forEach(categoryId => {
//               const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//               if (skill) {
//                 selectedSkillIds.push(skill.id);
//               }
//             });
//           }
//         }
//       });

//       if (selectedSkillIds.length === 0) {
//         setError("يرجى اختيار فئة واحدة على الأقل لبدء التدريب");
//         return;
//       }

//       // Fetch questions for selected skills
//       const questions = await getFilteredQuestions(selectedSkillIds);

//       if (questions.length === 0) {
//         setError("لا توجد أسئلة متاحة للفئات المحددة");
//         return;
//       }

//       // Shuffle questions for variety
//       const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

//       // Create training session
//       const session: TrainingSession = {
//         questions: shuffledQuestions,
//         currentQuestionIndex: 0,
//         answers: {},
//         startTime: new Date(),
//         isActive: true
//       };

//       setTrainingSession(session);
//       setShowTrainingModal(true);
//       console.log('Training session started with', shuffledQuestions.length, 'questions');
      
//     } catch (error: any) {
//       console.error('Error starting training:', error);
//       setError(error.message || "حدث خطأ في بدء التدريب");
//     } finally {
//       setLoadingQuestions(false);
//     }
//   };

//   // Handle training completion
//   const handleTrainingComplete = (answers: Record<string, string>) => {
//     console.log('Training completed with answers:', answers);
//     // Here you can save the results, send to API, etc.
//     setShowTrainingModal(false);
//     setTrainingSession(null);
//   };

//   // Event handlers
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//     // Also reset selections
//     setSelectedCategories({});
//   };

//   // Get current test classes based on selected title
//   const getCurrentTestClasses = () => {
//     return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
//   };

//   if (loading) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-purple-600">
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span className="text-lg font-medium">جاري تحميل البيانات...</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   if (error) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-6 h-6" />
//             <span className="text-lg font-medium">{error}</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
//                   {staticConfig.header.title}
//                 </h1>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 <button 
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   type="button"
//                 >
//                   {isRefreshing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     staticConfig.header.buttons[1].text
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {staticConfig.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Subject Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {getCurrentTestClasses().map((testClass) => (
//                 <QuizSections
//                   key={testClass.id}
//                   title={testClass.value}
//                   id={testClass.id.toString()}
//                   categories={testClass.skillTestsStatistics.map((skill) => ({
//                     id: skill.id.toString(),
//                     text: skill.value,
//                     selected: skill.selected || false,
//                     questionsCount: skill.questionsCount,
//                     correctAnswersCount: skill.correctAnswersCount,
//                     ratio: skill.ratio,
//                   }))}
//                   onSelectionChange={(selectedCategoryIds) => 
//                     handleSelectionChange(testClass.id.toString(), selectedCategoryIds)
//                   }
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Updated TestInfo with dynamic data */}
//           <TestInfo 
//             testInfo={staticConfig.testInfo}
//             selectedQuestionsCount={selectedQuestionsCount}
//             selectedCategoriesCount={selectedCategoriesCount}
//             isLoading={loading}
//             onStartTraining={handleStartTraining}
//             loadingQuestions={loadingQuestions}
//             hasSelections={selectedCategoriesCount > 0}
//           />
//         </div>

//         {/* Training Modal */}
//         {showTrainingModal && trainingSession && (
//           <TrainingModal
//             session={trainingSession}
//             onClose={() => {
//               setShowTrainingModal(false);
//               setTrainingSession(null);
//             }}
//             onComplete={handleTrainingComplete}
//           />
//         )}

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//           input[type="range"]::-webkit-slider-thumb {
//             appearance: none;
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #8B5CF6;
//             cursor: pointer;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             transition: all 0.2s ease;
//           }
//           input[type="range"]::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   );
// }














// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import QuizSections from "./QuizSections";
// import {
//   // ChevronDown,
//   // ChevronUp,
//   // Route,
//   // Calendar,
//   X,
//   Star,
//   Settings,
//   // RotateCcw,
//   // Lock,
//   AlertCircle,
//   Loader2,
//   Database
// } from "lucide-react";
// import TestInfo from './TestInfo';
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { getAnalyticalStatistics,getFilteredQuestions, getAllQuestions } from '../services/api';
// import { staticConfig } from '../data/staticConfig';
// import { TestClass, Setting, TestType, Question, TestClassWithQuestions, SkillWithQuestions } from '../types/api';

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// export default function TrainingInterface() {
//   // State management
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClassWithQuestions[]>([]);
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClassWithQuestions[]>([]);
//   const [allQuestions, setAllQuestions] = useState<Question[]>([]);
//   const [allQuestionsFilter, setAllQuestionsFilter] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [questionsLoading, setQuestionsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // const [isExpanded, setIsExpanded] = useState(false);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});

//   // Selection tracking state
//   const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
//   const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
//   const [selectedCategoriesCount, setSelectedCategoriesCount] = useState(0);
//   const [availableQuestionsCount, setAvailableQuestionsCount] = useState(0);

//   // Get current title from Redux (assuming this exists)
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name) || "قدرات";

//   // Initialize settings
//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   // Fetch questions data
//   const fetchQuestions = useCallback(async () => {
//     try {
//       setQuestionsLoading(true);
//       const questionsResponse = await getAllQuestions();
      
//       if (questionsResponse.succeeded && questionsResponse.data) {
//         setAllQuestions(questionsResponse.data);
//         console.log('Questions loaded:', questionsResponse.data.length);
//       }
//     } catch (error: any) {
//       console.error('Error fetching questions:', error);
//       // Don't set main error state for questions failure, just log it
//     } finally {
//       setQuestionsLoading(false);
//     }
//   }, []);

//   useEffect(()=>{
// const fetchData = async () => {
//   try {
//     setQuestionsLoading(true);
//     const questionsResponse = await getFilteredQuestions();
    
//     if (questionsResponse) {
//       setAllQuestionsFilter(questionsResponse);
//       console.log('Questions loaded:', questionsResponse.length);
//     }
//   } catch (error: any) {
//     console.error('Error fetching questions:', error);
//     // Don't set main error state for questions failure, just log it
//   } finally {
//     setQuestionsLoading(false);
//   }
// }
// fetchData()
//   },[])
//   // Enhanced function to process test classes with questions
//   const processTestClassesWithQuestions = (testClasses: TestClass[], questions: Question[]): TestClassWithQuestions[] => {
//     const uniqueClasses = testClasses.filter((testClass, index, array) => {
//       return array.findIndex((c) => c.value === testClass.value) === index;
//     });

//     return uniqueClasses
//       .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//       .map((testClass) => {
//         const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//           return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
//         });

//         const processedSkills: SkillWithQuestions[] = uniqueSkills.map((skill) => {
//           // Find questions for this skill
//           const skillQuestions = questions.filter(q => q.skillId === skill.id);
          
//           return {
//             ...skill,
//             selected: false,
//             questionsCount: skill.questionsCount || 0,
//             correctAnswersCount: skill.correctAnswersCount || 0,
//             ratio: skill.ratio || 0,
//             questions: skillQuestions,
//             availableQuestions: skillQuestions.length,
//           };
//         });

//         return {
//           ...testClass,
//           skillTestsStatistics: processedSkills,
//           selectAll: false,
//         };
//       })
//       .filter((testClass) => testClass.skillTestsStatistics.length > 0);
//   };

//   // Calculate selected questions and categories count
//   const calculateSelectionStats = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     let totalQuestions = 0;
//     let totalCategories = 0;
//     let totalAvailableQuestions = 0;

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill) {
//               totalQuestions += skill.questionsCount || 0;
//               totalCategories += 1;
//               totalAvailableQuestions += skill.availableQuestions || 0;
//             }
//           });
//         }
//       }
//     });

//     setSelectedQuestionsCount(totalQuestions);
//     setSelectedCategoriesCount(totalCategories);
//     setAvailableQuestionsCount(totalAvailableQuestions);
//   }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

//   // Update selection stats when selections change
//   useEffect(() => {
//     calculateSelectionStats();
//   }, [calculateSelectionStats]);

//   // Handle selection changes from QuizSections
//   const handleSelectionChange = (testClassId: string, selectedCategoryIds: string[]) => {
//     setSelectedCategories(prev => ({
//       ...prev,
//       [testClassId]: selectedCategoryIds
//     }));
//   };

//   // Fetch data based on current title
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch both analytical statistics and questions in parallel
//         const [analyticsResponse, questionsResponse] = await Promise.allSettled([
//           getAnalyticalStatistics(),
//           getAllQuestions()
//         ]);

//         // Handle analytics response
//         if (analyticsResponse.status === 'fulfilled') {
//           const response = analyticsResponse.value;
          
//           if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
//             throw new Error("هيكل البيانات غير صحيح");
//           }

//           const testTypes = response.data.testTypes;
//           console.log("Analytics data is:", response.data);

//           // Handle questions response
//           let questions: Question[] = [];
//           if (questionsResponse.status === 'fulfilled' && questionsResponse.value.succeeded) {
//             questions = questionsResponse.value.data;
//             setAllQuestions(questions);
//             console.log("Questions loaded:", questions.length);
//           } else {
//             console.warn("Questions loading failed, proceeding with empty questions array");
//           }

//           // Process Qudrat data with questions
//           const qudratTestType = testTypes.find((testType: TestType) => 
//             testType?.value && testType.value.includes("Qudrat")
//           );

//           if (qudratTestType?.testClasses) {
//             const processedQudratClasses = processTestClassesWithQuestions(qudratTestType.testClasses, questions);
//             setQudratTestClasses(processedQudratClasses);
//           }

//           // Process Tahsili data with questions
//           const tahsiliTestType = testTypes.find((testType: TestType) => 
//             testType?.value && testType.value.includes("Tahsili")
//           );

//           if (tahsiliTestType?.testClasses) {
//             const processedTahsiliClasses = processTestClassesWithQuestions(tahsiliTestType.testClasses, questions);
//             setTahsiliTestClasses(processedTahsiliClasses);
//           }

//           if (!qudratTestType && !tahsiliTestType) {
//             setError("لم يتم العثور على بيانات الاختبارات");
//           }
//         } else {
//           throw new Error("فشل في تحميل البيانات التحليلية");
//         }

//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Event handlers
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await Promise.allSettled([
//       fetchQuestions(),
//       new Promise(resolve => setTimeout(resolve, 1500))
//     ]);
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//     // Also reset selections
//     setSelectedCategories({});
//   };

//   // Get current test classes based on selected title
//   const getCurrentTestClasses = () => {
//     return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
//   };

//   // Get selected questions for training
//   const getSelectedQuestions = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     const selectedQuestions: Question[] = [];

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill && skill.questions) {
//               selectedQuestions.push(...skill.questions);
//             }
//           });
//         }
//       }
//     });

//     return selectedQuestions;
//   }, [selectedCategories, currentTitle, qudratTestClasses, tahsiliTestClasses]);

//   if (loading) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-purple-600">
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span className="text-lg font-medium">جاري تحميل البيانات...</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   if (error) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-6 h-6" />
//             <span className="text-lg font-medium">{error}</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
//                   {staticConfig.header.title}
//                 </h1>
//                 {/* Questions Status Indicator */}
//                 {/* <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Database className="w-4 h-4" />
//                   <span>
//                     {questionsLoading ? (
//                       <>
//                         <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
//                         جاري تحميل الأسئلة...
//                       </>
//                     ) : (
//                       `تم تحميل ${allQuestions.length} سؤال`
//                     )}
//                   </span>
//                 </div> */}
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 <button
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing || questionsLoading}
//                   type="button"
//                 >
//                   {isRefreshing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     staticConfig.header.buttons[1].text
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {staticConfig.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Subject Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {getCurrentTestClasses().map((testClass) => (
//                 <QuizSections
//                   key={testClass.id}
//                   title={testClass.value}
//                   id={testClass.id.toString()}
//                   categories={testClass.skillTestsStatistics.map((skill) => ({
//                     id: skill.id.toString(),
//                     text: skill.value,
//                     selected: skill.selected || false,
//                     questionsCount: skill.questionsCount,
//                     correctAnswersCount: skill.correctAnswersCount,
//                     ratio: skill.ratio,
//                     availableQuestions: skill.availableQuestions,
//                   }))}
//                   onSelectionChange={(selectedCategoryIds) => 
//                     handleSelectionChange(testClass.id.toString(), selectedCategoryIds)
//                   }
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Updated TestInfo with dynamic data including questions */}
//           <TestInfo 
//             testInfo={staticConfig.testInfo}
//             selectedQuestionsCount={allQuestionsFilter.length}
//             selectedCategoriesCount={selectedCategoriesCount}
//             availableQuestionsCount={availableQuestionsCount}
//             isLoading={loading}
//             questionsLoading={questionsLoading}
//             onStartTraining={() => {
//               const selectedQuestions = getSelectedQuestions();
//               console.log('Starting training with questions:', selectedQuestions);
//               // Implement your training start logic here
//             }}
//           />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//           input[type="range"]::-webkit-slider-thumb {
//             appearance: none;
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #8B5CF6;
//             cursor: pointer;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             transition: all 0.2s ease;
//           }
//           input[type="range"]::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   );
// }














// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import QuizSections from "./QuizSections";
// import {
//   X,
//   Star,
//   Settings,
//   AlertCircle,
//   Loader2,
//   Database
// } from "lucide-react";
// import TestInfo from './TestInfo';
// import QuizInterface, { QuizResults } from './QuizInterface';
// import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
// import { getAnalyticalStatistics, getFilteredQuestions, getAllQuestions, startTest, StartTestRequest } from '../services/api';
// import { staticConfig } from '../data/staticConfig';
// import { TestClass, Setting, TestType, Question, TestClassWithQuestions, SkillWithQuestions } from '../types/api';

// interface ToggleSwitchProps {
//   isOn: boolean;
//   onToggle: () => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button"
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   );
// };

// const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
//   const getIconColor = () => {
//     switch (color) {
//       case 'red': return 'text-red-500';
//       case 'blue': return 'text-blue-500';
//       case 'green': return 'text-green-500';
//       default: return 'text-gray-500';
//     }
//   };

//   const iconProps = {
//     className: `w-4 h-4 ${getIconColor()}`
//   };

//   switch (iconName) {
//     case 'x':
//       return <X {...iconProps} />;
//     case 'star':
//       return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
//     case 'settings':
//       return <Settings {...iconProps} />;
//     default:
//       return null;
//   }
// };

// export default function TrainingInterface() {
//   // State management
//   const [qudratTestClasses, setQudratTestClasses] = useState<TestClassWithQuestions[]>([]);
//   const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClassWithQuestions[]>([]);
//   const [allQuestions, setAllQuestions] = useState<Question[]>([]);
//   const [allQuestionsFilter, setAllQuestionsFilter] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [questionsLoading, setQuestionsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});

//   // Quiz state
//   const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [startingTest, setStartingTest] = useState(false);

//   // Selection tracking state
//   const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
//   const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
//   const [selectedCategoriesCount, setSelectedCategoriesCount] = useState(0);
//   const [availableQuestionsCount, setAvailableQuestionsCount] = useState(0);

//   // Get current title from Redux (assuming this exists)
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name) || "قدرات";

//   // Initialize settings
//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
//   }, []);

//   // Fetch questions data
//   const fetchQuestions = useCallback(async () => {
//     try {
//       setQuestionsLoading(true);
//       const questionsResponse = await getAllQuestions();
      
//       if (questionsResponse.succeeded && questionsResponse.data) {
//         setAllQuestions(questionsResponse.data);
//         console.log('Questions loaded:', questionsResponse.data.length);
//       }
//     } catch (error: any) {
//       console.error('Error fetching questions:', error);
//     } finally {
//       setQuestionsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setQuestionsLoading(true);
//         const questionsResponse = await getFilteredQuestions();
        
//         if (questionsResponse) {
//           setAllQuestionsFilter(questionsResponse);
//           console.log('Questions loaded:', questionsResponse.length);
//         }
//       } catch (error: any) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setQuestionsLoading(false);
//       }
//     }
//     fetchData()
//   }, [])

//   // Enhanced function to process test classes with questions
//   const processTestClassesWithQuestions = (testClasses: TestClass[], questions: Question[]): TestClassWithQuestions[] => {
//     const uniqueClasses = testClasses.filter((testClass, index, array) => {
//       return array.findIndex((c) => c.value === testClass.value) === index;
//     });

//     return uniqueClasses
//       .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
//       .map((testClass) => {
//         const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
//           return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
//         });

//         const processedSkills: SkillWithQuestions[] = uniqueSkills.map((skill) => {
//           const skillQuestions = questions.filter(q => q.skillId === skill.id);
          
//           return {
//             ...skill,
//             selected: false,
//             questionsCount: skill.questionsCount || 0,
//             correctAnswersCount: skill.correctAnswersCount || 0,
//             ratio: skill.ratio || 0,
//             questions: skillQuestions,
//             availableQuestions: skillQuestions.length,
//           };
//         });

//         return {
//           ...testClass,
//           skillTestsStatistics: processedSkills,
//           selectAll: false,
//         };
//       })
//       .filter((testClass) => testClass.skillTestsStatistics.length > 0);
//   };

//   // Calculate selected questions and categories count
//   const calculateSelectionStats = useCallback(() => {
//     const currentTestClasses = getCurrentTestClasses();
//     let totalQuestions = 0;
//     let totalCategories = 0;
//     let totalAvailableQuestions = 0;

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
//         if (testClass) {
//           categoryIds.forEach(categoryId => {
//             const skill = testClass.skillTestsStatistics.find(s => s.id.toString() === categoryId);
//             if (skill) {
//               totalQuestions += skill.questionsCount || 0;
//               totalCategories += 1;
//               totalAvailableQuestions += skill.availableQuestions || 0;
//             }
//           });
//         }
//       }
//     });

//     setSelectedQuestionsCount(totalQuestions);
//     setSelectedCategoriesCount(totalCategories);
//     setAvailableQuestionsCount(totalAvailableQuestions);
//   }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

//   // Update selection stats when selections change
//   useEffect(() => {
//     calculateSelectionStats();
//   }, [calculateSelectionStats]);

//   // Handle selection changes from QuizSections
//   const handleSelectionChange = (testClassId: string, selectedCategoryIds: string[]) => {
//     setSelectedCategories(prev => ({
//       ...prev,
//       [testClassId]: selectedCategoryIds
//     }));
//   };

//   // Fetch data based on current title
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [analyticsResponse, questionsResponse] = await Promise.allSettled([
//           getAnalyticalStatistics(),
//           getAllQuestions()
//         ]);

//         if (analyticsResponse.status === 'fulfilled') {
//           const response = analyticsResponse.value;
          
//           if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
//             throw new Error("هيكل البيانات غير صحيح");
//           }

//           const testTypes = response.data.testTypes;
//           console.log("Analytics data is:", response.data);

//           let questions: Question[] = [];
//           if (questionsResponse.status === 'fulfilled' && questionsResponse.value.succeeded) {
//             questions = questionsResponse.value.data;
//             setAllQuestions(questions);
//             console.log("Questions loaded:", questions.length);
//           } else {
//             console.warn("Questions loading failed, proceeding with empty questions array");
//           }

//           const qudratTestType = testTypes.find((testType: TestType) => 
//             testType?.value && testType.value.includes("Qudrat")
//           );

//           if (qudratTestType?.testClasses) {
//             const processedQudratClasses = processTestClassesWithQuestions(qudratTestType.testClasses, questions);
//             setQudratTestClasses(processedQudratClasses);
//           }

//           const tahsiliTestType = testTypes.find((testType: TestType) => 
//             testType?.value && testType.value.includes("Tahsili")
//           );

//           if (tahsiliTestType?.testClasses) {
//             const processedTahsiliClasses = processTestClassesWithQuestions(tahsiliTestType.testClasses, questions);
//             setTahsiliTestClasses(processedTahsiliClasses);
//           }

//           if (!qudratTestType && !tahsiliTestType) {
//             setError("لم يتم العثور على بيانات الاختبارات");
//           }
//         } else {
//           throw new Error("فشل في تحميل البيانات التحليلية");
//         }

//       } catch (error: any) {
//         console.error('Error fetching data:', error);
//         setError(error.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Event handlers
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await Promise.allSettled([
//       fetchQuestions(),
//       new Promise(resolve => setTimeout(resolve, 1500))
//     ]);
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     staticConfig.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//     setSelectedCategories({});
//   };

//   // Get current test classes based on selected title
//   const getCurrentTestClasses = () => {
//     return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
//   };

//   // Get selected skill IDs
//   const getSelectedSkillIds = useCallback((): number[] => {
//     const skillIds: number[] = [];

//     Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
//       if (categoryIds.length > 0) {
//         categoryIds.forEach(categoryId => {
//           skillIds.push(parseInt(categoryId));
//         });
//       }
//     });

//     return skillIds;
//   }, [selectedCategories]);

//   // Handle starting training
//   const handleStartTraining = async () => {
//     try {
//       setStartingTest(true);
      
//       const skillIds = getSelectedSkillIds();
//       if (skillIds.length === 0) {
//         alert('يرجى اختيار المهارات أولاً');
//         return;
//       }

//       const requestData: StartTestRequest = {
//         skillIds: skillIds,
//         count: allQuestionsFilter.length || 20 // Use filtered questions count or default to 20
//       };

//       console.log('Starting test with request:', requestData);

//       const response = await startTest(requestData);
      
//       if (response.succeeded && response.data) {
//         setQuizQuestions(response.data);
//         setShowQuiz(true);
//         console.log('Quiz started with questions:', response.data);
//       } else {
//         throw new Error(response.message || 'فشل في بدء الاختبار');
//       }
//     } catch (error: any) {
//       console.error('Error starting training:', error);
//       alert(`حدث خطأ في بدء التدريب: ${error.message}`);
//     } finally {
//       setStartingTest(false);
//     }
//   };

//   // Handle quiz completion
//   const handleQuizComplete = (results: QuizResults) => {
//     console.log('Quiz completed with results:', results);
//     setShowQuiz(false);
//     setQuizQuestions([]);
//     // You can add logic here to save results, show detailed analysis, etc.
//   };

//   // Handle quiz exit
//   const handleQuizExit = () => {
//     setShowQuiz(false);
//     setQuizQuestions([]);
//   };

//   if (showQuiz) {
//     return (
//       <QuizInterface
//         questions={quizQuestions}
//         onComplete={handleQuizComplete}
//         onExit={handleQuizExit}
//       />
//     );
//   }

//   if (loading) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-purple-600">
//             <Loader2 className="w-6 h-6 animate-spin" />
//             <span className="text-lg font-medium">جاري تحميل البيانات...</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   if (error) {
//     return (
//       <DashStudent>
//         <div className="flex items-center justify-center min-h-64">
//           <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-6 h-6" />
//             <span className="text-lg font-medium">{error}</span>
//           </div>
//         </div>
//       </DashStudent>
//     );
//   }

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
//                   {staticConfig.header.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Database className="w-4 h-4" />
//                   <span>
//                     {questionsLoading ? (
//                       <>
//                         <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
//                         جاري تحميل الأسئلة...
//                       </>
//                     ) : (
//                       `تم تحميل ${allQuestionsFilter.length} سؤال`
//                     )}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 <button
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing || questionsLoading}
//                   type="button"
//                 >
//                   {isRefreshing ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     staticConfig.header.buttons[1].text
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {staticConfig.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Subject Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {getCurrentTestClasses().map((testClass) => (
//                 <QuizSections
//                   key={testClass.id}
//                   title={testClass.value}
//                   id={testClass.id.toString()}
//                   categories={testClass.skillTestsStatistics.map((skill) => ({
//                     id: skill.id.toString(),
//                     text: skill.value,
//                     selected: skill.selected || false,
//                     questionsCount: skill.questionsCount,
//                     correctAnswersCount: skill.correctAnswersCount,
//                     ratio: skill.ratio,
//                     availableQuestions: skill.availableQuestions,
//                   }))}
//                   onSelectionChange={(selectedCategoryIds) => 
//                     handleSelectionChange(testClass.id.toString(), selectedCategoryIds)
//                   }
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Updated TestInfo with dynamic data including questions */}
//           <TestInfo 
//             testInfo={staticConfig.testInfo}
//             selectedQuestionsCount={allQuestionsFilter.length}
//             selectedCategoriesCount={selectedCategoriesCount}
//             availableQuestionsCount={availableQuestionsCount}
//             isLoading={loading || startingTest}
//             questionsLoading={questionsLoading || startingTest}
//             onStartTraining={handleStartTraining}
//           />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//           input[type="range"]::-webkit-slider-thumb {
//             appearance: none;
//             width: 24px;
//             height: 24px;
//             border-radius: 50%;
//             background: #8B5CF6;
//             cursor: pointer;
//             box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//             transition: all 0.2s ease;
//           }
//           input[type="range"]::-webkit-slider-thumb:hover {
//             transform: scale(1.1);
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   );
// }
















"use client";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import { refreshAuthToken } from "@/app/api/refreshAuthToken"
import QuizSections from "./QuizSections";
import {
  X,
  Star,
  Settings,
  AlertCircle,
  Loader2,
  Database
} from "lucide-react";
import TestInfo from './TestInfo';
import QuizInterface, { QuizResults } from './QuizInterface';
import DashStudent from "@/app/dashboard/dashStudent/dashStudent"
import { getAnalyticalStatistics, getFilteredQuestions, getAllQuestions, startTest, StartTestRequest } from '../services/api';
import { staticConfig } from '../data/staticConfig';
import { TestClass , TestType, TestClassWithQuestions, SkillWithQuestions } from "../types/api"
import {  Question } from '../services/api';

interface Setting {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultValue: boolean;
}

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        isOn ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      type="button"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const IconComponent: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
  const getIconColor = () => {
    switch (color) {
      case 'red': return 'text-red-500';
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const iconProps = {
    className: `w-4 h-4 ${getIconColor()}`
  };

  switch (iconName) {
    case 'x':
      return <X {...iconProps} />;
    case 'star':
      return <Star {...iconProps} className={`w-4 h-4 ${getIconColor()} fill-current`} />;
    case 'settings':
      return <Settings {...iconProps} />;
    default:
      return null;
  }
};

export default function TrainingInterface() {
  // State management
  const [qudratTestClasses, setQudratTestClasses] = useState<TestClassWithQuestions[]>([]);
  const [tahsiliTestClasses, setTahsiliTestClasses] = useState<TestClassWithQuestions[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allQuestionsFilter, setAllQuestionsFilter] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentValue, setCurrentValue] = useState(49);
  const [currentVale, setCurrentVale] = useState(50);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [startingTest, setStartingTest] = useState(false);

  // Selection tracking state
  const [selectedCategories, setSelectedCategories] = useState<Record<string, string[]>>({});
  const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
  const [selectedCategoriesCount, setSelectedCategoriesCount] = useState(0);
  const [availableQuestionsCount, setAvailableQuestionsCount] = useState(0);

  // Get current title from Redux (assuming this exists)
  const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name) || "قدرات";

  // Initialize settings
  useEffect(() => {
    const initialSettings: Record<string, boolean> = {};
    staticConfig.settings.forEach((setting) => {
      initialSettings[setting.id] = setting.defaultValue;
    });
    setSettings(initialSettings);
  }, []);

  // Fetch questions data
  const fetchQuestions = useCallback(async () => {
    try {
      setQuestionsLoading(true);
      const questionsResponse = await getAllQuestions();
      
      if (questionsResponse.succeeded && questionsResponse.data) {
        setAllQuestions(questionsResponse.data);
        console.log('Questions loaded:', questionsResponse.data.length);
      }
    } catch (error: any) {
      console.error('Error fetching questions:', error);
    } finally {
      setQuestionsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setQuestionsLoading(true);
        const questionsResponse = await getFilteredQuestions();
        
        if (questionsResponse) {
          setAllQuestionsFilter(questionsResponse);
          console.log('Questions loaded:', questionsResponse.length);
        }
      } catch (error: any) {
        console.error('Error fetching questions:', error);
      } finally {
        setQuestionsLoading(false);
      }
    }
    fetchData()
  }, [])

  // Enhanced function to process test classes with questions
  const processTestClassesWithQuestions = (testClasses: TestClass[], questions: Question[]): TestClassWithQuestions[] => {
    const uniqueClasses = testClasses.filter((testClass, index, array) => {
      return array.findIndex((c) => c.value === testClass.value) === index;
    });

    return uniqueClasses
      .filter((testClass) => testClass.skillTestsStatistics && Array.isArray(testClass.skillTestsStatistics))
      .map((testClass) => {
        const uniqueSkills = testClass.skillTestsStatistics.filter((skill, index, array) => {
          return skill?.value && array.findIndex((s) => s.value === skill.value) === index;
        });

        const processedSkills: SkillWithQuestions[] = uniqueSkills.map((skill) => {
          const skillQuestions = questions.filter(q => q.skillId === skill.id);
          
          return {
            ...skill,
            selected: false,
            questionsCount: skill.questionsCount || 0,
            correctAnswersCount: skill.correctAnswersCount || 0,
            ratio: skill.ratio || 0,
            questions: skillQuestions,
            availableQuestions: skillQuestions.length,
          };
        });

        return {
          ...testClass,
          skillTestsStatistics: processedSkills,
          selectAll: false,
        };
      })
      .filter((testClass) => testClass.skillTestsStatistics.length > 0);
  };

  // Calculate selected questions and categories count
  const calculateSelectionStats = useCallback(() => {
    const currentTestClasses = getCurrentTestClasses();
    let totalQuestions = 0;
    let totalCategories = 0;
    let totalAvailableQuestions = 0;

    Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
      if (categoryIds.length > 0) {
        const testClass = currentTestClasses.find(tc => tc.id.toString() === testClassId);
        if (testClass) {
          categoryIds.forEach(categoryId => {
            const skill = testClass.skillTestsStatistics.find((s:any)=> s.id.toString() === categoryId);
            if (skill) {
              totalQuestions += skill.questionsCount || 0;
              totalCategories += 1;
              totalAvailableQuestions += skill.availableQuestions || 0;
            }
          });
        }
      }
    });

    setSelectedQuestionsCount(totalQuestions);
    setSelectedCategoriesCount(totalCategories);
    setAvailableQuestionsCount(totalAvailableQuestions);
  }, [selectedCategories, qudratTestClasses, tahsiliTestClasses, currentTitle]);

  // Update selection stats when selections change
  useEffect(() => {
    calculateSelectionStats();
  }, [calculateSelectionStats]);

  // Handle selection changes from QuizSections
  const handleSelectionChange = (testClassId: string, selectedCategoryIds: string[]) => {
    setSelectedCategories(prev => ({
      ...prev,
      [testClassId]: selectedCategoryIds
    }));
  };

  // Fetch data based on current title
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [analyticsResponse, questionsResponse] = await Promise.allSettled([
          getAnalyticalStatistics(),
          getAllQuestions()
        ]);

        if (analyticsResponse.status === 'fulfilled') {
          const response = analyticsResponse.value;
          
          if (!response.data?.testTypes || !Array.isArray(response.data.testTypes)) {
            throw new Error("هيكل البيانات غير صحيح");
          }

          const testTypes = response.data.testTypes;
          console.log("Analytics data is:", response.data);

          let questions: Question[] = [];
          if (questionsResponse.status === 'fulfilled' && questionsResponse.value.succeeded) {
            questions = questionsResponse.value.data;
            setAllQuestions(questions);
            console.log("Questions loaded:", questions.length);
          } else {
            console.warn("Questions loading failed, proceeding with empty questions array");
          }

          const qudratTestType = testTypes.find((testType: TestType) => 
            testType?.value && testType.value.includes("Qudrat")
          );

          if (qudratTestType?.testClasses) {
            const processedQudratClasses = processTestClassesWithQuestions(qudratTestType.testClasses, questions);
            setQudratTestClasses(processedQudratClasses);
          }

          const tahsiliTestType = testTypes.find((testType: TestType) => 
            testType?.value && testType.value.includes("Tahsili")
          );

          if (tahsiliTestType?.testClasses) {
            const processedTahsiliClasses = processTestClassesWithQuestions(tahsiliTestType.testClasses, questions);
            setTahsiliTestClasses(processedTahsiliClasses);
          }

          if (!qudratTestType && !tahsiliTestType) {
            setError("لم يتم العثور على بيانات الاختبارات");
          }
        } else {
          throw new Error("فشل في تحميل البيانات التحليلية");
        }

      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || "حدث خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Event handlers
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.allSettled([
      fetchQuestions(),
      new Promise(resolve => setTimeout(resolve, 1500))
    ]);
    setIsRefreshing(false);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(parseInt(e.target.value));
  };

  const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVale(parseInt(e.target.value));
  };

  const toggleSetting = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetSettings = () => {
    const resetValues: Record<string, boolean> = {};
    staticConfig.settings.forEach((setting) => {
      resetValues[setting.id] = setting.defaultValue;
    });
    setSettings(resetValues);
    setSelectedCategories({});
  };

  // Get current test classes based on selected title
  const getCurrentTestClasses = () => {
    return currentTitle === "قدرات" ? qudratTestClasses : tahsiliTestClasses;
  };

  // Get selected skill IDs
  const getSelectedSkillIds = useCallback((): number[] => {
    const skillIds: number[] = [];

    Object.entries(selectedCategories).forEach(([testClassId, categoryIds]) => {
      if (categoryIds.length > 0) {
        categoryIds.forEach(categoryId => {
          skillIds.push(parseInt(categoryId));
        });
      }
    });

    return skillIds;
  }, [selectedCategories]);

  // Handle starting training
  const handleStartTraining = async () => {
    try {
      setStartingTest(true);
      
      const skillIds = getSelectedSkillIds();
      console.log('Selected skill IDs:', skillIds);

      if (skillIds.length === 0) {
        alert('يرجى اختيار المهارات أولاً');
        return;
      }

      const requestData: StartTestRequest = {
        skillIds: skillIds,
        count: allQuestionsFilter.length // Use filtered questions count or default to 20
      };

      console.log('Starting test with request:', requestData);

      const response = await startTest(requestData);
      
      if (response.succeeded && response.data) {
        setQuizQuestions(response.data);
        setShowQuiz(true);
        console.log('Quiz started with questions:', response.data);
      } else {
        throw new Error(response.message || 'فشل في بدء الاختبار');
      }
    } catch (error: any) {
       let errorMessage = "Unknown error occurred"
      const refreshSuccess = await refreshAuthToken()
          
                if (axios.isAxiosError(error)) {
                  if (error.response) {
                    switch (error.response.status) {
                      case 401:
                        if (refreshSuccess) {
                          return handleStartTraining()
                        }
                        errorMessage = "Authentication expired. Please log in again."
                        window.location.href = "/login"
                        break
                      case 403:
                        if (refreshSuccess) {
                          return handleStartTraining()
                        }
                        errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
                        window.location.href = "/login"
                        break
                      case 404:
                        errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
                        break
                      case 500:
                        errorMessage = "Server error (500). Please try again later."
                        break
                      default:
                        errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
                    }
                  } else if (error.request) {
                    errorMessage = "Network error. Please check your internet connection."
                  } else {
                    errorMessage = `Request error: ${error.message}`
                  }
                } else { 
                  errorMessage = error instanceof Error ? error.message : "Unknown error"
                }
          
                console.error("Error fetching data:", error)
    } finally {
      setStartingTest(false);
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (results: QuizResults) => {
    console.log('Quiz completed with results:', results);
    setShowQuiz(false);
    setQuizQuestions([]);
    // You can add logic here to save results, show detailed analysis, etc.
  };

  // Handle quiz exit
  const handleQuizExit = () => {
    setShowQuiz(false);
    setQuizQuestions([]);
  };

  if (showQuiz) {
    return (
      <QuizInterface
        questions={quizQuestions}
        onComplete={handleQuizComplete}
        onExit={handleQuizExit}
      />
    );
  }

  if (loading) {
    return (
      <DashStudent>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center gap-3 text-purple-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-lg font-medium">جاري تحميل البيانات...</span>
          </div>
        </div>
      </DashStudent>
    );
  }

  if (error) {
    return (
      <DashStudent>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="w-6 h-6" />
            <span className="text-lg font-medium">{error}</span>
          </div>
        </div>
      </DashStudent>
    );
  }

  return (
    <DashStudent>
      <div className="p-4" dir="rtl">
        <div className="mx-auto">
          {/* Main Container */}
          <div className="bg-white p-4 md:p-2">
            {/* Header */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <div className="order-2 lg:order-1">
                <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">
                  {staticConfig.header.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Database className="w-4 h-4" />
                  <span>
                    {questionsLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
                        جاري تحميل الأسئلة...
                      </>
                    ) : (
                      `تم تحميل ${allQuestionsFilter.length} سؤال`
                    )}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  onClick={handleRefresh}
                  disabled={isRefreshing || questionsLoading}
                  type="button"
                >
                  {isRefreshing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    staticConfig.header.buttons[1].text
                  )}
                </button>
              </div>
            </div>

            {/* Subtitle and Description */}
            <div className="text-right mb-8">
              {staticConfig.header.description.map((text, index) => (
                <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCurrentTestClasses().map((testClass) => (
                <QuizSections
                  key={testClass.id}
                  title={testClass.value}
                  id={testClass.id.toString()}
                  categories={testClass.skillTestsStatistics.map((skill) => ({
                    id: skill.id.toString(),
                    text: skill.value,
                    selected: skill.selected || false,
                    questionsCount: skill.questionsCount,
                    correctAnswersCount: skill.correctAnswersCount,
                    ratio: skill.ratio,
                    availableQuestions: skill.availableQuestions,
                  }))}
                  onSelectionChange={(selectedCategoryIds) => 
                    handleSelectionChange(testClass.id.toString(), selectedCategoryIds)
                  }
                />
              ))}
            </div>
          </div>

          {/* Updated TestInfo with dynamic data including questions */}
          <TestInfo 
            testInfo={staticConfig.testInfo}
            selectedQuestionsCount={allQuestionsFilter.length}
            selectedCategoriesCount={selectedCategoriesCount}
            availableQuestionsCount={availableQuestionsCount}
            isLoading={loading || startingTest}
            questionsLoading={questionsLoading || startingTest}
            onStartTraining={handleStartTraining}
          />
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
          * {
            font-family: 'Tajawal', sans-serif;
          }
          input[type="checkbox"] {
            appearance: none;
            -webkit-appearance: none;
            background-color: white;
          }
          input[type="checkbox"]:checked {
            background-color: #10b981;
            border-color: #10b981;
          }
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #8B5CF6;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </DashStudent>
  );
}