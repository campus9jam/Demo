"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 dark:from-background/95 dark:to-background/80" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-medium text-sm">
              Web Developer & Software Engineer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              Hi, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Aminu Abdullahi
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
              I create stunning, responsive websites and applications that help businesses grow and succeed in the
              digital world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#contact">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Hire Me
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="https://wa.me/2348160631061" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9 14a5 5 0 0 0 6 0" />
                  </svg>
                  WhatsApp Me
                </a>
              </Button>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <a
                href="https://github.com/campus9jam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/aminu-abdullahi-440907124"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:Aminuarogo@gmail.com"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-accent opacity-75 blur"></div>
              <div className="relative rounded-xl overflow-hidden bg-background dark:bg-background">
                <img src="/placeholder.svg?height=600&width=600" alt="Aminu Abdullahi" className="w-full h-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

