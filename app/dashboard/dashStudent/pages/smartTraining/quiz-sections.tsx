// "use client"

// import { useEffect, useState } from "react"
// import { Check } from "lucide-react"
// import { useDispatch, useSelector } from 'react-redux';
// import { changeCapacitiesFullCheck, changeCapacitiesPartCheck } from '@/features/auth/authSlice';


// interface Category {
//   id: string
//   name: string
//   isActive?: boolean
// }
// interface QuizSectionsProps {
//   title: string,
//   id: string,
//   categories: Category[]
// }

// export default function QuizSections({ title, categories, id }: QuizSectionsProps) {
//   const [activeCategories, setActiveCategories] = useState<string[]>(
//     categories.filter((cat) => cat.isActive).map((cat) => cat.id),
//   )
//   const [isChecked, setIsChecked] = useState(true)
//   const [isCheckedFull, setIsCheckedFULL] = useState(false)
//   const [isCheckedPart, setIsCheckedpart] = useState(false)



//   const dispatch = useDispatch();
//   const capacitiesFullCheck = useSelector((state: { background: { capacitiesFullCheck: boolean } }) => state.background.capacitiesFullCheck);
//   const capacitiesPartCheck = useSelector((state: { background: { capacitiesPartCheck: boolean } }) => state.background.capacitiesPartCheck);
//   // console.log("--------------- capacitiesFullCheck -----------",capacitiesFullCheck);


// const capacitiesFullCheckFunction = ()=>{
//   console.log(" ============================ before dispatch ============================");
//   dispatch(changeCapacitiesFullCheck(!isCheckedFull));
//   console.log(" ============================ before dispatch ============================");
//   if (capacitiesFullCheck && isChecked) {
//     setActiveCategories(categories.map((cat) => cat.id))
//   } else {
//        setActiveCategories(activeCategories.filter((catId) => catId !== id))
//   }
//   console.log("--------------- capacitiesFullCheck -----------",capacitiesFullCheck);
// }

// const capacitiesPartCheckFunction = ()=>{
//   dispatch(changeCapacitiesPartCheck(!isCheckedPart));
//   if (capacitiesPartCheck) {
//     setActiveCategories(categories.map((cat) => cat.id))
//   } else {
//        setActiveCategories(activeCategories.filter((catId) => catId !== id))
//   }
//   console.log("+++++++++++++++++++++++++ capacitiesPartCheck +++++++++++++++++++",capacitiesPartCheck);
// }

// useEffect(()=> {
// capacitiesFullCheckFunction();
// capacitiesPartCheckFunction();
// },[]);


//   const toggleCategory = (id: string) => {
    
//     if (activeCategories.includes(id)) {
//       setActiveCategories(activeCategories.filter((catId) => catId !== id))
//       if (id == "الكمي") {
//         dispatch(changeCapacitiesFullCheck(!isCheckedFull));
//       }else {
//         dispatch(changeCapacitiesPartCheck(!isCheckedPart));
//       }
//       console.log("activeCategories", activeCategories.includes(id));
//     } else {
//       setActiveCategories([...activeCategories, id])
//     }
//   }

//   return (
//     <div className="bg-gray-100 rounded-lg p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg text-[#ff6b4a] font-bold text-right">{title}</h2>
//         {/* <div className="w-5 h-5 bg-teal-500 rounded-md"></div> */}
//    <div  id={id}
//         className="flex items-center relative bg-gray-100 rounded-md px-3 py-1.5 w-[140px] cursor-pointer"
//         onClick={() =>{ 
//           setIsChecked(!isChecked)
//           if (id == "الكمي") {
//             setIsCheckedFULL(!isCheckedFull);
//             capacitiesFullCheckFunction();
//           } else {
//             setIsCheckedpart(!isCheckedPart);
//             capacitiesPartCheckFunction();
//           }
//         }}  >
//         {/* <span className="text-[#ff6b4a] font-medium text-right text-sm">القسم الفني</span> */}
//         <div className="flex items-center absolute left-1 justify-center">
//           {isChecked && (
//             // <div  className="w-5 h-5 bg-white border border-gray-200 rounded flex items-center justify-center">
//             //   <Check  className="w-4 h-4 text-green-500" strokeWidth={3} />
//             // </div>
//             <div className="w-5 h-5 bg-white border border-gray-200 rounded"></div>
//           )}
//           {!isChecked && <div  className="w-5 h-5 bg-white border border-gray-200 rounded flex items-center justify-center">
//               <Check  className="w-4 h-4 text-green-500" strokeWidth={3} />
//             </div>}
//         </div>  
//       </div>
//     </div>

//       <div className="grid grid-cols-2 gap-2">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => toggleCategory(category.id)}
//             className={`
//               text-center py-2 px-3 rounded-md text-sm
//               ${
//                 activeCategories.includes(category.id) 
//                   ? "bg-purple-800 text-white"
//                   : "bg-white text-black border border-gray-200"
//               }
//             `}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }





"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"



interface Category {
   id: string
  text: string
  selected: boolean
}
interface QuizSectionsProps {
  title: string,
  id: string,
  categories: Category[]
}

export default function Component({ title, categories, id }: QuizSectionsProps) {
  // const [items, setItems] = useState<SelectableItem[]>([
  //   { id: "1", text: "إكتمال الجمل", selected: false },
  //   { id: "2", text: "النمط السياقي", selected: false },
  //   { id: "3", text: "المفردة الناقصة", selected: false },
  //   { id: "4", text: "استيعاب المقروء", selected: false },
  //   { id: "5", text: "التناظر اللفظي", selected: false },
  //   { id: "6", text: "", selected: false }, // Empty for layout
  // ])

   const [items, setItems] = useState<Category[]>(categories)

  const [selectAll, setSelectAll] = useState(false)

  // Update selectAll checkbox based on individual items
  useEffect(() => {
    const activeItems = items.filter((item) => item.text !== "")
    const allSelected = activeItems.length > 0 && activeItems.every((item) => item.selected)
    setSelectAll(allSelected)
  }, [items])

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setItems(categories.map((item) => (item.text !== "" ? { ...item, selected: newSelectAll } : item)))
  }

  // Handle individual item selection
  const handleItemSelect = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  return (
    <div className="max-w-[500px] w-[370px] sm:w-[480px] md:w-[300px] xl:w-[350px] lg:w-[320px] mx-auto p-6 bg-gray-100 rounded-lg">
      {/* Header with checkbox and title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleSelectAll}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            selectAll ? "bg-green-600 border-green-600 text-white" : "border-gray-300 bg-white hover:border-gray-400"
          }`}
          type="button"
        >
          {selectAll && <Check className="w-4 h-4" />}
        </button>
        <h2 className="text-lg font-semibold text-gray-800" dir="rtl">
           {title}
        </h2>
      </div>

      {/* Grid of selectable items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) =>
          item.text ? (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item.id)}
              className={`p-4  rounded-lg font-medium transition-all duration-200 hover:scale-105 border-2 ${
                item.selected
                  ? "bg-[#59169c] text-white border-[#59169c] shadow-lg"
                  : "bg-white text-black border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
              dir="rtl"
              type="button"
            >
              {item.text}
            </button>
          ) : (
            // Empty space for the last item to maintain grid layout
            <div key={item.id} className="hidden sm:block"></div>
          ),
        )}
      </div>

      
    </div>
  )
}
