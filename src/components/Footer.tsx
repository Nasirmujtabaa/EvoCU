
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indian-primary text-white">
                <span className="text-lg font-bold">US</span>
              </div>
              <span className="text-xl font-bold">Utsav Sarthi</span>
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
                  University Campus, Sector 16C, Chanakya University, New Delhi
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0 text-indian-primary" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0 text-indian-primary" />
                <span className="text-gray-300">support@utsavsarthi.edu</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with latest events and announcements
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-indian-primary hover:bg-indian-secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Utsav Sammelan Sarthi. All rights reserved.
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
