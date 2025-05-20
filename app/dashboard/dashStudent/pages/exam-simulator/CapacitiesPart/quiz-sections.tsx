"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux';
import { changeCapacitiesFullCheck, changeCapacitiesPartCheck } from '@/features/auth/authSlice';


interface Category {
  id: string
  name: string
  isActive?: boolean
}
interface QuizSectionsProps {
  title: string,
  id: string,
  categories: Category[]
}

export default function QuizSections({ title, categories, id }: QuizSectionsProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.filter((cat) => cat.isActive).map((cat) => cat.id),
  )
  const [isChecked, setIsChecked] = useState(false)
  const [isCheckedFull, setIsCheckedFULL] = useState(false)
  const [isCheckedPart, setIsCheckedpart] = useState(false)



  const dispatch = useDispatch();
  const capacitiesFullCheck = useSelector((state: { background: { capacitiesFullCheck: boolean } }) => state.background.capacitiesFullCheck);
  const capacitiesPartCheck = useSelector((state: { background: { capacitiesPartCheck: boolean } }) => state.background.capacitiesPartCheck);
  // console.log("--------------- capacitiesFullCheck -----------",capacitiesFullCheck);


const capacitiesFullCheckFunction = ()=>{
  console.log(" ============================ before dispatch ============================");
  dispatch(changeCapacitiesFullCheck(!isCheckedFull));
  console.log(" ============================ before dispatch ============================");
  if (capacitiesFullCheck && isChecked) {
    setActiveCategories(categories.map((cat) => cat.id))
  } else {
       setActiveCategories(activeCategories.filter((catId) => catId !== id))
  }
  console.log("--------------- capacitiesFullCheck -----------",capacitiesFullCheck);
}

const capacitiesPartCheckFunction = ()=>{
  dispatch(changeCapacitiesPartCheck(!isCheckedPart));
  if (capacitiesPartCheck) {
    setActiveCategories(categories.map((cat) => cat.id))
  } else {
       setActiveCategories(activeCategories.filter((catId) => catId !== id))
  }
  console.log("+++++++++++++++++++++++++ capacitiesPartCheck +++++++++++++++++++",capacitiesPartCheck);
}

useEffect(()=> {
capacitiesFullCheckFunction();
capacitiesPartCheckFunction();
},[]);


  const toggleCategory = (id: string) => {
    
    if (activeCategories.includes(id)) {
      setActiveCategories(activeCategories.filter((catId) => catId !== id))
        dispatch(changeCapacitiesFullCheck(!isCheckedFull));
      console.log("activeCategories", activeCategories.includes(id));
    } else {
      setActiveCategories([...activeCategories, id])
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-[#ff6b4a] font-bold text-right">{title}</h2>
        {/* <div className="w-5 h-5 bg-teal-500 rounded-md"></div> */}
   <div  id={id}
        className="flex items-center relative bg-gray-100 rounded-md px-3 py-1.5 w-[140px] cursor-pointer"
        onClick={() =>{ 
          setIsChecked(!isChecked)
          if (id == "الكمي") {
            setIsCheckedFULL(!isCheckedFull);
            capacitiesFullCheckFunction();
          } else {
            setIsCheckedpart(!isCheckedPart);
            capacitiesPartCheckFunction();
          }
        }}  >
        {/* <span className="text-[#ff6b4a] font-medium text-right text-sm">القسم الفني</span> */}
        <div className="flex items-center absolute left-1 justify-center">
          {isChecked && (
            <div  className="w-5 h-5 bg-white border border-gray-200 rounded flex items-center justify-center">
              <Check  className="w-4 h-4 text-green-500" strokeWidth={3} />
            </div>
          )}
          {!isChecked && <div className="w-5 h-5 bg-white border border-gray-200 rounded"></div>}
        </div>  
      </div>
    </div>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`
              text-center py-2 px-3 rounded-md text-sm
              ${
                activeCategories.includes(category.id) 
                  ? "bg-purple-800 text-white"
                  : "bg-white text-black border border-gray-200"
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
