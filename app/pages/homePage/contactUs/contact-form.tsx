//     "use client"

// import { useState } from "react"
// import { formSchema } from "@/lib/validation"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe,Mail } from "lucide-react"


// type FormValues = z.infer<typeof formSchema>

// interface ContactFormProps {
//     data: {
//         title: string
//         subtitle: string
//         contactInfo: string
//         formTitle: string
//         description: string
//         email: string
//         emailPlaceholder: string
//         namePlaceholder: string
//         subjectPlaceholder: string
//         messagePlaceholder: string
//         submitButton: string
//     }
//     }

// export default function ContactForm({ data }: ContactFormProps) {
//         const [isSubmitting, setIsSubmitting] = useState(false)
//         const [isSuccess, setIsSuccess] = useState(false)
      
//         const {
//             register,
//             handleSubmit,
//             formState: { errors },
//             reset,
//           } = useForm<FormValues>({
//             resolver: zodResolver(formSchema),
//           })       
      
//         const onSubmit = async (formData: FormValues) => {
//           setIsSubmitting(true)
      
//           // Simulate API call
//           await new Promise((resolve) => setTimeout(resolve, 1000))
      
//           console.log(formData)
//           setIsSubmitting(false)
//           setIsSuccess(true)
//           reset()
      
//           // Reset success message after 3 seconds
//           setTimeout(() => setIsSuccess(false), 3000)
//         }

//     return (
//         <div className="w-full">
//         {/* Purple curved header */}
//         <div className="relative">
//             <div className="bg-purple-800 h-32 md:h-40 flex items-center justify-center">
//             <h1 className="text-white text-3xl lg:mb-12 font-bold">{data.title}</h1>
//             </div>
//             <div className="absolute bottom-0 left-0 w-full">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full" aria-hidden="true">
//                 <path
//                 fill="#ffffff"
//                 fillOpacity="1"
//                 d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
//                 ></path>
//             </svg>
//             </div>
//         </div>

//         {/* Content section */}
//         <div className="container mx-auto px-4 py-12">
//             <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
//             {/* Form section */}
//             <div className="w-full md:w-1/2 order-2 md:order-1">
//                 <h2 className="text-2xl font-bold mb-6 ">{data.formTitle}</h2>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Input
//                     {...register("email")}
//                     placeholder={data.emailPlaceholder}
//                     className="w-full border rounded-md p-2"
//                   />
//                   {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//                 </div>
//                 <div>
//                   <Input
//                     {...register("name")}
//                     placeholder={data.namePlaceholder}
//                     className="w-full border rounded-md p-2"
//                   />
//                   {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <Input
//                   {...register("subject")}
//                   placeholder={data.subjectPlaceholder}
//                   className="w-full border rounded-md p-2"
//                 />
//                 {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
//               </div>

//               <div>
//                 <Textarea
//                   {...register("message")}
//                   placeholder={data.messagePlaceholder}
//                   className="w-full border rounded-md p-2 min-h-[150px]"
//                 />
//                 {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
//               </div>

//               <div>
//                 <Button
//                   type="submit"
//                   className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-2 rounded-md"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "جاري الإرسال..." : data.submitButton}
//                 </Button>

//                 {isSuccess && <p className="text-green-500 mt-2">Message sent successfully!</p>}
//               </div>
//             </form>
//             </div>

//             {/* Info section */}
//             <div className="w-full md:w-1/2 order-1 md:order-2 text-right">
//                 <h2 className="text-2xl font-bold mb-6 ">{data.contactInfo}</h2>
//                 <h2 className="text-md font-medium mb-4">{data.subtitle}</h2>
//                 <p className="text-gray-600 mb-6 text-sm leading-relaxed">{data.description}</p>
//                 <div className="flex items-center mb-8">
//                 <span className="text-gray-800 ml-2">{data.email}</span>
//                 <div className="bg-purple-800 p-2 rounded-md">
//                     <Mail  className="h-4 w-4 text-white" />
//                 </div>
//                 </div>
//                 <div className="flex space-x-2 space-x-reverse">
//                 <div className="bg-purple-800 p-2 rounded-md">
//                     <Globe className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="bg-purple-800 p-2 rounded-md">
//                     <Youtube className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="bg-purple-800 p-2 rounded-md">
//                     <Linkedin className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="bg-purple-800 p-2 rounded-md">
//                     <Instagram className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="bg-purple-800 p-2 ml-2 rounded-md">
//                     <Twitter className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="bg-purple-800 p-2  rounded-md">
//                     <Facebook className="h-5 w-5 text-white" />
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//     )
//     }

















"use client"

import { useState } from "react"
import { formSchema } from "@/lib/validation"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, Mail } from "lucide-react"

type FormValues = z.infer<typeof formSchema>

interface ContactFormProps {
  data: {
    title: string
    subtitle: string
    contactInfo: string
    formTitle: string
    description: string
    email: string
    emailPlaceholder: string
    namePlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    submitButton: string
  }
}

export default function ContactForm({ data }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(formData)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className="w-full">
      {/* Purple curved header */}
      <div className="relative">
        <div className="bg-purple-800 h-32 md:h-40 flex items-center justify-center">
          <h1 className="text-white text-3xl lg:mb-12 font-bold">{data.title}</h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full" aria-hidden="true">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-16">
          {/* Form section */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6">{data.formTitle}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={data.emailPlaceholder}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={data.namePlaceholder}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
              </div>
              <div>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder={data.subjectPlaceholder}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <textarea
                  {...register("message")}
                  placeholder={data.messagePlaceholder}
                  className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] resize-vertical focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-3 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الإرسال..." : data.submitButton}
                </button>
                {isSuccess && (
                  <p className="text-green-500 mt-2 font-medium animate-fadeIn">Message sent successfully!</p>
                )}
              </div>
            </form>
          </div>

          {/* Info section */}
          <div className="w-full md:w-1/2 order-1 md:order-2 text-right">
            <h2 className="text-2xl font-bold mb-6">{data.contactInfo}</h2>
            <h2 className="text-md font-medium mb-4">{data.subtitle}</h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{data.description}</p>
            <div className="flex items-center mb-8">
              <span className="text-gray-800 ml-2">{data.email}</span>
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors">
                <Mail className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5 text-white" />
              </div>
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Linkedin className="h-5 w-5 text-white" />
              </div>
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="bg-purple-800 p-2 ml-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5 text-white" />
              </div>
              <div className="bg-purple-800 p-2 rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
