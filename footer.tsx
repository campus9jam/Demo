"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-muted dark:bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-poppins font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                ROGO
              </span>
            </Link>
            <p className="text-foreground/80 mb-4 max-w-md">
              I create stunning, responsive websites and applications that help businesses grow and succeed in the
              digital world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/campus9jam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aminu-abdullahi-440907124"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:Aminuarogo@gmail.com"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-foreground/80 hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-foreground/80 hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-foreground/80">
                <a href="mailto:Aminuarogo@gmail.com" className="hover:text-primary transition-colors">
                  Aminuarogo@gmail.com
                </a>
              </li>
              <li className="text-foreground/80">
                <a
                  href="https://wa.me/2348160631061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +234 8160631061
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/80 text-sm">
            &copy; {new Date().getFullYear()} Aminu Abdullahi. All rights reserved.
          </p>
          <Button variant="ghost" size="icon" className="mt-4 md:mt-0" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

