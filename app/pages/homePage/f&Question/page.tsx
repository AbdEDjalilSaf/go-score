import FAQSection from "./f&qSection"
import faqData from "./data.json"

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <FAQSection data={faqData} />
    </main>
  )
}

