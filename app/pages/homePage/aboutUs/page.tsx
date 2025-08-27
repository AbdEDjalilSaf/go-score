import React from 'react';
import data from './data.json';

function page() {
  return (
    <>
      {/* Purple curved header */}
      <div className="relative bg-purple-800 h-48">
        <div className="container mx-auto px-4 pt-8">
          <h1 className="text-white text-5xl font-bold text-center" >
            {data.about.title}
          </h1>
        </div>
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            className="relative block w-full h-[60px]"
            preserveAspectRatio="none"
            aria-hidden="true">
            <path
              d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto mt-5 mb-12 shadow-xl w-fit py-20 px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-800 text-lg leading-relaxed text-right" style={{ direction: 'rtl' }}>
            {data.about.description}
          </p>
        </div>
      </div>
      </>
  );
}

export default page;