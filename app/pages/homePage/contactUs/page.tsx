import ContactForm from "./contact-form"
import contactData from "./data.json"

export default function Home() {
  return (
    <main className="">
      <ContactForm data={contactData} />
    </main>
  )
}

