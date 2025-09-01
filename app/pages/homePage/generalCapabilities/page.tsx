// import type React from "react"
// import { Button } from "@/components/ui/button"
// import { BookOpen, BarChart2, FileText, Brain, RefreshCw, Repeat } from "lucide-react"
// import HelpPanner from "./helpPanner"
// import data from "./data.json"

// // Icon mapping for dynamic rendering
// const IconMap: Record<string, React.ElementType> = {
//   BookOpen,
//   BarChart2,
//   FileText,
//   Brain,
//   RefreshCw,
//   Repeat,
// }

// export default function page() {
//   return (
//     <div dir="rtl" className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <HelpPanner />

//       {/* Features Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-4">{data.features.title}</h2>
//           <p className="text-center text-gray-600 mb-12">{data.features.subtitle}</p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {data.features.items.map((feature, index) => {
//               const FeatureIcon = IconMap[feature.icon]
//               return (
//                 <div key={index} className="text-center p-6">
//                   <div className="flex justify-center mb-4">
//                     <FeatureIcon className="h-16 w-16 text-blue-500" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
//                   <p className="text-gray-600 text-sm">{feature.description}</p>
//                 </div>
//               )
//             })}
//           </div>

//           <div className="flex justify-center mt-12">
//             <Button className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 rounded-full text-xl mt-8 font-bold">
//               {data.features.buttonText}
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Test Categories Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-12">
//             {data.testCategories.title}
//           </h2>

//           {data.testCategories.sections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="mb-12 last:mb-0">
//               <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">{section.title}</h3>
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {section.categories.map((category, categoryIndex) => (
//                   <Button key={categoryIndex} variant="outline" className="rounded-full text-base px-6 py-3 h-auto mt-4 hover:bg-primary hover:text-white">
//                     {category}
//                   </Button>
//                 ))}
//               </div>
//             </div> 
//           ))}
//         </div>
//       </section>

//       {/* How to Improve Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-12">
//             {data.howToImprove.title}
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             {data.howToImprove.steps.map((step, index) => {
//               const StepIcon = IconMap[step.icon]
//               return (
//                 <div key={index} className="flex items-start space-x-4 space-x-reverse">
//                   <div className="bg-teal-500 p-3 ml-5 rounded-full">
//                     <StepIcon className="h-6 w-6  text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold text-red-500 mb-3">{step.title}</h3>
//                     <p className="text-gray-600">{step.description}</p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           <div className="flex justify-center mt-12">
//             <Button className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 rounded-full text-xl mt-8 font-bold">
//               {data.howToImprove.buttonText}
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }












import type React from "react"
import { BookOpen, BarChart2, FileText, Brain, RefreshCw, Repeat } from "lucide-react"
import HelpPanner from "./helpPanner"
import data from "./data.json"

// Icon mapping for dynamic rendering
const IconMap: Record<string, React.ElementType> = {
  BookOpen,
  BarChart2,
  FileText,
  Brain,
  RefreshCw,
  Repeat,
}

export default function page() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Hero Section */}
      <HelpPanner />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-4">{data.features.title}</h2>
          <p className="text-center text-gray-600 mb-12">{data.features.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.features.items.map((feature, index) => {
              const FeatureIcon = IconMap[feature.icon]
              return (
                <div key={index} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <FeatureIcon className="h-16 w-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 rounded-full text-xl mt-8 font-bold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300" type="button">
              {data.features.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* Test Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-12">
            {data.testCategories.title}
          </h2>
          {data.testCategories.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12 last:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">{section.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {section.categories.map((category, categoryIndex) => (
                  <button
                    key={categoryIndex}
                    className="border border-gray-300 bg-white hover:bg-purple-600 hover:text-white hover:border-purple-600 text-gray-700 rounded-full text-base px-6 py-3 h-auto mt-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    type="button">
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Improve Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-purple-800 text-center mb-12">
            {data.howToImprove.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.howToImprove.steps.map((step, index) => {
              const StepIcon = IconMap[step.icon]
              return (
                <div key={index} className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-teal-500 p-3 ml-5 rounded-full">
                    <StepIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-500 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 rounded-full text-xl mt-8 font-bold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300" type="button">
              {data.howToImprove.buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
