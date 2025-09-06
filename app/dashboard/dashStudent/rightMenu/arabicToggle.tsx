// "use client"

// import { useState } from "react"
// import { changeBackground } from '@/features/auth/authSlice';
// import { useDispatch, useSelector } from 'react-redux';

// export default function ArabicToggle() {
//   const [activeOption, setActiveOption] = useState<"tahsili" | "qudurat">("qudurat")
//   const dispatch = useDispatch();

//   const makeCookiesType = (name: string) => {
   
//     dispatch(changeBackground(name));
  
//   }
//   return (
//   <>
//   <div className="w-full my-2">
//         {/* Main Toggle Button */}
//         <div className="bg-purple-700 rounded-full p-1 shadow-lg">
//           <div className="flex relative">
//            {/* قدرات Option */}
//             <button
//               name="قدرات"
//               onClick={() =>{
//                setActiveOption("qudurat")
//                makeCookiesType("قدرات")     }}
//               className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                 activeOption === "qudurat" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//               }`}
//               type="button">
//               قدرات
//             </button>

//             {/* تحصيلي Option */}
//             <button
//               name="تحصيلي"
//               onClick={() =>{ 
//                 setActiveOption("tahsili")
//                 makeCookiesType("تحصيلي")  }}
//               className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
//                 activeOption === "tahsili" ? "text-purple-700 bg-white shadow-md" : "text-white hover:text-purple-100"
//               }`}
//               type="button">
//               تحصيلي
//             </button>

          
//           </div>
//         </div>
// </div>
// </>
//   )
// }














"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

interface TestType {
  id: number;
  value: string;
}

interface ApiResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: TestType[];
}

export default function ArabicToggle() {
  const [activeOption, setActiveOption] = useState<"tahsili" | "qudurat">("qudurat");
  const [testTypes, setTestTypes] = useState<TestType[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch test types from API
  const fetchTestTypes = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/TestType/GetAllTestTypes');
      const result = response.data;
      
      if (result.succeeded) {
        setTestTypes(result.data);
      } else {
        console.error('API Error:', result.message, result.errors);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Request failed:', error.response?.data || error.message);
      } else {
        console.error('Failed to fetch test types:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch test types on component mount
  useEffect(() => {
    fetchTestTypes();
  }, []);

  const handleOptionChange = (option: "tahsili" | "qudurat", displayName: string) => {
    setActiveOption(option);
    
    // Handle background change logic here
    // Since we don't have Redux, we can use context, local storage, or props
    console.log(`Selected test type: ${displayName}`);
    
    // Optional: Store in localStorage
    localStorage.setItem('selectedTestType', displayName);
    
    // Optional: Trigger a custom event for other components to listen
    window.dispatchEvent(new CustomEvent('testTypeChanged', { 
      detail: { type: displayName, option } 
    }));
  };

  return (
    <div className="w-full my-2">
      {/* Loading indicator */}
      {loading && (
        <div className="text-center text-purple-600 mb-2 text-sm">
          جاري تحميل أنواع الاختبارات...
        </div>
      )}
      
      {/* Main Toggle Button */}
      {/* <div className="bg-purple-700 rounded-full p-1 shadow-lg">
        <div className="flex relative">
          <button
            onClick={() => handleOptionChange("qudurat", "قدرات")}
            className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
              activeOption === "qudurat" 
                ? "text-purple-700 bg-white shadow-md" 
                : "text-white hover:text-purple-100"
            }`}
            type="button"
          >
            قدرات
          </button>

          <button
            onClick={() => handleOptionChange("tahsili", "تحصيلي")}
            className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
              activeOption === "tahsili" 
                ? "text-purple-700 bg-white shadow-md" 
                : "text-white hover:text-purple-100"
            }`}
            type="button"
          >
            تحصيلي
          </button>
        </div>
      </div> */}
      
      {/* Display fetched test types for debugging/reference */}
      {testTypes.length > 0 && (
        <div className="bg-purple-700 rounded-full p-1 shadow-lg">
        <div className="flex relative">
            {testTypes.map((type) => (
              // <li key={type.id} className="flex justify-between">
              //   <span>{type.value}</span>
              //   <span className="text-gray-400">#{type.id}</span>
              // </li>
              <button
              key={type.id}
              onClick={() => handleOptionChange(String(type.value), String(type.value))}
              className={`flex-1 py-2 px-6 rounded-full text-center font-medium transition-all duration-300 relative z-10 ${
                activeOption === String(type.value) 
                  ? "text-purple-700 bg-white shadow-md" 
                  : "text-white hover:text-purple-100"
              }`}
              type="button"
            >
            {type.value}
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

