
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectShowcase from "@/components/ProjectShowcase";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ProjectShowcase />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
};

export default Index;
