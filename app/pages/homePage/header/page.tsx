import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/public/Logo.png"
import data from "./data.json"

// You'll need to import your logo separately as we can't store image imports in JSON


export default function Header() {
  const { header } = data

  return (
    <header className="sticky top-0 px-12 z-50 w-full lg:px-36 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="اختبارات" width={150} height={40} className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {header.navigation.map((item, index) => (
            <Link key={index} href={item.href} className="text-sm font-medium hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="lg" className="bg-primary rounded-full text-base px-6 py-3 h-auto">
            {header.button.text}
          </Button>
        </div>
      </div>
    </header>
  )
}


