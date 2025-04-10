
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      localStorage.setItem("subscribedEmail", email);
      setEmail("");
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/lovable-uploads/2379066d-cae1-4445-8c42-89b77b7c7983.png" 
                alt="EvoCU Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">EvoCU</span>
            </Link>
            <p className="text-gray-300 mb-6">
              The ultimate event management platform for universities. Organize, attend, and celebrate events effortlessly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indian-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-indian-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-indian-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-indian-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-indian-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-indian-primary transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-indian-primary transition-colors">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-300 hover:text-indian-primary transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-indian-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 text-indian-primary" />
                <span className="text-gray-300">
                  University Campus, Rural Bangalore, Chanakya University
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0 text-indian-primary" />
                <span className="text-gray-300">+919541118287</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0 text-indian-primary" />
                <span className="text-gray-300">support@evocu.edu</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with latest events and announcements
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-indian-primary hover:bg-indian-secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} EvoCU. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-indian-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-indian-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 text-sm hover:text-indian-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
