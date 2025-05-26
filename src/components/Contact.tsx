
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "surendrareddy0410@gmail.com",
      href: "mailto:surendrareddy0410@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 940-843-7401",
      href: "tel:+19408437401"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: "http://www.linkedin.com/in/surendra-reddy-sana-venkata-13a666266"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Denton, TX",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together 
            to build something amazing.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-4">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{contact.label}</h3>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      className="text-blue-200 hover:text-white transition-colors break-words"
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-blue-200">{contact.value}</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-blue-100 mb-8">
              I'm always interested in hearing about new opportunities and exciting projects. 
              Whether you're looking to hire, collaborate, or just want to connect, I'd love to hear from you!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                <a href="mailto:surendrareddy0410@gmail.com" className="flex items-center gap-2">
                  <Send size={20} />
                  Send Email
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-blue-900 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                <a 
                  href="http://www.linkedin.com/in/surendra-reddy-sana-venkata-13a666266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-white/20 text-center">
        <p className="text-blue-200">
          © 2024 Surendra Sana. Built with React.js and modern web technologies.
        </p>
      </div>
    </section>
  );
};

export default Contact;
