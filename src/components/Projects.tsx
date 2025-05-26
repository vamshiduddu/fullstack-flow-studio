import { ExternalLink, Github, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Dashboard",
      description: "Full-stack e-commerce admin dashboard with real-time analytics, inventory management, and order tracking. Built with React.js frontend and Node.js backend.",
      image: "/placeholder.svg",
      technologies: ["React.js", "Node.js", "PostgreSQL", "TypeScript", "Bootstrap"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full Stack"
    },
    {
      title: "AI Chat Platform",
      description: "Real-time chat application with AI integration using WebSockets. Features include message history, file sharing, and intelligent bot responses.",
      image: "/placeholder.svg",
      technologies: ["React.js", "Node.js", "Socket.io", "MySQL", "OpenAI API"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full Stack"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with drag-and-drop functionality, team collaboration features, and progress tracking.",
      image: "/placeholder.svg",
      technologies: ["Angular", "Node.js", "PostgreSQL", "HTML5", "CSS3"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Frontend"
    },
    {
      title: "Restaurant Ordering App",
      description: "Mobile-responsive restaurant ordering system with menu management, order tracking, and payment integration.",
      image: "/placeholder.svg",
      technologies: ["React.js", "Node.js", "MySQL", "Bootstrap", "Stripe API"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full Stack"
    },
    {
      title: "Weather Analytics Dashboard",
      description: "Interactive weather data visualization dashboard with historical data analysis and predictive charts using custom SVG components.",
      image: "/placeholder.svg",
      technologies: ["React.js", "D3.js", "Node.js", "REST API", "CSS3"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Frontend"
    },
    {
      title: "Content Management System",
      description: "Custom CMS with role-based access control, content scheduling, and multi-language support for enterprise clients.",
      image: "/placeholder.svg",
      technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Backend"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of full-stack applications demonstrating expertise in modern web technologies
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="outline"
                      className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <Globe size={16} className="mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-300 hover:bg-slate-50"
                    onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
            onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}
          >
            <Github size={20} className="mr-2" />
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
