// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { searchSchema } from "@/lib/validation"
// import { Input } from "@/components/ui/input"
// import { Search, Plus, Minus } from "lucide-react"

// // Define the schema for search validation
// type SearchValues = z.infer<typeof searchSchema>


// // Define the FAQ item type
// interface FAQItem {
//   id: string
//   question: string
//   answer: string
// }

// interface FAQSectionProps {
//   data: {
//     title: string
//     searchPlaceholder: string
//     items: FAQItem[]
//   }
// }

// export default function FAQSection({ data }: FAQSectionProps) {
//   const [expandedId, setExpandedId] = useState<string | null>(null)
//   const [filteredItems, setFilteredItems] = useState<FAQItem[]>(data.items)

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<SearchValues>({
//     resolver: zodResolver(searchSchema),
//     defaultValues: {
//       query: "",
//     },
//   })

//   // Watch for changes in the search query
//   const searchQuery = watch("query")

//   // Filter items based on search query
//   const handleSearch = (values: SearchValues) => {
//     const query = values.query.toLowerCase()
//     if (!query) {
//       setFilteredItems(data.items)
//       return
//     }

//     const filtered = data.items.filter(
//       (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
//     )
//     setFilteredItems(filtered)
//   }

//   // Toggle FAQ item expansion
//   const toggleItem = (id: string) => {
//     setExpandedId(expandedId === id ? null : id)
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Title */}
//       <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">{data.title}</h1>

//       {/* Search Box */}
//       <div className="bg-white rounded-lg shadow-md p-8 mb-8">
//         <form onChange={handleSubmit(handleSearch)} className="relative">
//           <Input
//             {...register("query")}
//             placeholder={data.searchPlaceholder}
//             className="w-full border-b border-gray-300 pb-2 pl-8 pr-4 focus:outline-none focus:border-purple-500 text-right"
//           />
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//         </form>

//         {/* FAQ Items */}
//         <div className="mt-8  space-y-4">
//           {filteredItems.map((item) => (
//             <div key={item.id} className="border-b border-gray-200 pb-4">
//               <button
//                 onClick={() => toggleItem(item.id)}
//                 className="flex justify-between flex-row-reverse items-center w-full text-right py-2 text-gray-800 hover:text-purple-700 focus:outline-none"
//                 type="button">
//                 <span className="text-purple-500">
//                   {expandedId === item.id ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
//                 </span>
//                 <span className="font-medium text-lg">{item.question}</span>
//               </button>

//               {expandedId === item.id && <div className="mt-2 text-gray-600 text-right pr-7">{item.answer}</div>}
//             </div>
//           ))}

//           {filteredItems.length === 0 && (
//             <div className="text-center py-4 text-gray-500">لا توجد نتائج مطابقة لبحثك</div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }










"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { searchSchema } from "@/lib/validation"
import { Search, Plus, Minus } from "lucide-react"

// Define the schema for search validation
type SearchValues = z.infer<typeof searchSchema>

// Define the FAQ item type
interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQSectionProps {
  data: {
    title: string
    searchPlaceholder: string
    items: FAQItem[]
  }
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<FAQItem[]>(data.items)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  })

  // Watch for changes in the search query
  const searchQuery = watch("query")

  // Filter items based on search query
  const handleSearch = (values: SearchValues) => {
    const query = values.query.toLowerCase()
    if (!query) {
      setFilteredItems(data.items)
      return
    }

    const filtered = data.items.filter(
      (item) => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
    )
    setFilteredItems(filtered)
  }

  // Toggle FAQ item expansion
  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">{data.title}</h1>

      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <form onChange={handleSubmit(handleSearch)} className="relative">
          <input
            {...register("query")}
            placeholder={data.searchPlaceholder}
            className="w-full border-b border-gray-300 pb-2 pl-8 pr-4 focus:outline-none focus:border-purple-500 text-right bg-transparent text-sm"
            type="text"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </form>

        {/* FAQ Items */}
        <div className="mt-8 space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between flex-row-reverse items-center w-full text-right py-2 text-gray-800 hover:text-purple-700 focus:outline-none transition-colors"
                type="button"
              >
                <span className="text-purple-500">
                  {expandedId === item.id ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
                <span className="font-medium text-lg">{item.question}</span>
              </button>
              {expandedId === item.id && (
                <div className="mt-2 text-gray-600 text-right pr-7 animate-fadeIn">{item.answer}</div>
              )}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-4 text-gray-500">لا توجد نتائج مطابقة لبحثك</div>
          )}
        </div>
      </div>
    </div>
  )
}
