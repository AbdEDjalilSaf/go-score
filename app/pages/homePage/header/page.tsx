"use client"

import { useState, Suspense, useEffect } from "react"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import Link from "next/link"
import data from "./data.json"
import { ChevronDown, Menu } from "lucide-react"
// import { useSelector } from 'react-redux'
// import { selectCurrentToken, selectCurrentUser } from '@/features/auth/authSlice';
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Cookies from "js-cookie"

interface HeaderProps {
  header: {
    navigation: {
      name: string
      href: string
    }[]
    button: {
      text: string
      href: string
    }
  }
  deviceHeader: {
    navigation: {
      name: string
      href: string
    }[]
    button: {
      text: string
      textLogin: string
    }
  }
  Logo: StaticImageData
}

export default function Header({ header, deviceHeader, Logo }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [videOpen, setVideOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Use useEffect to check for token on the client side only
  useEffect(() => {
    const token = Cookies.get("accessToken")
    setIsLoggedIn(!!token)
  }, [])

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
                <nav className="flex flex-col gap-4 mt-8">
                  {deviceHeader.navigation.map((item, index) => {
                    // Check if this is the "المسارات" item
                    if (item.name === "المسارات") {
                      return (
                        <Accordion key={index} type="single" collapsible className="w-full">
                          <AccordionItem value="paths">
                            <AccordionTrigger className="text-lg font-medium py-2 hover:text-primary text-right">
                              {item.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col gap-2 pr-4">
                                {data.pathsDropdownItems.map((pathItem, pathIndex) => (
                                  <Link
                                    key={pathIndex}
                                    href={pathItem.href}
                                    className="text-base py-1.5 hover:text-primary text-right"
                                    onClick={() => setVideOpen(false)}
                                  >
                                    {pathItem.name}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    }
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-lg font-medium py-2 hover:text-primary text-right"
                        onClick={() => setVideOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <Link href={isLoggedIn ? "/dashboard/dashStudent" : "/login"}>
                    <Button
                      size="lg"
                      className="bg-primary rounded-full text-base px-6 py-3 h-auto mt-4"
                      onClick={() => setVideOpen(false)}
                    >
                      {isLoggedIn ? deviceHeader.button.textLogin : deviceHeader.button.text}
                    </Button>
                  </Link>
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
          {header.navigation.map((item, index) => {
            // Check if this is the "المسارات" item
            if (item.name === "المسارات") {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="link" className="text-sm font-medium  p-0 h-auto">
                      {item.name}
                      <ChevronDown className="h-4 w-4 mr-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {data.pathsDropdownItems.map((pathItem, pathIndex) => (
                      <DropdownMenuItem key={pathIndex} asChild>
                        <Link href={pathItem.href} className="w-full flex justify-end cursor-pointer">
                          {pathItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }
            return (
              <Link key={index} href={item.href} className="text-sm font-medium hover:text-primary">
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-2">
          <Link href={isLoggedIn ? "/dashboard/dashStudent" : "/login"}>
            <Button size="lg" className="bg-primary rounded-full text-base px-6 py-3 h-auto">
              {isLoggedIn ? deviceHeader.button.textLogin : header.button.text}
            </Button>
          </Link>
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
              <nav className="flex flex-col gap-4 mt-8">
                {deviceHeader.navigation.map((item, index) => {
                  // Check if this is the "المسارات" item
                  if (item.name === "المسارات") {
                    return (
                      <Accordion key={index} type="single" collapsible className="w-full">
                        <AccordionItem value="paths">
                          <AccordionTrigger className="text-lg font-medium py-2 hover:text-primary text-right">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 pr-4">
                              {data.pathsDropdownItems.map((pathItem, pathIndex) => (
                                <Link
                                  key={pathIndex}
                                  href={pathItem.href}
                                  className="text-base py-1.5 hover:text-primary text-right"
                                  onClick={() => setOpen(false)}
                                >
                                  {pathItem.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-lg font-medium py-2 hover:text-primary text-right"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <Link href={isLoggedIn ? "/dashboard/dashStudent" : "/login"}>
                  <Button
                    size="lg"
                    className="bg-primary  rounded-full text-base px-6 py-3 h-auto mt-4"
                    onClick={() => setOpen(false)}
                  >
                    {isLoggedIn ? deviceHeader.button.textLogin : deviceHeader.button.text}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
