"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online store with product catalog, shopping cart, and secure checkout.",
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com/campus9jam/project1",
      demo: "https://project1-demo.vercel.app",
      tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    },
    {
      id: 2,
      title: "Portfolio Dashboard",
      description: "A responsive dashboard for tracking investments and financial portfolio performance.",
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com/campus9jam/project2",
      demo: "https://project2-demo.vercel.app",
      tags: ["TypeScript", "React", "Chart.js", "Firebase"],
    },
    {
      id: 3,
      title: "Social Media App",
      description: "A modern social networking platform with real-time messaging and content sharing.",
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com/campus9jam/project3",
      demo: "https://project3-demo.vercel.app",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    },
    {
      id: 4,
      title: "Task Management Tool",
      description: "A collaborative task management application with drag-and-drop interface and team features.",
      image: "/placeholder.svg?height=400&width=600",
      github: "https://github.com/campus9jam/project4",
      demo: "https://project4-demo.vercel.app",
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My Portfolio</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80">Check out some of my recent projects and work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden h-full card-hover">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{project.title}</span>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{project.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/campus9jam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Github className="mr-2 h-5 w-5" />
              View More Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

