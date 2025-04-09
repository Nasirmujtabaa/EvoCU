
import { useState } from "react";
import { BookOpen, Check, HelpCircle, MessageSquare, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to the server
    console.log({ name, email, subject, message });
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-indian-primary py-16 relative overflow-hidden">
          <div className="absolute inset-0 rangoli-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Find answers, get support, and share your feedback with our team
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="faq" className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="faq" className="text-sm md:text-base py-3">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm md:text-base py-3">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="guides" className="text-sm md:text-base py-3">
                  <BookOpen className="w-4 h-4 mr-2" />
                  User Guides
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq">
                <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left font-medium">
                        How do I register for an event?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p className="mb-2">
                          Registering for an event is easy! Just follow these steps:
                        </p>
                        <ol className="list-decimal ml-5 space-y-1">
                          <li>Navigate to the event page by clicking on the event card or searching for it</li>
                          <li>Click the "Register Now" button on the event details page</li>
                          <li>Fill in any required information and confirm your registration</li>
                          <li>You'll receive a confirmation email with a QR code for check-in</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left font-medium">
                        Can I create and manage my own events?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p className="mb-2">
                          Yes, you can create and manage your own events through our platform. However, you'll need specific permissions based on your role:
                        </p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>Student Body Representatives and Club Leaders can create events for their organizations</li>
                          <li>Faculty members can create departmental events</li>
                          <li>Staff members with appropriate roles can create university-wide events</li>
                        </ul>
                        <p className="mt-2">
                          To request event creation privileges, please contact your department head or the student activities office.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left font-medium">
                        How do I check in for an event?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p>
                          For events that require check-in, simply show the QR code from your registration confirmation to the event organizer at the venue. They will scan your code using the app, which will mark your attendance automatically. If you don't have your QR code, you can also check in manually by providing your student ID or registered email address.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left font-medium">
                        How can I receive notifications about upcoming events?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p className="mb-2">
                          You can receive notifications in several ways:
                        </p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>In-app notifications for events you're registered for or have shown interest in</li>
                          <li>Email notifications (adjust frequency in settings)</li>
                          <li>SMS alerts for important updates (optional)</li>
                          <li>Calendar integration with Google Calendar or Apple Calendar</li>
                        </ul>
                        <p className="mt-2">
                          Manage your notification preferences in your account settings.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left font-medium">
                        How can I give feedback for an event I attended?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p>
                          After attending an event, you'll receive a feedback request via email or in-app notification. Click the link to rate the event and provide your comments. Alternatively, you can visit the event page and scroll to the feedback section to share your thoughts. Your feedback helps organizers improve future events!
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left font-medium">
                        What should I do if I can no longer attend an event I registered for?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        <p>
                          If you can't attend an event you've registered for, please cancel your registration as soon as possible. Go to "My Events" in your dashboard, find the event, and click "Cancel Registration." This allows someone else to take your spot, especially for events with limited capacity. Some paid events may have specific cancellation policies and refund timeframes.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="contact">
                <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Contact Our Support Team</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-600 mb-6">
                        Fill out the form and our team will get back to you within 24 hours.
                      </p>
                      
                      {submitted ? (
                        <div className="rounded-lg bg-green-50 border border-green-200 p-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-green-800">Message Sent!</h3>
                              <p className="text-green-700 text-sm">
                                We'll get back to you as soon as possible.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Your Name
                            </label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Subject
                            </label>
                            <Input
                              id="subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Your Message
                            </label>
                            <Textarea
                              id="message"
                              rows={5}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            />
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-indian-primary hover:bg-indian-secondary"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </form>
                      )}
                    </div>
                    
                    <div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
                        
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                              <Phone className="w-5 h-5 text-indian-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Phone Support</div>
                              <div className="text-gray-600 mb-1">Monday to Friday, 9AM-5PM</div>
                              <a href="tel:+919876543210" className="text-indian-primary hover:underline">
                                +91 98765 43210
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="w-5 h-5 text-indian-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Email Support</div>
                              <div className="text-gray-600 mb-1">24/7 Support</div>
                              <a href="mailto:support@utsavsarthi.edu" className="text-indian-primary hover:underline">
                                support@utsavsarthi.edu
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                              <HelpCircle className="w-5 h-5 text-indian-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Help Center</div>
                              <div className="text-gray-600 mb-1">Browse our knowledge base</div>
                              <a href="#" className="text-indian-primary hover:underline">
                                Visit Help Center
                              </a>
                            </div>
                          </div>
                          
                          <div className="bg-indian-softPurple p-4 rounded-lg">
                            <div className="font-semibold mb-2">Event Management Office</div>
                            <p className="text-sm text-gray-700 mb-2">
                              Room 204, Student Activity Center<br />
                              University Campus, Sector 16C<br />
                              New Delhi, India - 110001
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Office Hours:</span> 9:00 AM - 5:00 PM (Monday to Friday)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="guides">
                <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">User Guides & Tutorials</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Learn the basics of using the Utsav Sarthi platform to find and join events.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Creating & Managing Events</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          A comprehensive guide for event organizers to create and manage successful events.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Attendance & Check-in</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Learn how to use the QR code system for event check-ins and track attendance.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Feedback & Ratings</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          How to provide and collect meaningful feedback to improve future events.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Mobile App Guide</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Get the most out of the Utsav Sarthi mobile app for on-the-go event management.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden group">
                      <div className="h-40 bg-gray-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400 group-hover:text-indian-primary transition-colors" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Administrator's Handbook</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Advanced guide for system administrators and department coordinators.
                        </p>
                        <Button asChild variant="link" className="text-indian-primary p-0 h-auto">
                          <a href="#">Read Guide</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-indian-softPurple rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Need Personal Training?</h3>
                        <p className="text-gray-700">
                          We offer personalized training sessions for event organizers and administrators.
                        </p>
                      </div>
                      <Button className="whitespace-nowrap bg-indian-primary hover:bg-indian-secondary">
                        Schedule Training
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
