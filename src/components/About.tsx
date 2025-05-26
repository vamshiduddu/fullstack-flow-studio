
import { Code, Users, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Full Stack Expertise",
      description: "4+ years of hands-on experience with React.js, Node.js, and modern web technologies"
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Led development teams and mentored junior developers while delivering complex projects"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Creative approach to solving complex technical challenges with scalable solutions"
    },
    {
      icon: Award,
      title: "Quality Focused",
      description: "Strong emphasis on code quality, testing, and delivering robust applications"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            I'm a passionate Full Stack Developer with over 4 years of experience in creating 
            high-performance web and mobile applications. My expertise spans the entire development 
            lifecycle, from initial design and architecture to deployment and maintenance.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            I specialize in building scalable, secure, and visually engaging applications using 
            modern technologies like React.js, Node.js, and various database systems. My approach 
            balances business goals with technical implementation to deliver exceptional user experiences.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            As a team leader, I've successfully managed development teams, conducted code reviews, 
            and mentored junior developers while maintaining high coding standards and fostering growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <highlight.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{highlight.title}</h3>
                <p className="text-slate-600">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
