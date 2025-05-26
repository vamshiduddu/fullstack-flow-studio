
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: ["React.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "LESS", "Responsive Design"]
    },
    {
      title: "Backend Technologies",
      skills: ["Node.js", "PHP", "RESTful APIs", "GraphQL", "Microservices", "Server-Sent Events", "Web Sockets"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "PostgreSQL", "Oracle SQL", "NoSQL", "Database Design", "Query Optimization"]
    },
    {
      title: "Tools & Methodologies",
      skills: ["Figma", "Zeplin", "Unit Testing", "Integration Testing", "Agile", "Scrum", "Git", "Linux", "Windows", "Mac"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Technical Skills</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and methodologies for building robust applications
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
