import React from 'react'

const loadDash = () => {
  return (
    <>
            <div className="text-center flex justify-center items-center min-h-[90vh] py-8">
             <div className="inline-block ml-2 animate-spin rounded-full h-10 w-10 border-b-2 border-purple-800"></div>
             <p className="mt-2 text-lg text-gray-600">جاري تحميل ...</p>
           </div>
    </>
  )
}

export default loadDash
