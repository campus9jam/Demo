import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Skills from "@/components/skills"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  )
}

