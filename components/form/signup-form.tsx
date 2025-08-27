"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useState } from "react"
import Image from "next/image"
import SignupImg from "@/public/login.jpg"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "@/lib/validation"
import { useRegister } from "@/app/hooks/useRegister"
import { useSendConfirmCode } from "@/app/hooks/useSendConfirmCode"
import type * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Infer the type from the schema
type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, error } = useRegister()
  const { sendCode, error: sendCodeError, loading, sent } = useSendConfirmCode()
  // Initialize react-hook-form with zod resolver
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      code: "",
    },
  })

  // Handle form submission
  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true)
    setIsSuccess(true)

    // console.log("Success Status:", isSuccess)

    if (!isSuccess) {
      console.log("Success Status again:", isSuccess)
      console.log("Form submission started", data.email)
      try {
        await sendCode(data.email)

        // console.log("Form submission started", data.email)
      
      } catch (err) {
        console.error("Sign Up error:", err)
      }
    } else {
      // Simulate API call
      // console.log("Form submission started", data)
      try {
       await register(data.firstName,data.lastName,data.email, data.password, data.code, data.whatsUpNumber);

      } catch (err) {
        console.error("Sign Up error:", err)
      }
    }
    // In a real app, you would make an API call here
    setTimeout(() => {
      setIsLoading(false)
      // Handle success or error
    }, 1000)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 ">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl mb-3 font-bold">إنشاء حساب جديد</h1>
                  {/* <p className="text-balance text-muted-foreground">انضم إلى Acme Inc اليوم</p> */}
                </div>
                {isSuccess ? (
                  <div className="text-center flex flex-col justify-center items-center gap-3">
                    <h3> يرجى إدخال الكود الواصل إليكم عبر البريد الإلكتروني </h3>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="code">رمز التأكيد</FormLabel>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              className="flex flex-row-reverse-reverse gap-7"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={0} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="firstName">الاسم الاول</FormLabel>
                          <FormControl>
                            <Input id="firstName" type="text" placeholder="محمد أحمد" {...field} className="text-right" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="lastName">الاسم اللقب</FormLabel>
                          <FormControl>
                            <Input id="lastName" type="text" placeholder="الجاسمي " {...field} className="text-right" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="email">البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              {...field}
                              dir="ltr"
                              className="text-right"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel htmlFor="password">كلمة المرور</FormLabel>
                          <FormControl>
                            <Input id="password" type="password" {...field} dir="ltr" className="text-right" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "التالي" : "إنشاء حساب"}
                </Button>

                {error ? <p className="text-red-500 text-sm">{error}</p> : null}
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">أو المتابعة باستخدام</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">التسجيل باستخدام Apple</span>
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="800px"
                      height="800px"
                      viewBox="-0.5 0 48 48"
                      version="1.1"
                    >
                      <title>Google-color</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                          <g id="Google" transform="translate(401.000000, 860.000000)">
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            ></path>
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            ></path>
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            ></path>
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span className="sr-only">التسجيل باستخدام Google</span>
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="800px"
                      height="800px"
                      viewBox="0 0 48 48"
                      version="1.1"
                    >
                      <title>Whatsapp-color</title>
                      <desc>Created with Sketch.</desc>
                      <defs></defs>
                      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
                          <path
                            d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z"
                            id="Whatsapp"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <span className="sr-only">التسجيل باستخدام WhatsApp</span>
                  </Button>
                </div>

                <div className="text-center text-sm">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login" className="underline mr-3 hover:text-purple-800 underline-offset-4">
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={SignupImg || "/placeholder.svg"}
              alt="حساب جديد"
              width={400}
              height={600}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary rtl">
        بالنقر فوق إنشاء حساب، فإنك توافق على <Link href="#">شروط الخدمة</Link> و <Link href="#">سياسة الخصوصية</Link>{" "}
        الخاصة بنا.
      </div>
    </div>
  )
}

















// "use client"
// import type React from "react"
// import { Suspense, useState } from "react"
// import Image from "next/image"
// import SignupImg from "@/public/login.jpg"
// import Link from "next/link"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { signupSchema } from "@/lib/validation"
// import { useRegister } from "@/app/hooks/useRegister"
// import { useSendConfirmCode } from "@/app/hooks/useSendConfirmCode"
// import type * as z from "zod"

// // Infer the type from the schema
// type SignupFormValues = z.infer<typeof signupSchema>

// // Custom OTP Input Component
// const OTPInput = ({
//   value,
//   onChange,
//   maxLength = 6,
// }: { value: string; onChange: (value: string) => void; maxLength?: number }) => {
//   const handleInputChange = (index: number, inputValue: string) => {
//     if (inputValue.length > 1) return

//     const newValue = value.split("")
//     newValue[index] = inputValue
//     const updatedValue = newValue.join("").slice(0, maxLength)
//     onChange(updatedValue)

//     // Auto-focus next input
//     if (inputValue && index < maxLength - 1) {
//       const nextInput = document.getElementById(`otp-${index + 1}`)
//       nextInput?.focus()
//     }
//   }

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !value[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`)
//       prevInput?.focus()
//     }
//   }

//   return (
//     <div className="flex gap-2 justify-center" dir="ltr">
//       {/* First group */}
//       <div className="flex gap-2">
//         {[5, 4, 3].map((index) => (
//           <input
//             key={index}
//             id={`otp-${index}`}
//             type="text"
//             maxLength={1}
//             value={value[index] || ""}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg font-medium"
//           />
//         ))}
//       </div>
//       {/* Separator */}
//       <div className="flex items-center">
//         <div className="w-3 h-0.5 bg-gray-300"></div>
//       </div>
//       {/* Second group */}
//       <div className="flex gap-2">
//         {[2, 1, 0].map((index) => (
//           <input
//             key={index}
//             id={`otp-${index}`}
//             type="text"
//             maxLength={1}
//             value={value[index] || ""}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-lg font-medium"
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isSuccess, setIsSuccess] = useState(false)
//   const { register, error } = useRegister()
//   const { sendCode, error: sendCodeError, loading, sent } = useSendConfirmCode()

//   // Initialize react-hook-form with zod resolver
//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       password: "",
//       email: "",
//       code: "",
//     },
//   })

//   // Handle form submission
//   async function onSubmit(data: SignupFormValues) {
//     setIsLoading(true)
//     setIsSuccess(true)

//     if (!isSuccess) {
//       console.log("Form submission started", data.email)
//       try {
//         await sendCode(data.email)
//       } catch (err) {
//         console.error("Sign Up error:", err)
//       }
//     } else {
//       try {
//         await register(data.firstName, data.lastName, data.email, data.password, data.code, data.whatsUpNumber)
//       } catch (err) {
//         console.error("Sign Up error:", err)
//       }
//     }

//     setTimeout(() => {
//       setIsLoading(false)
//     }, 1000)
//   }

//   const {
//     register: registerField,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = form
//   const codeValue = watch("code")

//   return (
//     <div className={`flex flex-col gap-6 ${className || ""}`} {...props}>
//       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden p-0">
//         <div className="grid p-0 md:grid-cols-2">
//           <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col items-center text-center">
//                 <h1 className="text-2xl mb-3 font-bold">إنشاء حساب جديد</h1>
//               </div>

//               {isSuccess ? (
//                 <div className="text-center flex flex-col justify-center items-center gap-3">
//                   <h3>يرجى إدخال الكود الواصل إليكم عبر البريد الإلكتروني</h3>
//                   <div className="grid gap-2">
//                     <label htmlFor="code" className="text-sm font-medium text-gray-700">
//                       رمز التأكيد
//                     </label>
//                     <OTPInput value={codeValue} onChange={(value) => setValue("code", value)} maxLength={6} />
//                     {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grid gap-2">
//                     <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
//                       الاسم الاول
//                     </label>
//                     <input
//                       id="firstName"
//                       type="text"
//                       placeholder="محمد أحمد"
//                       {...registerField("firstName")}
//                       className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     />
//                     {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
//                       الاسم اللقب
//                     </label>
//                     <input
//                       id="lastName"
//                       type="text"
//                       placeholder="الجاسمي"
//                       {...registerField("lastName")}
//                       className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     />
//                     {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                       البريد الإلكتروني
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       placeholder="m@example.com"
//                       {...registerField("email")}
//                       dir="ltr"
//                       className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     />
//                     {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
//                   </div>

//                   <div className="grid gap-2">
//                     <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                       كلمة المرور
//                     </label>
//                     <input
//                       id="password"
//                       type="password"
//                       {...registerField("password")}
//                       dir="ltr"
//                       className="w-full px-3 py-2 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                     />
//                     {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
//                   </div>
//                 </>
//               )}

//               <button
//                 type="submit"
//                 className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "التالي" : "إنشاء حساب"}
//               </button>

//               {error && <p className="text-red-500 text-sm">{error}</p>}

//               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
//                 <span className="relative z-10 bg-white px-2 text-gray-600">أو المتابعة باستخدام</span>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <button
//                   type="button"
//                   className="w-full border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors flex items-center justify-center"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
//                     <path
//                       d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
//                       fill="currentColor"
//                     />
//                   </svg>
//                   <span className="sr-only">التسجيل باستخدام Apple</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="w-full border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors flex items-center justify-center"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
//                     <path
//                       d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
//                       fill="#FBBC05"
//                     ></path>
//                     <path
//                       d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
//                       fill="#EB4335"
//                     ></path>
//                     <path
//                       d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
//                       fill="#34A853"
//                     ></path>
//                     <path
//                       d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
//                       fill="#4285F4"
//                     ></path>
//                   </svg>
//                   <span className="sr-only">التسجيل باستخدام Google</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="w-full border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md transition-colors flex items-center justify-center"
//                 >
//   <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-1.5 0 259 259" version="1.1" preserveAspectRatio="xMidYMid" aria-hidden="true">
//     <g>
//         <path d="M67.6631045,221.823373 L71.8484512,223.916047 C89.2873956,234.379413 108.819013,239.262318 128.350631,239.262318 L128.350631,239.262318 C189.735716,239.262318 239.959876,189.038158 239.959876,127.653073 C239.959876,98.3556467 228.101393,69.7557778 207.17466,48.8290445 C186.247927,27.9023111 158.345616,16.0438289 128.350631,16.0438289 C66.9655467,16.0438289 16.7413867,66.2679889 17.4389445,128.350631 C17.4389445,149.277365 23.7169645,169.50654 34.1803311,186.945485 L36.9705622,191.130831 L25.8096378,232.28674 L67.6631045,221.823373 Z" fill="#00E676">
// </path>
//     <path d="M219.033142,37.66812 C195.316178,13.2535978 162.530962,0 129.048189,0 C57.8972956,0 0.697557778,57.8972956 1.39511556,128.350631 C1.39511556,150.67248 7.67313556,172.296771 18.1365022,191.828389 L0,258.096378 L67.6631045,240.657433 C86.4971645,251.1208 107.423898,256.003705 128.350631,256.003705 L128.350631,256.003705 C198.803967,256.003705 256.003705,198.106409 256.003705,127.653073 C256.003705,93.4727423 242.750107,61.3850845 219.033142,37.66812 Z M129.048189,234.379413 L129.048189,234.379413 C110.214129,234.379413 91.380069,229.496509 75.3362401,219.7307 L71.1508934,217.638027 L30.6925422,228.101393 L41.1559089,188.3406 L38.3656778,184.155253 C7.67313556,134.628651 22.3218489,69.05822 72.5460089,38.3656778 C122.770169,7.67313556 187.643042,22.3218489 218.335585,72.5460089 C249.028127,122.770169 234.379413,187.643042 184.155253,218.335585 C168.111425,228.798951 148.579807,234.379413 129.048189,234.379413 Z M190.433273,156.9505 L182.760138,153.462711 C182.760138,153.462711 171.599213,148.579807 164.623636,145.092018 C163.926078,145.092018 163.22852,144.39446 162.530962,144.39446 C160.438289,144.39446 159.043173,145.092018 157.648058,145.789576 L157.648058,145.789576 C157.648058,145.789576 156.9505,146.487133 147.184691,157.648058 C146.487133,159.043173 145.092018,159.740731 143.696902,159.740731 L142.999345,159.740731 C142.301787,159.740731 140.906671,159.043173 140.209113,158.345616 L136.721325,156.9505 L136.721325,156.9505 C129.048189,153.462711 122.072611,149.277365 116.492149,143.696902 C115.097033,142.301787 113.00436,140.906671 111.609245,139.511556 C106.72634,134.628651 101.843436,129.048189 98.3556467,122.770169 L97.658089,121.375053 C96.9605312,120.677496 96.9605312,119.979938 96.2629734,118.584822 C96.2629734,117.189707 96.2629734,115.794591 96.9605312,115.097033 C96.9605312,115.097033 99.7507623,111.609245 101.843436,109.516571 C103.238551,108.121456 103.936109,106.028782 105.331225,104.633667 C106.72634,102.540993 107.423898,99.7507623 106.72634,97.658089 C106.028782,94.1703001 97.658089,75.3362401 95.5654156,71.1508934 C94.1703001,69.05822 92.7751845,68.3606623 90.6825112,67.6631045 L88.5898378,67.6631045 C87.1947223,67.6631045 85.1020489,67.6631045 83.0093756,67.6631045 C81.6142601,67.6631045 80.2191445,68.3606623 78.8240289,68.3606623 L78.1264712,69.05822 C76.7313556,69.7557778 75.3362401,71.1508934 73.9411245,71.8484512 C72.5460089,73.2435667 71.8484512,74.6386823 70.4533356,76.0337978 C65.5704312,82.3118178 62.7802,89.9849534 62.7802,97.658089 L62.7802,97.658089 C62.7802,103.238551 64.1753156,108.819013 66.2679889,113.701918 L66.9655467,115.794591 C73.2435667,129.048189 81.6142601,140.906671 92.7751845,151.370038 L95.5654156,154.160269 C97.658089,156.252942 99.7507623,157.648058 101.145878,159.740731 C115.794591,172.296771 132.535978,181.365022 151.370038,186.247927 C153.462711,186.945485 156.252942,186.945485 158.345616,187.643042 L158.345616,187.643042 C160.438289,187.643042 163.22852,187.643042 165.321193,187.643042 C168.808982,187.643042 172.994329,186.247927 175.78456,184.852811 C177.877233,183.457696 179.272349,183.457696 180.667465,182.06258 L182.06258,180.667465 C183.457696,179.272349 184.852811,178.574791 186.247927,177.179676 C187.643042,175.78456 189.038158,174.389445 189.735716,172.994329 C191.130831,170.204098 191.828389,166.716309 192.525947,163.22852 C192.525947,161.833405 192.525947,159.740731 192.525947,158.345616 C192.525947,158.345616 191.828389,157.648058 190.433273,156.9505 Z" fill="#FFFFFF">
// </path>
//     </g>
// </svg>
//                   <span className="sr-only">التسجيل باستخدام WhatsApp</span>
//                 </button>
//               </div>

//               <div className="text-center text-sm">
//                 لديك حساب بالفعل؟{" "}
//                 <Link href="/login" className="underline mr-3 hover:text-purple-800 underline-offset-4">
//                   تسجيل الدخول
//                 </Link>
//               </div>
//             </div>
//           </form>

//           <div className="relative hidden bg-gray-50 md:block">
//             <Suspense fallback={<div>Loading...</div>}>
//             <Image
//               src={SignupImg || "/placeholder.svg"}
//               alt="حساب جديد"
//               width={400}
//               height={600}
//               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//             />
//             </Suspense>
//           </div>
//         </div>
//       </div>

//       <div className="text-balance text-center text-xs text-gray-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-purple-700 rtl">
//         بالنقر فوق إنشاء حساب، فإنك توافق على <Link href="#">شروط الخدمة</Link> و <Link href="#">سياسة الخصوصية</Link>{" "}
//         الخاصة بنا.
//       </div>
//     </div>
//   )
// }
