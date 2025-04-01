
import { Suspense } from "react"
import HomePage from "@/app/pages/homePage/page"
// import dynamic from "next/dynamic";
// const HomePage = dynamic(() => import("@/app/pages/homePage/page"), {
//   ssr: true,
//   loading: () => <div className="h-40 bg-primary"></div>,
// });



export default function Home() {
  return (
<Suspense fallback={<div>Loading...</div>}>
  <HomePage />
</Suspense>

  )
}

