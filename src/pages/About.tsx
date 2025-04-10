
import { Lightbulb, Calendar, Users, GraduationCap, GlobeIcon, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About EvoCU</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive event management platform designed specifically for university events across multiple domains.
            </p>
          </div>
        </div>
        
        {/* Mission Section */}
        <div className="py-16">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  EvoCU aims to transform how university events are organized, promoted, and experienced. 
                  We believe in creating a seamless connection between event organizers and attendees, 
                  making campus life more vibrant and accessible for everyone.
                </p>
                <p className="text-lg text-gray-600">
                  Our platform supports a wide range of events from academic conferences to cultural 
                  festivals, sports tournaments to technical hackathons, ensuring every campus activity 
                  has the digital infrastructure it needs to succeed.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/a80a907c-14f5-46ba-8d96-b09d5a2dd296.png" 
                  alt="Students collaborating" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Focus Areas */}
        <div className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Focus Areas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Academic Events</h3>
                <p className="text-gray-600">
                  Supporting conferences, symposiums, workshops, and seminars with robust registration and abstract submission systems.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Technical Events</h3>
                <p className="text-gray-600">
                  Facilitating hackathons, coding competitions, tech workshops and project showcases with participant tracking.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sports Tournaments</h3>
                <p className="text-gray-600">
                  Managing team registrations, match schedules, leaderboards, and real-time updates for campus sports events.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <GlobeIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cultural Festivals</h3>
                <p className="text-gray-600">
                  Supporting performances, exhibitions, competitions and cultural showcases with ticketing and audience management.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Campus-Wide Events</h3>
                <p className="text-gray-600">
                  Organizing orientation days, alumni meets, convocations, and annual celebrations with comprehensive scheduling.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cross-Departmental Activities</h3>
                <p className="text-gray-600">
                  Facilitating interdisciplinary events, collaborative projects, and joint ventures between different faculties.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-indian-primary mb-3">Accessibility</h3>
                  <p className="text-gray-600">
                    We believe every student and faculty member should have equal access to campus events 
                    regardless of their department, year, or background.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indian-primary mb-3">Community</h3>
                  <p className="text-gray-600">
                    We foster a sense of belonging through shared experiences, bringing together 
                    diverse groups within the university ecosystem.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indian-primary mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our platform based on user feedback and emerging needs 
                    of the academic community.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-indian-primary mb-3">Reliability</h3>
                  <p className="text-gray-600">
                    We provide a dependable infrastructure that event organizers can count on, 
                    even during peak usage periods like festival seasons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section - Brief Version */}
        <div className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              EvoCU is developed by a dedicated team of developers, designers, and campus event specialists 
              who understand the unique needs of university event management.
            </p>
            <p className="text-gray-600">
              Interested in joining our team? <a href="mailto:careers@evocu.edu" className="text-indian-primary">Contact us</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
