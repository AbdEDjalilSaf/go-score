import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, SnailIcon as Snapchat } from "lucide-react"
import footerData from "./data.json"
import SecondLogo from "@/public/SecondLogo.png"



export default function Footer() {
  const { footer } = footerData

  // Map social icons to their components
  const socialIcons = {
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
    YouTube: Youtube,
    Snapchat: Snapchat,
  }

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src={SecondLogo}
              alt="اختبارات"
              width={150}
              height={40}
              className="h-20 w-auto"
            />
            <p className="text-primary-foreground/80 text-sm">{footer.about.text}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{footer.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footer.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{footer.contact.title}</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80 text-sm">البريد الإلكتروني: {footer.contact.email}</li>
              <li className="text-primary-foreground/80 text-sm">الهاتف: {footer.contact.phone}</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{footer.social.title}</h3>
            <div className="flex space-x-4 space-x-reverse">
              {footer.social.links.map((link, index) => {
                const IconComponent = socialIcons[link.name as keyof typeof socialIcons]
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    <IconComponent className={`h-5 w-5 ${link.name === "Snapchat" ? "mr-4" : ""}`} />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} منصة GoScore </p>
        </div>
      </div>
    </footer>
  )
}

