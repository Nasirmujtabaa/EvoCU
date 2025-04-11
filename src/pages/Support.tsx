
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, MessageSquare, HelpCircle, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Success message
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Support Center</h1>
            <p className="text-gray-600 text-center mb-8">How can we help you today?</p>
            
            <Tabs defaultValue="contact" className="mb-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="help">Help Guides</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Get in touch with our support team</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 mt-0.5 text-indian-primary" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-gray-500">support@evocu.edu.in</p>
                          <p className="text-sm text-gray-500">For general inquiries: info@evocu.edu.in</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 mt-0.5 text-indian-primary" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-gray-500">+919541118287</p>
                          <p className="text-sm text-gray-500">Monday to Friday, 9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-0.5 text-indian-primary" />
                        <div>
                          <p className="font-medium">Visit Us</p>
                          <p className="text-sm text-gray-500">Chanakya University, Rural Bangalore</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 mt-0.5 text-indian-primary" />
                        <div>
                          <p className="font-medium">Social Media</p>
                          <div className="flex gap-3 mt-2">
                            <a href="#" className="text-gray-600 hover:text-indian-primary">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                              </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-indian-primary">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                              </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-indian-primary">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                              </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-indian-primary">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Name</label>
                          <Input 
                            id="name" 
                            placeholder="Your name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your.email@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                          <Input 
                            id="subject" 
                            placeholder="How can we help you?" 
                            value={subject} 
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">Message</label>
                          <Textarea 
                            id="message" 
                            placeholder="Please describe your issue or question in detail..." 
                            rows={4}
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full">Send Message</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find answers to common questions about our platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How do I register for an event?</AccordionTrigger>
                        <AccordionContent>
                          To register for an event, navigate to the event details page by clicking on any event card. 
                          On the event details page, you'll find a "Register" button. Click on it, fill in the required information, 
                          and confirm your registration. You'll receive a confirmation email with your registration details.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How can I create my own event?</AccordionTrigger>
                        <AccordionContent>
                          To create your own event, first ensure you have organizer privileges. 
                          Go to the Dashboard and click on the "Create Event" button. 
                          Fill in all the event details including title, description, date, time, location, and upload an event banner. 
                          Once submitted, your event will be reviewed by admins before being published.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I get a refund for a paid event?</AccordionTrigger>
                        <AccordionContent>
                          Refund policies vary by event. Generally, refunds are available if requested at least 48 hours 
                          before the event starts. For specific refund information, check the event details page or 
                          contact the event organizer directly. For assistance with refunds, please contact our support team.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                        <AccordionContent>
                          To update your profile information, click on your avatar icon in the top-right corner of the page 
                          and select "My Profile" from the dropdown menu. On your profile page, click the "Edit Profile" button 
                          to update your personal information, change your profile picture, or update your preferences.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Can I transfer my event ticket to someone else?</AccordionTrigger>
                        <AccordionContent>
                          Yes, in most cases you can transfer your ticket to another person. To do so, go to "My Registrations" 
                          in your Dashboard, find the event, and click on the "Transfer Ticket" option. Enter the email address 
                          of the person you want to transfer the ticket to. They will receive instructions to claim the ticket.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6">
                        <AccordionTrigger>How can I become an event organizer?</AccordionTrigger>
                        <AccordionContent>
                          To become an event organizer, you need to request organizer privileges. Go to your Profile settings 
                          and select "Request Organizer Access." Fill in the required information about your department or 
                          student organization. Your request will be reviewed by administrators, and you'll be notified once approved.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="help" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Guides</CardTitle>
                    <CardDescription>Step-by-step guides to help you navigate our platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Getting Started Guide</p>
                            <p className="text-sm text-gray-500 mt-1">Learn the basics of using our platform</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Event Registration Tutorial</p>
                            <p className="text-sm text-gray-500 mt-1">Step-by-step guide to register for events</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Organizing Events</p>
                            <p className="text-sm text-gray-500 mt-1">Learn how to create and manage your events</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Managing Your Calendar</p>
                            <p className="text-sm text-gray-500 mt-1">Tips for using the calendar feature efficiently</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Profile Customization</p>
                            <p className="text-sm text-gray-500 mt-1">How to personalize your profile settings</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      <a href="#" className="block p-4 border rounded-lg hover:border-indian-primary hover:bg-accent transition-colors">
                        <div className="flex items-start gap-3">
                          <HelpCircle className="w-5 h-5 mt-0.5 text-indian-primary" />
                          <div>
                            <p className="font-medium">Payment & Refunds</p>
                            <p className="text-sm text-gray-500 mt-1">Understanding the payment process</p>
                            <div className="flex items-center gap-1 mt-2 text-sm text-indian-primary">
                              <span>Read guide</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 mb-4">Can't find what you're looking for?</p>
                      <Button asChild>
                        <a href="#contact">Contact Support Team</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
