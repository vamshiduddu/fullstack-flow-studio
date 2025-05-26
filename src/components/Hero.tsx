
import { ChevronDown, Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Surendra Sana
          </h1>
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8 font-light">
            Full Stack Developer & Team Lead
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Creative, analytical, and detail-oriented developer with 4+ years of experience 
            in designing and developing high-performance web and mobile applications.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:surendrareddy0410@gmail.com" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors">
              <Mail size={20} />
              <span>surendrareddy0410@gmail.com</span>
            </a>
            <a href="tel:+19408437401" className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors">
              <Phone size={20} />
              <span>+1 940-843-7401</span>
            </a>
            <a 
              href="http://www.linkedin.com/in/surendra-reddy-sana-venkata-13a666266" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn Profile</span>
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Button>
            <Button 
              onClick={() => scrollToSection('about')}
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-blue-900 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-blue-900 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown 
          size={32} 
          className="text-blue-200 cursor-pointer hover:text-white transition-colors"
          onClick={() => scrollToSection('about')}
        />
      </div>
    </section>
  );
};

export default Hero;
