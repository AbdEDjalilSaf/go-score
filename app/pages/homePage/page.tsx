import React, {Suspense} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import OneSupport from "@/public/OneSupport.png"
import TwoSupport from "@/public/TwoSupport.png"
import ThreeSupport from "@/public/ThreeSupport.png"
import FourSupport from "@/public/FourSupport.jpg"
import FiveSupport from "@/public/FiveSupport.jpg"
import Landin from "@/public/Landin.jpg"
import {
  BookOpen,
  Award,
  BarChart2,
  Users,
  Brain,
  Lightbulb,
  Atom,
} from "lucide-react"
import Link from "next/link"


const page = () => {
  return (
    <>
       <div className="flex min-h-screen  flex-col">
     

     <main className="flex-1">
       {/* Hero Section */}
       <section className="relative flex justify-center items-center overflow-hidden py-7 md:py-28">
         <div className="container px-12">
           <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
             <div className="flex flex-col justify-center space-y-4 text-right">
               <div className="space-y-2">
                 <h1 className="text-3xl font-bold tracking-tighter mb-7  sm:text-5xl xl:text-6xl/none text-primary">
                   حياك في منصة GoScore !
                 </h1>
                 <p className="max-w-[600px] text-muted-foreground md:text-xl">المنصة التي تدربك على القدرات بذكاء</p>
               </div>
               <p className="max-w-[600px] text-muted-foreground">
                 منصة اختبارات تحلل نتائجك في التدريبات، وتوزيع النقاط التي أنت قوي فيها والنقاط التي تحتاج إلى تدريب
                 ومراجعة، وستساعدك تقوي نقاط ضعفك في تدريباتك الجارية لكي تتحسن. ومن ثمّ كذا ستتوقع درجتك في الاختبار
                 الحقيقي بناء على تحليلنا لمستواك.
               </p>
               <div className="flex flex-col sm:flex-row gap-3 mt-4">
                 {/* <Button className="bg-primary hover:bg-primary/90">تدرب على اختبار القدرات</Button> */}
                 <Link href="/pages/homePage/generalCapabilities">
                 <Button className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 py-3 h-auto min-w-[180px]">
                   تدرب على اختبار القدرات
                 </Button>
                 </Link>
                 {/* <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                   تدرب على اختبار التحصيلي
                 </Button> */}
                 <Link href="/pages/homePage/academicAchievement">
                 <Button
                   variant="outline"
                   className="border-primary text-primary hover:bg-primary/10 text-base sm:text-lg px-6 py-3 h-auto min-w-[180px]"
                 >
                   تدرب على اختبار التحصيلي
                 </Button>
                 </Link>
               </div>
             </div>
             <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-square">
             <Suspense fallback={<div>Loading...</div>}>
                 <Image
                   src={Landin}
                   alt="Hero"
                   layout="fill"
                   objectFit="cover"
                   className="rounded-xl "
                 />
                 </Suspense>
             </div>
           </div>
         </div>
       </section>

       {/* Features Section */}
       <section className="bg-muted flex justify-center items-center py-12 md:py-20">
         <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
               وش يقدم لك اختبارات؟
             </h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <Link href="/pages/homePage/generalCapabilities"><Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600">
               <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                 <div className="rounded-full bg-primary/10 p-3">
                   <BookOpen className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">اختبارات تجريبية</h3>
                 <p className="text-muted-foreground">
                   اختبارات تحاكي اختبارات بشكل كامل تكون الأسئلة والتوقيت لقياس مدى استعدادك
                 </p>
               </CardContent>
             </Card></Link>
             <Link href="/pages/homePage/generalCapabilities"><Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600">
               <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                 <div className="rounded-full bg-primary/10 p-3">
                   <Award className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">تدريبات متنوعة</h3>
                 <p className="text-muted-foreground">
                   تدرب بذكاء على أسئلة تغطي كافة جوانب ومهارات اختبارك لتحسين إتقان المهارات
                 </p>
               </CardContent>
             </Card></Link>
             <Link href="/pages/homePage/generalCapabilities"><Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600">
               <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                 <div className="rounded-full bg-primary/10 p-3">
                   <BarChart2 className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">تحليل الأداء</h3>
                 <p className="text-muted-foreground">تعرف على أماكن قوتك ونقاط ضعفك واعمل على تحسينها</p>
               </CardContent>
             </Card></Link>
             <Link href="/pages/homePage/generalCapabilities"><Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-600">
               <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                 <div className="rounded-full bg-primary/10 p-3">
                   <Users className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold">تحدي أصدقاءك</h3>
                 <p className="text-muted-foreground">تنافس واحصل الترتيب على اختبارات افتراضية مع الأصدقاء</p>
               </CardContent>
             </Card></Link>
           </div>
           <div className="flex justify-center mt-10">
           <Button className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-8 py-4 h-auto min-w-[220px] font-bold">
               وش تنتظر! انضم للاختبارات الآن
             </Button>
           </div>
         </div>
       </section>

       {/* About Section */}
       <section className="py-12 flex justify-center items-center md:py-20">
         <div className="container px-4 md:px-6 text-center">
           <p className="mx-auto max-w-3xl text-muted-foreground md:text-lg">
             بنينا مناهج اختبارك بطريقة ذكية عشان تدرس وانت مرتاح وما تكرر عليك المعلومة اللي تعرفها. موقع اختبارات
             يساعدك تاخذ المهارات اللي نحتاجها وتجتاز اختبارك بنجاح وبأقصر وأمتع طريقة
           </p>
           <div className="flex justify-center mt-8">
           <Button className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-8 py-4 h-auto min-w-[220px] font-bold">
               وش تنتظر! انضم للاختبارات الآن
             </Button>
           </div>
         </div>
       </section>

       {/* Test Types Section */}
       <section className="py-12 flex justify-center items-center md:py-20 bg-muted">
         <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 text-primary">
             اختبارات تساعدك فيها
           </h2>
                      
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Card 1 */}
         <Link href="/pages/homePage/generalCapabilities">
         <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:shadow-purple-600 transition-shadow">
           <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
             <Brain className="h-7 w-7" />
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-2">اختبار القدرات العامة</h3>
           <p className="text-gray-500 text-sm">
             يقيس القدرة التحليلية والاستدلالية لدى الطالب، ويركز على قياس قدرة الطالب على فهم النصوص وتحليلها والاستنتاج منها
           </p>
         </div>
         </Link>
         {/* Card 2 */}
         <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:shadow-purple-600 transition-shadow">
           <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
           <Lightbulb className="h-7 w-7 " />
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-2">اختبار مقياس موهبة</h3>
           <p className="text-gray-500 text-sm">
             اختبار يقيس القدرات الإبداعية والتفكير الابتكاري لدى الطلاب
           </p>
         </div>

         {/* Card 3 */}
         {/* <Link href="/pages/homePage/generalCapabilities"> */}
         <Link href="/pages/homePage/academicAchievement">
         <div className="bg-white rounded-lg shadow-md p-6 lg:h-[208px] hover:shadow-lg hover:shadow-purple-600 transition-shadow">
           <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
             <Atom className="h-6 w-6" />
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-2">اختبار التحصيلي</h3>
           <p className="text-gray-500 text-sm">
             يقيس مستوى تحصيل الطالب في المواد الدراسية الأساسية
           </p>
         </div>
         </Link>
       </div>
     </main>
           <div className="text-center mt-10">
             <h3 className="text-xl font-bold text-destructive mb-4">وفيه اختبارات أكثر قريباً</h3>
           </div>
         </div>
       </section>

       {/* Stats Section */}
       <section className="py-12 flex justify-center items-center md:py-20 bg-gradient-to-b from-white to-muted">
         <div className="container px-4 md:px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             <div className="space-y-2">
               <h3 className="text-3xl font-bold text-primary">10000+</h3>
               <p className="text-muted-foreground">اختبارات</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold text-primary">18</h3>
               <p className="text-muted-foreground">حصة تعليمية</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold text-primary">20000+</h3>
               <p className="text-muted-foreground">سؤال</p>
             </div>
             <div className="space-y-2">
               <h3 className="text-3xl font-bold text-primary">5000+</h3>
               <p className="text-muted-foreground">طالب مشترك</p>
             </div>
           </div>
         </div>
       </section>

       {/* Partners Section */}
       <section className="py-12 flex justify-center items-center md:py-20">
         <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-10 text-primary">
             شركاء نجاحنا
           </h2>
           <div className="flex justify-center">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
               
                 <div  className="flex items-center justify-center">
                 <Suspense fallback={<div>Loading...</div>}>
                   <Image
                     src={OneSupport}
                     alt="Partner"
                     width={120}
                     height={80}
                     className="opacity-70 hover:opacity-100 transition-opacity"
                   />
                   </Suspense>
                 </div>
                 <div  className="flex items-center justify-center">
                 <Suspense fallback={<div>Loading...</div>}>
                   <Image
                     src={TwoSupport}
                     alt="Partner"
                     width={120}
                     height={80}
                     className="opacity-70 hover:opacity-100 transition-opacity"
                   />
                   </Suspense>
                 </div>
                 <div  className="flex items-center justify-center">
                 <Suspense fallback={<div>Loading...</div>}>
                   <Image
                     src={ThreeSupport}
                     alt="Partner"
                     width={120}
                     height={80}
                     className="opacity-70 hover:opacity-100 transition-opacity"
                   />
                   </Suspense>
                 </div>
                 <div  className="flex items-center justify-center">
                 <Suspense fallback={<div>Loading...</div>}>
                   <Image
                     src={FourSupport}
                     alt="Partner"
                     width={120}
                     height={80}
                     className="opacity-70 hover:opacity-100 transition-opacity"
                   />
                   </Suspense>
                 </div>
                 <div  className="flex items-center justify-center">
                 <Suspense fallback={<div>Loading...</div>}>
                   <Image
                     src={FiveSupport}
                     alt="Partner"
                     width={120}
                     height={80}
                     className="opacity-70  hover:opacity-100 transition-opacity"
                   />
                   </Suspense>
                 </div>
             </div>
           </div>
         </div>
       </section>

       {/* CTA Section */}
       <section className="py-12 flex justify-center items-center md:py-20 bg-primary border-b-[0.5px] border-white border-solid text-primary-foreground">
         <div className="container px-4 md:px-6 text-center">
           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">ابدأ رحلتك التعليمية معنا اليوم</h2>
           <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl mb-6">
             انضم إلى آلاف الطلاب الذين يحققون نتائج أفضل مع منصة اختبارات
           </p>
           <Button
             variant="secondary"
             size="lg"
             className="text-primary font-bold  px-10 py-6 h-auto min-w-[250px] text-xl"
           >
             سجل الآن مجاناً
           </Button>
         </div>
       </section>
     </main>

               
   </div>
    </>
  )
}

export default page
