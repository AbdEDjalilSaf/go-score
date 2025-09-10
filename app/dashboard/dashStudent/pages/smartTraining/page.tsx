// "use client"

// import { useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import Link from "next/link"
// import QuizSections from "./quiz-sections"
// import { ChevronDown, ChevronUp, Route, Calendar, X, Star, Settings, RotateCcw, Lock } from "lucide-react"
// import data from "./data.json"
// import TestInfo from './test-info'
// import DashStudent from "../../dashStudent"


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
//     <DashStudent>
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//      type="button">
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
//           isOn ? '-translate-x-6' : '-translate-x-1'
//         }`}
//       />
//     </button>
//     </DashStudent>
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


// interface Subcategory {
//   id: string
//   name: string
// }

// interface Subject {
//   id: string
//   name: string
//   selected: boolean
//   available: boolean
//   status?: string
//   subcategories: Subcategory[]
// }

// interface TestInfo {
//   title: string
//   expectedTime: string
//   numberOfQuestions: number
//   startButtonText: string
//   labels: {
//     expectedTime: string
//     numberOfQuestions: string
//   }
// }


// interface AppData {
//   remainingAttempts: number
//   subjects: Subject[]
//   testInfo: TestInfo
// }


// export default function TrainingInterface() {
//   const [quizData, setQuizData] = useState(data)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);


//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };


//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     data.settings.forEach((setting: Setting) => {
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
//     data.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };


  
//   return (
//     <DashStudent>
//       <div className=" p-4" dir="rtl">
//       <div className=" mx-auto">
//         {/* Main Container */}
//         <div className="bg-white  p-4 md:p-2">
//           {/* Header */}
//           <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//             <div className="order-2 lg:order-1">
//               <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">{data.header.title}</h1>
//             </div>
//             <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//               <Link href="/dashboard/dashStudent/smartTest">
//               <div className="flex justify-center">
//               <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">ابدأ التدريب</button>
//               </div>
//               </Link>

//               <button className="px-4 py-2  bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors" type="button">
//                 {data.header.buttons[1].text}
//               </button>
//             </div>
//           </div>

//           {/* Subtitle and Description */}
//           <div className="text-right mb-8">
//             {/* <div className="flex items-center justify-end gap-2 mb-4">
//               <span className="text-orange-500 font-medium">{data.header.subtitle}</span>
//               <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//             </div> */}
//             {data.header.description.map((text, index) => (
//               <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                 {text}
//               </p>
//             ))}
//           </div>

                          
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//   {currentTitle === "قدرات" ? (
//     <>
//       <QuizSections
//         title={quizData.quantitativeSection.title}
//         categories={quizData.quantitativeSection.categories.map((cat: any) => ({
//           ...cat,
//           text: cat.text ?? cat.name ?? "",
//           selected: cat.selected ?? false,
//         }))}
//         id={quizData.quantitativeSection.id}
//       />
//       <QuizSections
//         title={quizData.verbalSection.title}
//         categories={quizData.verbalSection.categories.map((cat: any) => ({
//           ...cat,
//           text: cat.text ?? cat.name ?? "",
//           selected: cat.selected ?? false,
//         }))}
//         id={quizData.verbalSection.id}
//       />
//     </>
//   ) : (
//     // Subject Grid
//     <>
//       {data.subjects.map((subject) => (
//         <QuizSections
//           key={subject.id}
//           title={subject.name}
//           id={subject.id}
//           categories={subject.subcategories.map((subcat) => ({
//             id: subcat.id,
//             text: subcat.name,
//             selected: subject.selected,
//           }))}
//         />
//       ))}
//        </>
//   )}
// </div>
      
// <div className="bg-white mt-7 rounded-lg border border-gray-200 overflow-hidden">
//       <div
//         className="flex justify-between items-center p-4 bg-purple-100"  
//       >
//         <div className="flex items-center gap-2">
//             <Route />
//           <h2 className="bg-purple-100">
//             خيارات متقدمة
//           </h2>
//           {/* <span className="text-gray-500 text-sm">  لم تكمل التدريب في {section.totalQuestions} اقسام </span> */}
//         </div>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="bg-purple-100"
//           type="button"
//         >
//           {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//         </button>
//       </div>

//       {isExpanded && (
//         <>

//           {/* Card Content */}
//           <div className="p-6 space-y-6">
//             {/* Last Updated Info */}
//             <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//               <Calendar className="w-4 h-4 text-purple-600" />
//               <span className="text-sm font-medium">
//                 {data.questionsBank.lastUpdated}
//               </span>
//             </div>
//             <div className="flex gap-4 w-full  flex-col-reverse md:flex-row-reverse">

//       <div>
//         {/* Main Settings Card */}
//         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//           {/* Header */}
//           <div className="bg-purple-700 p-4 text-center">
//             <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//               <Lock className="w-4 h-4 text-white" />
//             </div>
//             <h1 className="text-lg font-semibold text-white">
//               {data.title}
//             </h1>
//           </div>

//           {/* Settings List */}
//           <div className="p-4">
//             {data.settings.map((setting: Setting) => (
//               <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
//                 <div className="flex items-center gap-3 flex-1">
//                   <IconComponent iconName={setting.icon} color={setting.color} />
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900 mb-1">
//                       {setting.label}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {setting.description}
//                     </div>
//                   </div>
//                 </div>
//                 <ToggleSwitch
//                   isOn={settings[setting.id] || false}
//                   onToggle={() => toggleSetting(setting.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reset Button */}
//         <button
//           onClick={resetSettings}
//           className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//           type="button"
//         >
//           <RotateCcw className="w-4 h-4" />
//           {data.resetButton}
//         </button>
//       </div>
    
           

// <div className=" w-[100%] md:w-[70%]">
//             {/* Slider Section */}
//             <div className="space-y-4 md:h-[39%] border-[1px] mb-6 rounded-lg p-4 border-purple-700">
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                 <span>{data.questionsBank.filterLabels.newest}</span>
//                 <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                   <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                   <span className="text-purple-600">سؤال</span>
//                 </div>
//                 <span>{data.questionsBank.filterLabels.oldest}</span>
//               </div>
              
//               {/* Custom Slider */}
//               <div className="relative">
//                 <input
//                   type="range"
//                   min="1"
//                   max="100"
//                   value={currentValue}
//                   onChange={handleSliderChange}
//                   className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 slider-thumb:rounded-full slider-thumb:bg-purple-600 slider-thumb:cursor-pointer slider-thumb:shadow-lg slider-thumb:transition-all slider-thumb:duration-200 hover:slider-thumb:scale-110"
//                   style={{
//                     background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentValue}%, #E5E7EB ${currentValue}%, #E5E7EB 100%)`
//                   }}
//                 />
//               </div>
//             </div>



//   <div className="space-y-4 md:h-[39%] border-[1px] rounded-lg p-4 border-purple-700 ">
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                 <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                   <span className="text-purple-800  text-lg">صعوبة الأسئلة</span>
//                 </div>
//               </div>
              
//               {/* Custom Slider */}
//               <div className="relative">
//                 <input
//                   type="range"
//                   min="1"
//                   max="100"
//                   value={currentVale}
//                   onChange={handleSliderHardChange}
//                   className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 slider-thumb:rounded-full slider-thumb:bg-purple-600 slider-thumb:cursor-pointer slider-thumb:shadow-lg slider-thumb:transition-all slider-thumb:duration-200 hover:slider-thumb:scale-110"
//                   style={{
//                     background: `linear-gradient(to left, #8B5CF6 0%, #8B5CF6 ${currentVale}%, #E5E7EB ${currentVale}%, #E5E7EB 100%)`
//                   }}
//                 />
//               </div>
//             </div>
//           {/* </div> */}
// </div>
// </div>
//  </div>

//         </>
//       )}
//     </div> 


//         </div>
//           <TestInfo testInfo={data.testInfo} />
//       </div>

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
//         * {
//           font-family: 'Tajawal', sans-serif;
//         }
        
//         /* Custom checkbox styling */
//         input[type="checkbox"] {
//           appearance: none;
//           -webkit-appearance: none;
//           background-color: white;
//         }
        
//         input[type="checkbox"]:checked {
//           background-color: #10b981;
//           border-color: #10b981;
//         }
//       `}</style>
//     </div>
//     </DashStudent>
//   )
// }

















import React from 'react';
import TrainingInterface from './components/TrainingInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TrainingInterface />
    </div>
  );
}

export default App;






// "use client"

// import { useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import Link from "next/link"
// import QuizSections from "./quiz-sections"
// import { ChevronDown, ChevronUp, Route, Calendar, X, Star, Settings, RotateCcw, Lock, RefreshCw } from "lucide-react"
// import data from "./data.json"
// import TestInfo from './test-info'
// import DashStudent from "../../dashStudent"
// import StatisticsCard from './components/StatisticsCard'
// import { statisticsApi } from './services/api'
// import { StatisticsState } from './types/api'

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

// interface Subcategory {
//   id: string
//   name: string
// }

// interface Subject {
//   id: string
//   name: string
//   selected: boolean
//   available: boolean
//   status?: string
//   subcategories: Subcategory[]
// }

// interface TestInfo {
//   title: string
//   expectedTime: string
//   numberOfQuestions: number
//   startButtonText: string
//   labels: {
//     expectedTime: string
//     numberOfQuestions: string
//   }
// }

// interface AppData {
//   remainingAttempts: number
//   subjects: Subject[]
//   testInfo: TestInfo
// }

// export default function TrainingInterface() {
//   const [quizData, setQuizData] = useState(data)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   // Statistics state
//   const [statistics, setStatistics] = useState<StatisticsState>({
//     data: null,
//     loading: false,
//     error: null
//   });
  
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);

//   // Fetch statistics data
//   const fetchStatistics = async () => {
//     setStatistics(prev => ({ ...prev, loading: true, error: null }));
    
//     try {
//       const data = await statisticsApi.getAnalyticalStatistics();
//       setStatistics({
//         data,
//         loading: false,
//         error: null
//       });
//     } catch (error) {
//       console.error('Failed to fetch statistics:', error);
//       setStatistics({
//         data: null,
//         loading: false,
//         error: error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل الإحصائيات'
//       });
//     }
//   };

//   // Load statistics on component mount
//   useEffect(() => {
//     fetchStatistics();
//   }, []);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Also refresh statistics
//     await fetchStatistics();
    
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     data.settings.forEach((setting: Setting) => {
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
//     data.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">{data.header.title}</h1>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 <Link href="/dashboard/dashStudent/smartTest">
//                   <div className="flex justify-center">
//                     <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">
//                       ابدأ التدريب
//                     </button>
//                   </div>
//                 </Link>

//                 <button 
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
//                   type="button"
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                   {isRefreshing ? 'جاري التحديث...' : data.header.buttons[1].text}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {data.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Statistics Card */}
//             <div className="mb-8">
//               <StatisticsCard
//                 testTypes={statistics.data?.testTypes || []}
//                 loading={statistics.loading}
//                 error={statistics.error}
//                 onRefresh={fetchStatistics}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {currentTitle === "قدرات" ? (
//                 <>
//                   <QuizSections
//                     title={quizData.quantitativeSection.title}
//                     categories={quizData.quantitativeSection.categories.map((cat: any) => ({
//                       ...cat,
//                       text: cat.text ?? cat.name ?? "",
//                       selected: cat.selected ?? false,
//                     }))}
//                     id={quizData.quantitativeSection.id}
//                   />
//                   <QuizSections
//                     title={quizData.verbalSection.title}
//                     categories={quizData.verbalSection.categories.map((cat: any) => ({
//                       ...cat,
//                       text: cat.text ?? cat.name ?? "",
//                       selected: cat.selected ?? false,
//                     }))}
//                     id={quizData.verbalSection.id}
//                   />
//                 </>
//               ) : (
//                 // Subject Grid
//                 <>
//                   {data.subjects.map((subject) => (
//                     <QuizSections
//                       key={subject.id}
//                       title={subject.name}
//                       id={subject.id}
//                       categories={subject.subcategories.map((subcat) => ({
//                         id: subcat.id,
//                         text: subcat.name,
//                         selected: subject.selected,
//                       }))}
//                     />
//                   ))}
//                 </>
//               )}
//             </div>

//             <div className="bg-white mt-7 rounded-lg border border-gray-200 overflow-hidden">
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
//                   {/* Card Content */}
//                   <div className="p-6 space-y-6">
//                     {/* Last Updated Info */}
//                     <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                       <Calendar className="w-4 h-4 text-purple-600" />
//                       <span className="text-sm font-medium">
//                         {data.questionsBank.lastUpdated}
//                       </span>
//                     </div>
                    
//                     <div className="flex gap-4 w-full flex-col-reverse md:flex-row-reverse">
//                       <div>
//                         {/* Main Settings Card */}
//                         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                           {/* Header */}
//                           <div className="bg-purple-700 p-4 text-center">
//                             <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                               <Lock className="w-4 h-4 text-white" />
//                             </div>
//                             <h1 className="text-lg font-semibold text-white">
//                               {data.title}
//                             </h1>
//                           </div>

//                           {/* Settings List */}
//                           <div className="p-4">
//                             {data.settings.map((setting: Setting) => (
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

//                         {/* Reset Button */}
//                         <button
//                           onClick={resetSettings}
//                           className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//                           type="button"
//                         >
//                           <RotateCcw className="w-4 h-4" />
//                           {data.resetButton}
//                         </button>
//                       </div>

//                       <div className="w-[100%] md:w-[70%]">
//                         {/* Slider Section */}
//                         <div className="space-y-4 md:h-[39%] border-[1px] mb-6 rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <span>{data.questionsBank.filterLabels.newest}</span>
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                               <span className="text-purple-600">سؤال</span>
//                             </div>
//                             <span>{data.questionsBank.filterLabels.oldest}</span>
//                           </div>

//                           {/* Custom Slider */}
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentValue}
//                               onChange={handleSliderChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 slider-thumb:rounded-full slider-thumb:bg-purple-600 slider-thumb:cursor-pointer slider-thumb:shadow-lg slider-thumb:transition-all slider-thumb:duration-200 hover:slider-thumb:scale-110"
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

//                           {/* Custom Slider */}
//                           <div className="relative">
//                             <input
//                               type="range"
//                               min="1"
//                               max="100"
//                               value={currentVale}
//                               onChange={handleSliderHardChange}
//                               className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 slider-thumb:rounded-full slider-thumb:bg-purple-600 slider-thumb:cursor-pointer slider-thumb:shadow-lg slider-thumb:transition-all slider-thumb:duration-200 hover:slider-thumb:scale-110"
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
//             </div>
//           </div>
          
//           <TestInfo testInfo={data.testInfo} />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           /* Custom checkbox styling */
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   )
// }













// "use client"

// import { useState, useEffect } from "react"
// import { useSelector } from "react-redux"
// import axios from "axios"
// import Link from "next/link"
// import QuizSections from "./quiz-sections"
// import { ChevronDown, ChevronUp, Route, Calendar, X, Star, Settings, RotateCcw, Lock, BarChart3, TrendingUp } from "lucide-react"
// import data from "./data.json"
// import Cookies from "js-cookie"
// import TestInfo from './test-info'
// import DashStudent from "../../dashStudent"
// import { useRouter } from "next/navigation"
// import { refreshAuthToken } from "@/app/api/refreshAuthToken"

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

// interface SkillTestStatistic {
//   id: number;
//   value: string;
//   questionsCount: number;
//   correctAnswersCount: number;
//   ratio: number;
// }

// interface TestClass {
//   id: number;
//   value: string;
//   skillTestsStatistics: SkillTestStatistic[];
// }

// interface TestType {
//   id: number;
//   value: string;
//   testClasses: TestClass[];
// }

// interface ApiResponse {
//   testTypes: TestType[];
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
//   return (
//     <button
//       onClick={onToggle}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
//         isOn ? 'bg-blue-500' : 'bg-gray-300'
//       }`}
//       type="button">
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

// interface Subcategory {
//   id: string
//   name: string
// }

// interface Subject {
//   id: string
//   name: string
//   selected: boolean
//   available: boolean
//   status?: string
//   subcategories: Subcategory[]
// }

// interface TestInfo {
//   title: string
//   expectedTime: string
//   numberOfQuestions: number
//   startButtonText: string
//   labels: {
//     expectedTime: string
//     numberOfQuestions: string
//   }
// }

// interface AppData {
//   remainingAttempts: number
//   subjects: Subject[]
//   testInfo: TestInfo
// }

// export default function TrainingInterface() {
//   const [quizData, setQuizData] = useState(data)
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [currentValue, setCurrentValue] = useState(49);
//   const [currentVale, setCurrentVale] = useState(50);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [settings, setSettings] = useState<Record<string, boolean>>({});
  
//   const router = useRouter()
//   // API related state
//   const [analyticsData, setAnalyticsData] = useState<ApiResponse | null>(null);
//   const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
//   const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  
//   const currentTitle = useSelector((state: { background: { name: string } }) => state.background.name);
//   const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

//   // Fetch analytical statistics
//   const fetchAnalyticalStatistics = async () => {
//     setIsLoadingAnalytics(true);
//     setAnalyticsError(null);
    
//     try {
//       const response = await axios.get<ApiResponse>(`${API_URL}/api/Statistics/GetAnalyticalStatistics`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get('accessToken')}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if(response.data.meta === "success"){
//         setAnalyticsData(response.data);
//       }
//     } catch (error) {
//       let errorMessage = "Unknown error occurred"
//             const refreshSuccess = await refreshAuthToken()
      
//             if (axios.isAxiosError(error)) {
//               if (error.response) {
//                 switch (error.response.status) {
//                   case 401:
//                     if (refreshSuccess) {
//                       return fetchAnalyticalStatistics()
//                     }
//                     errorMessage = "Authentication expired. Please log in again."
//                     router.push("/login")
//                     break
//                   case 403:
//                     if (refreshSuccess) {
//                       return fetchAnalyticalStatistics()
//                     }
//                     errorMessage = "Access denied. This could be due to expired authentication or insufficient permissions."
//                     router.push("/login")
//                     break
//                   case 404:
//                     errorMessage = `API endpoint not found (404). Please check if the URL is correct: ${error.config?.url}`
//                     break
//                   case 500:
//                     errorMessage = "Server error (500). Please try again later."
//                     break
//                   default:
//                     errorMessage = `Server error (${error.response.status}): ${error.response.statusText}`
//                 }
//               } else if (error.request) {
//                 errorMessage = "Network error. Please check your internet connection."
//               } else {
//                 errorMessage = `Request error: ${error.message}`
//               }
//             } else {
//               errorMessage = error instanceof Error ? error.message : "Unknown error"
//             }
      
//             console.error("Error fetching data:", error)
//     } finally {
//       setIsLoadingAnalytics(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     // Refresh both quiz data and analytics
//     await Promise.all([
//       new Promise(resolve => setTimeout(resolve, 1500)),
//       fetchAnalyticalStatistics()
//     ]);
//     setIsRefreshing(false);
//   };

//   const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentValue(parseInt(e.target.value));
//   };

//   const handleSliderHardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentVale(parseInt(e.target.value));
//   };

//   useEffect(() => {
//     const initialSettings: Record<string, boolean> = {};
//     data.settings.forEach((setting: Setting) => {
//       initialSettings[setting.id] = setting.defaultValue;
//     });
//     setSettings(initialSettings);
    
//     // Fetch analytics on component mount
//     fetchAnalyticalStatistics();
//   }, []);

//   const toggleSetting = (id: string) => {
//     setSettings(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const resetSettings = () => {
//     const resetValues: Record<string, boolean> = {};
//     data.settings.forEach((setting: Setting) => {
//       resetValues[setting.id] = setting.defaultValue;
//     });
//     setSettings(resetValues);
//   };

//   return (
//     <DashStudent>
//       <div className="p-4" dir="rtl">
//         <div className="mx-auto">
//           {/* Main Container */}
//           <div className="bg-white p-4 md:p-2">
//             {/* Header */}
//             <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//               <div className="order-2 lg:order-1">
//                 <h1 className="text-xl md:text-2xl font-bold text-purple-800 mb-2">{data.header.title}</h1>
//               </div>
//               <div className="flex gap-3 justify-center items-center md:justify-start order-1 lg:order-2">
//                 <Link href="/dashboard/dashStudent/smartTest">
//                   <div className="flex justify-center">
//                     <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium" type="button">
//                       ابدأ التدريب
//                     </button>
//                   </div>
//                 </Link>
//                 <button 
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                   className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2" 
//                   type="button"
//                 >
//                   {isRefreshing && <RotateCcw className="w-4 h-4 animate-spin" />}
//                   {data.header.buttons[1].text}
//                 </button>
//               </div>
//             </div>

//             {/* Subtitle and Description */}
//             <div className="text-right mb-8">
//               {data.header.description.map((text, index) => (
//                 <p key={index} className="text-sm text-gray-600 mb-2 leading-relaxed">
//                   {text}
//                 </p>
//               ))}
//             </div>

//             {/* Analytics Dashboard */}
//             {analyticsData && (
//               <div className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-purple-600 rounded-lg">
//                     <BarChart3 className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl font-bold text-purple-800">الإحصائيات التحليلية</h2>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {analyticsData.testTypes.map((testType) => (
//                     <div key={testType.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
//                       <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                         <TrendingUp className="w-4 h-4 text-purple-600" />
//                         {testType.value}
//                       </h3>
//                       <div className="space-y-2">
//                         {testType.testClasses.map((testClass) => (
//                           <div key={testClass.id} className="bg-gray-50 rounded-md p-3">
//                             <div className="text-sm font-medium text-gray-700 mb-2">
//                               {testClass.value}
//                             </div>
//                             <div className="space-y-1">
//                               {testClass.skillTestsStatistics.map((skill) => (
//                                 <div key={skill.id} className="flex justify-between items-center text-xs">
//                                   <span className="text-gray-600">{skill.value}</span>
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-green-600 font-medium">
//                                       {skill.correctAnswersCount}/{skill.questionsCount}
//                                     </span>
//                                     <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                       <div 
//                                         className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
//                                         style={{ width: `${skill.ratio}%` }}
//                                       ></div>
//                                     </div>
//                                     <span className="text-purple-600 font-medium">
//                                       {skill.ratio.toFixed(1)}%
//                                     </span>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 {isLoadingAnalytics && (
//                   <div className="flex justify-center items-center py-8">
//                     <div className="flex items-center gap-3 text-purple-600">
//                       <RotateCcw className="w-5 h-5 animate-spin" />
//                       <span>جاري تحميل البيانات الإحصائية...</span>
//                     </div>
//                   </div>
//                 )}
                
//                 {analyticsError && (
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
//                     {analyticsError}
//                     <button 
//                       onClick={fetchAnalyticalStatistics}
//                       className="mr-3 text-red-600 hover:text-red-800 underline"
//                       type="button">
//                       إعادة المحاولة
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {currentTitle === "قدرات" ? (
//                 <>
//                   <QuizSections 
//                     title={quizData.quantitativeSection.title}
//                     categories={quizData.quantitativeSection.categories.map((cat: any) => ({
//                       ...cat,
//                       text: cat.text ?? cat.name ?? "",
//                       selected: cat.selected ?? false,
//                     }))}
//                     id={quizData.quantitativeSection.id}
//                   />
//                   <QuizSections 
//                     title={quizData.verbalSection.title}
//                     categories={quizData.verbalSection.categories.map((cat: any) => ({
//                       ...cat,
//                       text: cat.text ?? cat.name ?? "",
//                       selected: cat.selected ?? false,
//                     }))}
//                     id={quizData.verbalSection.id}
//                   />
//                 </>
//               ) : (
//                 // Subject Grid
//                 <>
//                   {data.subjects.map((subject) => (
//                     <QuizSections
//                       key={subject.id}
//                       title={subject.name}
//                       id={subject.id}
//                       categories={subject.subcategories.map((subcat) => ({
//                         id: subcat.id,
//                         text: subcat.name,
//                         selected: subject.selected,
//                       }))}
//                     />
//                   ))}
//                 </>
//               )}
//             </div>

//             <div className="bg-white mt-7 rounded-lg border border-gray-200 overflow-hidden">
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
//                   {/* Card Content */}
//                   <div className="p-6 space-y-6">
//                     {/* Last Updated Info */}
//                     <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
//                       <Calendar className="w-4 h-4 text-purple-600" />
//                       <span className="text-sm font-medium">
//                         {data.questionsBank.lastUpdated}
//                       </span>
//                     </div>

//                     <div className="flex gap-4 w-full flex-col-reverse md:flex-row-reverse">
//                       <div>
//                         {/* Main Settings Card */}
//                         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                           {/* Header */}
//                           <div className="bg-purple-700 p-4 text-center">
//                             <div className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full mb-2">
//                               <Lock className="w-4 h-4 text-white" />
//                             </div>
//                             <h1 className="text-lg font-semibold text-white">
//                               {data.title}
//                             </h1>
//                           </div>

//                           {/* Settings List */}
//                           <div className="p-4">
//                             {data.settings.map((setting: Setting) => (
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

//                         {/* Reset Button */}
//                         <button
//                           onClick={resetSettings}
//                           className="w-full mt-4 bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
//                           type="button"
//                         >
//                           <RotateCcw className="w-4 h-4" />
//                           {data.resetButton}
//                         </button>
//                       </div>

//                       <div className="w-[100%] md:w-[70%]">
//                         {/* Slider Section */}
//                         <div className="space-y-4 md:h-[39%] border-[1px] mb-6 rounded-lg p-4 border-purple-700">
//                           <div className="flex items-center justify-between text-sm font-medium text-gray-700">
//                             <span>{data.questionsBank.filterLabels.newest}</span>
//                             <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
//                               <span className="text-purple-700 font-bold text-lg">{currentValue}</span>
//                               <span className="text-purple-600">سؤال</span>
//                             </div>
//                             <span>{data.questionsBank.filterLabels.oldest}</span>
//                           </div>

//                           {/* Custom Slider */}
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

//                           {/* Custom Slider */}
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
//             </div>
//           </div>
//           <TestInfo testInfo={data.testInfo} />
//         </div>

//         <style jsx global>{`
//           @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
//           * {
//             font-family: 'Tajawal', sans-serif;
//           }
//           /* Custom checkbox styling */
//           input[type="checkbox"] {
//             appearance: none;
//             -webkit-appearance: none;
//             background-color: white;
//           }
//           input[type="checkbox"]:checked {
//             background-color: #10b981;
//             border-color: #10b981;
//           }
//         `}</style>
//       </div>
//     </DashStudent>
//   )
// }