"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, FileCode, Github, Linkedin, Users } from "lucide-react"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80">
            Get to know more about my skills, experience, and passion for web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full card-hover">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <CardTitle>Web Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  I specialize in creating dynamic, responsive websites using HTML, CSS, JavaScript, and modern
                  frameworks like React and Next.js.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full card-hover">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FileCode className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <CardTitle>Software Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  I build robust, scalable applications with clean code practices, version control, and modern
                  development workflows.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full card-hover">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 dark:bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  I actively contribute to open-source projects and collaborate with teams to deliver exceptional
                  digital experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg mb-4">Connect with me on professional networks:</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="https://www.linkedin.com/in/aminu-abdullahi-440907124"
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-md bg-[#0077B5]/10 text-[#0077B5] dark:bg-[#0077B5]/20 dark:text-[#0077B5]/90 hover:bg-[#0077B5]/20 dark:hover:bg-[#0077B5]/30 transition-colors"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/campus9jam"
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-md bg-gray-800/10 text-gray-800 dark:bg-gray-200/10 dark:text-gray-200 hover:bg-gray-800/20 dark:hover:bg-gray-200/20 transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

