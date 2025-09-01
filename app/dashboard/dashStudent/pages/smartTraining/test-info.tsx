interface TestInfoProps {
  testInfo: {
    quantitativeSection: string
    verbalSection: string
    questionsCount: number
    expectedTime: string
  }
}

export default function TestInfo({ testInfo }: TestInfoProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-4">
      <h2 className="text-center text-orange-500 font-bold text-xl mb-4">معلومات الاختبار</h2>

      <div className="flex flex-col px-2 justify-between md:flex-row-reverse gap-7 text-center mb-6">
        <div>
          <h3 className="text-blue-600 font-bold mb-1">الزمن المتوقع</h3>
          <p className="text-gray-800">{testInfo.expectedTime}</p>
        </div>
        <div>
          <h3 className="text-blue-600 font-bold mb-1">عدد الأسئلة</h3>
          <p className="text-gray-800">{testInfo.questionsCount}</p>
        </div>
        <div>
          <h3 className="text-blue-600 font-bold mb-1">القسم اللفظي</h3>
          <p className="text-gray-800">{testInfo.verbalSection}</p>
        </div>
        <div>
          <h3 className="text-blue-600 font-bold mb-1">القسم الكمي</h3>
          <p className="text-gray-800">{testInfo.quantitativeSection}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-purple-800 text-white py-2 px-8 rounded-md font-medium">ابدأ الاختبار</button>
      </div>
    </div>
  )
}
