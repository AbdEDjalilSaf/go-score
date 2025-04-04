import type { Metadata } from "next";
import { Cairo } from "next/font/google"
import Header from "@/app/pages/homePage/header/page"
import Logo from "@/public/Logo.png";
import HeaderJson from "@/app/pages/homePage/header/data.json"
// const Header = dynamic(() => import("@/app/pages/homePage/header/page"), {
//   ssr: true,
//   loading: () => <div className="h-16 border-b"></div>,
// });
import Footer from "@/app/pages/homePage/footer/page" 
// const Footer = dynamic(() => import("@/app/pages/homePage/footer/page"), {
//   ssr: true,
//   loading: () => <div className="h-40 bg-primary"></div>,
// });
import "./globals.css";
import ProviderWrapper from './ProviderWrapper'; // Ensure correct path & import


const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "افضل موقع للتدرب على الاختبارات|GoScore",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
      <body className=" bg-background  font-cairo antialiased">
      <ProviderWrapper>
<Header {...HeaderJson} Logo={Logo} />

        {children}
        
<Footer />
</ProviderWrapper>
      </body>
    </html>
  );
}
