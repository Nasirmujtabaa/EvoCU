
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Graduation, Building, Users, Globe, BookOpen, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-100 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About EvoCU</h1>
              <p className="text-xl text-gray-600 mb-8">
                The comprehensive event management platform designed exclusively for universities.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  EvoCU was created with a single mission: to simplify the way university events are organized, promoted, and experienced.
                </p>
                <p className="text-lg text-gray-600">
                  We believe that campus events are the heart of university life, fostering community, learning, and growth. Our platform makes event management seamless so that organizers can focus on creating impactful experiences rather than drowning in logistics.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/lovable-uploads/70d9ecd2-403a-481c-970b-82646d3e51f9.png" 
                  alt="Students at university event" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Do */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h2>
              <p className="text-lg text-gray-600">
                EvoCU focuses on creating a comprehensive platform for university events across multiple domains.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-blue-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Events</h3>
                <p className="text-gray-600">
                  From research symposiums to guest lectures, we help academic departments organize and promote their events to the university community.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-green-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Festivals</h3>
                <p className="text-gray-600">
                  Support for cultural events, dance competitions, music concerts and art exhibitions that enrich the university experience.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="text-purple-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Competitions</h3>
                <p className="text-gray-600">
                  Platforms for hackathons, coding competitions, and technical workshops that foster innovation and skill development.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="text-yellow-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Club Activities</h3>
                <p className="text-gray-600">
                  Tools for university clubs to organize meetings, workshops, and special events for their members and the broader community.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="text-red-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sports Tournaments</h3>
                <p className="text-gray-600">
                  Support for organizing intra and inter-college sports competitions, tracking teams, and managing registrations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Graduation className="text-indigo-600 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Fairs</h3>
                <p className="text-gray-600">
                  Platforms for career services departments to organize job fairs, networking events, and recruitment drives.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide our platform and inform every feature we build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  We believe every student should have equal access to campus events and opportunities. Our platform is designed to be inclusive and accessible to all.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Empowerment</h3>
                <p className="text-gray-600">
                  We empower event organizers with the tools they need to create exceptional experiences without the hassle of complex logistics.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  We foster community engagement by making it easy for students to discover, register for, and participate in the events that interest them most.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously innovate our platform based on feedback from universities, organizers, and students to meet evolving needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
