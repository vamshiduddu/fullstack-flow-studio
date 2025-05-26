
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experience = () => {
  const experiences = [
    {
      company: "Creationisto Solutions Pvt. Ltd",
      role: "Web Designer & Team Lead",
      period: "Dec 2022 - 2023",
      location: "Remote",
      achievements: [
        "Led the complete development lifecycle of Wulooj (https://www.wulooj.com/en/home), an AI-enabled Omni channel platform",
        "Designed and implemented responsive front-end using HTML5, CSS3, Bootstrap 5, JavaScript, and React.js",
        "Managed a team of 2 junior designers and collaborated with backend and product teams",
        "Integrated chatbot and customer service modules across platforms (WhatsApp, Instagram, Twitter, Facebook)",
        "Performed performance optimization using Google Lighthouse",
        "Delivered customer-centric service dashboards for domain registration, email services, CMS, analytics, and hosting",
        "Spearheaded AI-powered service platform development from scratch to production"
      ],
      technologies: ["Node.js", "JavaScript", "HTML5", "CSS", "React.js", "SQL", "PostgreSQL", "Unit Testing", "Bootstrap", "MySQL"]
    },
    {
      company: "Fonezela",
      role: "Web Designer",
      period: "2021 - 2022",
      location: "Remote",
      achievements: [
        "Created and deployed web and mobile apps with responsive layouts and cross-device compatibility",
        "Built UIs using HTML5, CSS3, JavaScript, and Bootstrap following mobile-first principles",
        "Collaborated with engineering and product teams to gather UI/UX requirements and implement user flows",
        "Conducted system testing, bug fixing, and handled user support post-launch",
        "EITARA (Landing Page): Designed landing page UI, developed user flows and sitemaps, tested usability",
        "Fuelwave Website: Developed responsive pages with Bootstrap 5 and JavaScript",
        "Supported issue tracking and risk identification within the team"
      ],
      technologies: ["Node.js", "JavaScript", "HTML5", "CSS", "React.js", "SQL", "PostgreSQL", "Unit Testing", "Bootstrap", "MySQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Professional Experience</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Building innovative solutions and leading development teams across diverse projects
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800">{exp.role}</CardTitle>
                    <h3 className="text-xl text-blue-600 font-semibold">{exp.company}</h3>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          variant="outline"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
