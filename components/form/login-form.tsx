"use client"

import type React from "react"
// import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import LoginImg from "@/public/login.jpg"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useLogin } from "@/app/hooks/useLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validation"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import Cookies from "js-cookie"
import { useRouter } from "next/navigation"





// Infer the type from the schema
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login, error } = useLogin(); // Ensure login accepts arguments or update its implementation
  
  // Initialize react-hook-form with zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "", 
    },
  })


// Handle form submission
async function onSubmit(data: LoginFormValues) {
  setIsLoading(true);
  setIsSuccess(true);

  // Simulate API call
  // console.log("Form submission started", data);
  try {
    await login( data.email, data.password );
  
  } catch (err) {
    console.error("Sign Up error:", err);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 rtl">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl mb-3 font-bold">مرحبًا بعودتك</h1>
                  {/* <p className="text-balance text-muted-foreground">تسجيل الدخول إلى حساب Acme Inc الخاص بك</p> */}
                </div>

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
                      <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">كلمة المرور</FormLabel>
                        <Link href="#" className="text-sm underline-offset-2 hover:underline">
                          نسيت كلمة المرور؟
                        </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} dir="ltr" className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              
            {error ? <p className="text-red-500 text-sm">{error}</p> : null}
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">أو المتابعة باستخدام</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="w-full" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">تسجيل الدخول باستخدام Apple</span>
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1">    
    <title>Google-color</title>
    <desc>Created with Sketch.</desc>
    <defs>
</defs>
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Color-" transform="translate(-401.000000, -860.000000)">
            <g id="Google" transform="translate(401.000000, 860.000000)">
                <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05">
                </path>
                <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335">
                </path>
                <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853">
                </path>
                <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4">
                </path>
            </g>
        </g>
    </g>
</svg>
                    <span className="sr-only">تسجيل الدخول باستخدام Google</span>
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 48 48" version="1.1">
    <title>Whatsapp-color</title>
    <desc>Created with Sketch.</desc>
    <defs>
</defs>
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
            <path d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z" id="Whatsapp">
</path>
        </g>
    </g>
</svg>
                    <span className="sr-only">تسجيل الدخول باستخدام WhatsApp</span>
                  </Button>
                </div>

                <div className="text-center text-sm">
                  ليس لديك حساب؟{" "}
                  <Link href="/signup" className="underline mr-3 hover:text-purple-800 underline-offset-4">
                    إنشاء حساب
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src={LoginImg}
              alt="تسجيل الدخول"
              width={400}
              height={600}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary rtl">
        بالنقر فوق متابعة، فإنك توافق على <Link href="#">شروط الخدمة</Link> و <Link href="#">سياسة الخصوصية</Link> الخاصة بنا.
      </div>
    </div>
  )
}

