import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink, Github, Monitor } from 'lucide-react';
import TaskManager from './projects/TaskManager';
import WeatherDashboard from './projects/WeatherDashboard';

const ProjectShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const projects = [
    {
      id: 'task-manager',
      title: 'Task Management System',
      description: 'A collaborative project management tool with drag-and-drop functionality, real-time updates, and team collaboration features built with React and Node.js.',
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'WebSocket', 'TypeScript'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/surendrasana/task-manager',
      liveUrl: 'https://task-manager-demo.vercel.app',
      component: TaskManager
    },
    {
      id: 'weather-dashboard',
      title: 'Weather Analytics Dashboard',
      description: 'Interactive weather data visualization dashboard with real-time updates, historical data analysis, and predictive charts using custom React components.',
      technologies: ['React.js', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
      category: 'Frontend',
      githubUrl: 'https://github.com/surendrasana/weather-dashboard',
      liveUrl: 'https://weather-dashboard-demo.vercel.app',
      component: WeatherDashboard
    }
  ];

  const ActiveComponent = activeDemo ? projects.find(p => p.id === activeDemo)?.component : null;

  if (activeDemo && ActiveComponent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {projects.find(p => p.id === activeDemo)?.title}
            </h1>
            <Button 
              variant="outline" 
              onClick={() => setActiveDemo(null)}
              className="flex items-center gap-2"
            >
              ← Back to Projects
            </Button>
          </div>
        </div>
        <div className="py-8">
          <ActiveComponent />
        </div>
      </div>
    );
  }

  return (
    <section id="project-showcase" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Interactive Project Demos</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore live, interactive demonstrations of full-stack applications with complete source code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {project.category}
                    </Badge>
                    <Monitor size={24} className="opacity-75" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{project.description}</p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => setActiveDemo(project.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    <Monitor size={16} />
                    View Live Demo
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                      className="flex items-center justify-center gap-2"
                    >
                      <Github size={14} />
                      Source Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={14} />
                      Live Site
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Code size={16} />
                    <span>Complete source code available on GitHub</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Want to see more projects? Check out my GitHub profile for additional repositories.</p>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
            onClick={() => window.open('https://github.com/surendrasana', '_blank', 'noopener,noreferrer')}
          >
            <Github size={20} className="mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
