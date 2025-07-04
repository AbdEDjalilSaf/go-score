import { Suspense } from "react"
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
    // Tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>`,
    Twitter: Twitter,
    Instagram: Instagram,
    YouTube: Youtube,
    Snapchat: Snapchat,
  }

  return (
    <footer className="bg-primary flex justify-center items-center text-primary-foreground py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              src={SecondLogo}
              alt="اختبارات"
              width={150}
              height={40}
              className="h-20 w-auto"
            />
            </Suspense>
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
              <Link href="" className="text-primary-foreground/80 hover:text-primary-foreground mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M7.24759 4.07011C8.42981 2.66637 10.1045 2 12 2C13.9392 2 15.604 2.78414 16.7639 4.21322C17.7942 5.48259 18.3772 7.1971 18.4826 9.1902C18.5118 9.19446 18.5425 9.19891 18.5749 9.20362L18.5955 9.20661C18.7648 9.23117 18.9679 9.26103 19.179 9.3019C19.9604 9.45323 21.2931 9.83505 21.7522 11.2659C21.9827 11.9846 21.8669 12.6509 21.4644 13.1786C21.1168 13.6343 20.6205 13.897 20.2664 14.0565C20.0896 14.1362 19.9144 14.2043 19.7668 14.2605C20.1122 15.1966 20.7141 16.1598 21.3801 17.0322C22.0073 17.8538 21.8414 18.8955 21.5172 19.574C21.1925 20.2537 20.4899 21.031 19.4684 21.0753C18.8903 21.1004 18.2833 21.1596 17.6791 21.2695C17.4062 21.3192 17.0841 21.4286 16.6839 21.5939C16.4453 21.6925 16.2264 21.79 15.9902 21.8953C15.8025 21.9789 15.6038 22.0674 15.3754 22.1653C14.4345 22.5685 13.2798 23 12 23C10.7201 23 9.56542 22.5685 8.62452 22.1653C8.39619 22.0674 8.19749 21.9789 8.00977 21.8953C7.7735 21.79 7.55463 21.6925 7.31601 21.5939C6.91585 21.4286 6.5938 21.3192 6.32087 21.2695C5.71667 21.1596 5.10964 21.1004 4.53154 21.0753C3.51004 21.031 2.8074 20.2537 2.48273 19.574C2.15858 18.8955 1.99263 17.8538 2.61986 17.0322C3.29007 16.1543 3.89533 15.1844 4.23963 14.2428C4.10623 14.1891 3.94976 14.1248 3.79112 14.0506C3.4447 13.8885 2.97483 13.6299 2.62849 13.1959C2.24058 12.7098 2.07004 12.083 2.22151 11.365C2.54568 9.82833 3.99142 9.44433 4.75598 9.30082C4.97305 9.26008 5.18352 9.23035 5.36087 9.20574C5.37272 9.2041 5.38436 9.20248 5.39582 9.2009C5.43821 9.19502 5.47796 9.18951 5.51542 9.18424C5.61483 7.05895 6.19378 5.32139 7.24759 4.07011ZM8.77735 5.35846C8.01533 6.26327 7.49997 7.71867 7.49997 9.85714V9.96228L7.4781 10.0651C7.36668 10.5892 6.96437 10.8336 6.76444 10.9277C6.55376 11.0269 6.32735 11.0761 6.16722 11.1058C6.01123 11.1348 5.83742 11.1589 5.68179 11.1804C5.66625 11.1825 5.65088 11.1847 5.63573 11.1868C5.45838 11.2114 5.29025 11.2355 5.12494 11.2665C4.35999 11.4101 4.2159 11.6002 4.17844 11.7778C4.15178 11.9042 4.1748 11.9296 4.18806 11.9442C4.1894 11.9457 4.19065 11.947 4.19173 11.9484C4.24504 12.0152 4.37304 12.1147 4.63867 12.239C4.76311 12.2972 4.89394 12.3505 5.03949 12.4087C5.05104 12.4134 5.06285 12.4181 5.07488 12.4229C5.2016 12.4736 5.35282 12.534 5.48646 12.5966C5.6173 12.6579 5.83672 12.7677 6.02161 12.9451C6.23755 13.1522 6.49946 13.5565 6.3728 14.0887C6.00824 15.6205 5.08855 17.0942 4.21053 18.2445C4.20735 18.2504 4.19426 18.2799 4.19451 18.3496C4.19485 18.445 4.222 18.5751 4.28737 18.7119C4.35267 18.8486 4.43795 18.954 4.51509 19.0173C4.57857 19.0694 4.61441 19.0766 4.61911 19.0773C5.27019 19.1055 5.96946 19.1727 6.67907 19.3019C7.16246 19.3899 7.6398 19.5637 8.07989 19.7456C8.32241 19.8458 8.60112 19.9695 8.87176 20.0896C9.06094 20.1735 9.24618 20.2558 9.41237 20.327C10.3108 20.712 11.1498 21 12 21C12.8502 21 13.6891 20.712 14.5876 20.327C14.7538 20.2558 14.939 20.1735 15.1282 20.0896C15.3988 19.9695 15.6775 19.8458 15.9201 19.7456C16.3601 19.5637 16.8375 19.3899 17.3209 19.3019C18.0305 19.1727 18.7298 19.1055 19.3808 19.0773C19.3856 19.0765 19.4214 19.0694 19.4849 19.0173C19.562 18.954 19.6473 18.8486 19.7126 18.7119C19.7779 18.5751 19.8051 18.445 19.8054 18.3496C19.8058 18.2566 19.7823 18.2353 19.7904 18.2458C18.9121 17.0954 17.9918 15.6211 17.6271 14.0887C17.4917 13.5198 17.8013 13.1083 18.0141 12.9192C18.2033 12.751 18.4261 12.6464 18.5614 12.5869C18.6956 12.5278 18.8479 12.4701 18.9782 12.4207C18.9947 12.4144 19.0108 12.4083 19.0265 12.4024C19.1787 12.3445 19.316 12.2911 19.4449 12.233C19.7142 12.1117 19.8296 12.0191 19.8693 11.9718C19.8679 11.9554 19.8631 11.9248 19.8478 11.8769C19.7569 11.5935 19.4997 11.4012 18.7987 11.2654C18.6392 11.2345 18.4784 11.2106 18.3084 11.1859C18.2957 11.184 18.2828 11.1822 18.2697 11.1803C18.1195 11.1586 17.9495 11.134 17.7967 11.104C17.6419 11.0737 17.418 11.0226 17.2083 10.9183C16.9978 10.8136 16.628 10.5646 16.5218 10.0651L16.5 9.96228V9.85714C16.5 7.90789 15.9926 6.43652 15.211 5.47359C14.4459 4.53088 13.3608 4 12 4C10.5955 4 9.52013 4.47649 8.77735 5.35846Z" fill="#cccccc"/>
</svg>
</Link>
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

