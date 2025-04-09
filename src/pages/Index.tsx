
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Check, 
  ChevronRight, 
  Clock, 
  Search, 
  QrCode, 
  Bell, 
  Shield, 
  Wifi, 
  Share2,
  Users,
  Music,
  Code,
  Paintbrush,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";

// Import the uploaded images
const headerImage = "public/lovable-uploads/ef443086-ae37-4ba7-8cef-bfee1fc4fdbd.png";
const musicEventImage = "public/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png";
const sportsEventImage = "public/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png";
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "public/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png";
const academicEventImage = "public/lovable-uploads/5d040975-9adb-46d8-b90b-7bbf133338b9.png";

const Index = () => {
  const [email, setEmail] = useState("");

  // Featured events data
  const featuredEvents = [
    {
      id: "1",
      title: "Arijit Singh Live Concert",
      date: "April 15, 2025",
      time: "7:00 PM",
      location: "University Auditorium",
      image: musicEventImage,
      category: "Music",
      organizer: "Cultural Committee",
      attendees: 1250,
      featured: true
    },
    {
      id: "2",
      title: "Inter-College Cricket Tournament",
      date: "March 10-15, 2025",
      time: "9:00 AM",
      location: "University Sports Complex",
      image: sportsEventImage,
      category: "Sports",
      organizer: "Sports Committee",
      attendees: 850,
      featured: false
    },
    {
      id: "3",
      title: "Annual Hackathon 2025",
      date: "May 5-6, 2025",
      time: "8:00 AM",
      location: "CS Department",
      image: techEventImage,
      category: "Tech",
      organizer: "Technical Committee",
      attendees: 320,
      featured: false
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      content: "Organizing our department's annual tech fest was a breeze with Utsav Sarthi. The automated notifications and attendance tracking saved us countless hours!",
      author: {
        name: "Rahul Sharma",
        role: "CS Department Head"
      }
    },
    {
      content: "As a student event coordinator, this platform has been a game-changer. I can now focus on making events memorable rather than getting lost in paperwork!",
      author: {
        name: "Priya Patel",
        role: "Student Council President"
      }
    },
    {
      content: "The real-time attendance tracking helped us accurately measure student engagement. It's revolutionized how we plan and improve our cultural events.",
      author: {
        name: "Dr. Anjali Singh",
        role: "Cultural Affairs Director"
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 rangoli-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Effortless <span className="text-indian-primary">Event Management</span> for Your University
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Experience seamless coordination for every event – from cultural festivals to hackathons, cricket matches to classical performances.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-indian-primary hover:bg-indian-secondary font-medium text-lg"
                >
                  <Link to="/register">
                    Get Started 
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-indian-primary text-indian-primary hover:bg-indian-softPurple font-medium text-lg"
                >
                  <Link to="/events">Explore Events</Link>
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indian-primary">100+</p>
                  <p className="text-sm text-gray-600">Monthly Events</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-indian-primary">10K+</p>
                  <p className="text-sm text-gray-600">Happy Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-indian-primary">50+</p>
                  <p className="text-sm text-gray-600">Event Categories</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 lg:flex lg:justify-end">
              <img 
                src={headerImage} 
                alt="Students enjoying an event" 
                className="rounded-lg shadow-xl max-w-full h-auto animate-scale-in"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exciting upcoming events happening around your university campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild
              variant="outline" 
              className="border-indian-primary text-indian-primary hover:bg-indian-softPurple"
            >
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Event Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Event Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find events that match your interests and passions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/events?category=tech" className="group">
              <div className="bg-blue-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tech Events</h3>
                <p className="text-gray-600">
                  Hackathons, workshops, coding competitions, and tech talks
                </p>
              </div>
            </Link>
            
            <Link to="/events?category=music" className="group">
              <div className="bg-purple-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Music className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Music Events</h3>
                <p className="text-gray-600">
                  Concerts, music festivals, battle of bands, and classical performances
                </p>
              </div>
            </Link>
            
            <Link to="/events?category=sports" className="group">
              <div className="bg-green-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sports Events</h3>
                <p className="text-gray-600">
                  Cricket, football, athletics, chess tournaments and competitions
                </p>
              </div>
            </Link>
            
            <Link to="/events?category=cultural" className="group">
              <div className="bg-yellow-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                  <Paintbrush className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Events</h3>
                <p className="text-gray-600">
                  Dance competitions, drama, art exhibitions, and cultural festivals
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to organize and participate in university events
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Smart Search"
              description="Find events quickly with our powerful search and filtering system."
            />
            
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Event Calendar"
              description="View all events in an intuitive calendar format for easy planning."
            />
            
            <FeatureCard
              icon={<QrCode className="w-6 h-6" />}
              title="QR Check-in"
              description="Hassle-free attendance tracking with QR code scanning."
            />
            
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="Notifications"
              description="Get timely reminders and updates about upcoming events."
            />
            
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure Data"
              description="Your event data and personal information are always protected."
            />
            
            <FeatureCard
              icon={<Wifi className="w-6 h-6" />}
              title="Offline Access"
              description="Access event details even without an internet connection."
            />
            
            <FeatureCard
              icon={<Share2 className="w-6 h-6" />}
              title="Easy Sharing"
              description="Share event details with friends across social platforms."
            />
            
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Organizer Tools"
              description="Powerful dashboard for event organizers to manage everything."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from students and faculty who've transformed their event experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indian-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Event Experience?</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Join thousands of students and staff who've already simplified their event management
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="bg-white text-indian-primary hover:bg-white/90 whitespace-nowrap">
                Get Started
              </Button>
            </div>
            <p className="text-sm text-white/80 mt-3 text-center">
              By signing up, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </div>
          
          <div className="mt-12 flex justify-center gap-x-6 gap-y-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white shrink-0" />
              <span>Free for students</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white shrink-0" />
              <span>Easy to use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white shrink-0" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white shrink-0" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
