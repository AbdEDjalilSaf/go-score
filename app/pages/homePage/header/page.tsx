"use client"

import { useState,Suspense } from "react"
import type { StaticImageData } from 'next/image';
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

interface HeaderProps {
  header: {
    navigation: {
      name: string
      href: string
    }[]
    button: {
      text: string
    }
  }
  deviceHeader: {
    navigation: {
      name: string
      href: string
    }[]
    button: {
      text: string
    }
  }
  Logo: StaticImageData
}

export default function Header({ header, deviceHeader , Logo }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [videOpen, setVideOpen] = useState(false);

  return (
    <header className="sticky top-0 px-4 lg:px-36 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ">
        <div className="hidden md:flex items-center">
          <Sheet open={videOpen} onOpenChange={setVideOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] px-8 flex flex-col">
              <SheetTitle className="text-right "></SheetTitle>
              {/* <SheetTitle className="text-right">القائمة</SheetTitle> */}
              <nav className="flex flex-col gap-4 mt-8">
                {deviceHeader.navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-lg font-medium py-2 hover:text-primary text-right"
                    onClick={() => setVideOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  size="lg"
                  className="bg-primary rounded-full text-base px-6 py-3 h-auto mt-4"
                  onClick={() => setVideOpen(false)}
                >
                  {deviceHeader.button.text}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
          <Link href="/">
            <Suspense fallback={<div>Loading...</div>}>
          <Image src={Logo || "/placeholder.svg"} alt="اختبارات" width={150} height={40} className="h-10 w-auto" />
          </Suspense>
          </Link>
        </div>


        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {header.navigation.map((item, index) => (
            <Link key={index} href={item.href} className="text-sm font-medium hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-2">
          <Button size="lg" className="bg-primary rounded-full text-base px-6 py-3 h-auto">
            {header.button.text}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2 text-4xl">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] px-8 flex flex-col">
              <SheetTitle className="text-right "></SheetTitle>
              {/* <SheetTitle className="text-right">القائمة</SheetTitle> */}
              <nav className="flex flex-col gap-4 mt-8">
                {deviceHeader.navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-lg font-medium py-2 hover:text-primary text-right"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  size="lg"
                  className="bg-primary rounded-full text-base px-6 py-3 h-auto mt-4"
                  onClick={() => setOpen(false)}
                >
                  {deviceHeader.button.text}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}





