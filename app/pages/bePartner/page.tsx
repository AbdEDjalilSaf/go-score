import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import beWithSchool from "@/public/beWithSchool.jpg";
import dealComplete from "@/public/dealComplete.jpg";
import data from './data.json';

function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${dealComplete.src})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="text-center space-y-4 p-4">
          <h1 className="text-4xl md:text-5xl font-bold">{data.hero.title}</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">{data.hero.subtitle}</h2>
          <div className="space-y-2">
            {data.hero.description.map((line, index) => (
              <p key={index} className="text-lg md:text-xl">{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Partnerships Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Schools Partnership */}
        <div className="col-span-1 rounded-lg hover:shadow-lg hover:shadow-pink-600  md:col-span-2 lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className='md:flex md:justify-between md:flex-row-reverse'>
                  <Suspense fallback={<div>Loading...</div>}>
               <Image
               src={beWithSchool}
               alt="Be with school partnership image"
               className='hidden md:block'
               width={400}
               height={600}
               />
                </Suspense>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-pink-600 mb-4">{data.partnerships[0].title}</h3>
                <p className="text-gray-600 mb-4">{data.partnerships[0].description}</p>
                <ul className="space-y-3 mb-6">
                  {data.partnerships[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-pink-500 ml-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pages/bePartner/schoolPartner">
                <button className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors" type='button'>
                  {data.partnerships[0].buttonText}
                </button>
                </Link>
              </div>
              </div>
            </div>
          </div>


        <div className="flex flex-col  gap-8 md:flex-row md:gap-8 lg:gap-12 mt-8">
          {/* Students Partnership */}
          <div className="bg-white w-full hover:shadow-lg hover:shadow-emerald-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">{data.partnerships[1].title}</h3>
              <ul className="space-y-3 mb-6">
                {data.partnerships[1].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-500 ml-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors" type="button">
                {data.partnerships[1].buttonText}
              </button>
            </div>
          </div>

          {/* Trainers Partnership */}
          <div className="bg-white w-full hover:shadow-lg hover:shadow-blue-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">{data.partnerships[2].title}</h3>
              <ul className="space-y-3 mb-6">
                {data.partnerships[2].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 ml-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pages/bePartner/teacherPartner">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" type="button">
                {data.partnerships[2].buttonText}
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;