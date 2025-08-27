"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import data from "./data.json"

export default  function Home() {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('المدونة');

  const { categories } = data;

const blogData = data.cards.filter((card) => card.role === activeCategory);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      
      {/* Desktop Navigation */}
      <nav className="bg-white mt-8">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16 relative">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={category.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(category.name);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category.name
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {category.name}
                  {activeCategory === category.name && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 transform"></span>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="absolute right-0 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              type="button">
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={category.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(category.name);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 text-base font-medium text-center relative ${
                    activeCategory === category.name
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  } transition-colors`}
                >
                  {category.name}
                  {activeCategory === category.name && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative" style={{ backgroundColor: card.bgColor }}>
                <Suspense fallback={<div>Loading...</div>}>
                <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                </Suspense>
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="bg-white text-purple-800 text-xs font-medium px-2 py-1 rounded self-start">
                    {card.category}
                  </div>
                  <h3 className="text-white text-xl font-bold">{card.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">{card.subtitle}</h4>
                <p className="text-gray-700 text-sm mb-4">{card.description}</p>
                <Link href={card.url} className="text-purple-700 text-sm font-medium hover:underline">
                  اقرأ المزيد
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-bold text-center mb-6">الروابط المهمة</h3>
          <div className="grid grid-cols-1 place-items-center md:place-items-start xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            {data.footerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="bg-purple-700  w-[70%] text-white text-base p-3 rounded-full  hover:bg-purple-800"
              >
                {link.title}
              </Link>
            ))}
          </div>
          
        </div>
      </footer>
    </div>
  )
}

