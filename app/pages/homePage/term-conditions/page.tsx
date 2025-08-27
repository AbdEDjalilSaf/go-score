import termsData from "./data.json"

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      {/* Curved purple header */}
      <div className="relative bg-purple-900 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-2">{termsData.title}</h1>
          <p className="text-lg">{termsData.lastUpdated}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "50px" }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }} aria-hidden="true">
            <path
              d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "white" }}
            ></path>
          </svg>
        </div>
      </div>
 
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-gray-700 text-center mb-8">{termsData.introduction}</p>

          {termsData.sections.map((section, index) => (
            <div key={index} className="mb-10">
              {section.title && <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">{section.title}</h2>}
              <p className="text-gray-700 text-right leading-relaxed mb-4">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

