
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Download, 
  ExternalLink, 
  Heart, 
  Info, 
  MapPin, 
  MessageSquare, 
  QrCode, 
  Share2, 
  Star, 
  Ticket, 
  UserPlus, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

// Import the uploaded images
const musicEventImage = "public/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png";
const sportsEventImage = "public/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png";
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "public/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png";
const academicEventImage = "public/lovable-uploads/5d040975-9adb-46d8-b90b-7bbf133338b9.png";

// Event data
const events = [
  {
    id: "1",
    title: "Arijit Singh Live Concert",
    date: "April 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "University Auditorium",
    image: musicEventImage,
    category: "Music",
    organizer: "Cultural Committee",
    organizerLogo: "",
    attendees: 1250,
    featured: true,
    description: `Join us for an unforgettable evening as Arijit Singh, India's most beloved singer, performs live at our University Auditorium. Experience the magic of his soulful voice as he performs his greatest hits and new compositions.

The concert promises to be a mesmerizing experience with state-of-the-art sound and lighting systems. Limited seats available, so register early to secure your spot.

Refreshments will be provided, and merchandise will be available for purchase at the venue.`,
    agenda: [
      { time: "6:00 PM", activity: "Doors Open" },
      { time: "6:30 PM", activity: "Opening Act: University Music Band" },
      { time: "7:00 PM", activity: "Main Event: Arijit Singh Performance" },
      { time: "9:30 PM", activity: "Meet & Greet (VIP Pass Holders Only)" },
      { time: "10:00 PM", activity: "Event Concludes" }
    ],
    speakers: [
      { name: "Arijit Singh", role: "Singer", image: "" },
      { name: "Pritam Chakraborty", role: "Music Director", image: "" }
    ],
    registration: {
      status: "open",
      deadline: "April 10, 2025",
      fee: "₹1,500 (General), ₹2,500 (VIP)"
    },
    contact: {
      name: "Priya Mehta",
      email: "cultural@university.edu",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "2",
    title: "Inter-College Cricket Tournament",
    date: "March 10-15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "University Sports Complex",
    image: sportsEventImage,
    category: "Sports",
    organizer: "Sports Committee",
    organizerLogo: "",
    attendees: 850,
    featured: false,
    description: "Annual inter-college cricket tournament featuring teams from all over the region.",
    agenda: [],
    speakers: [],
    registration: {
      status: "open",
      deadline: "February 28, 2025",
      fee: "₹2,000 per team"
    },
    contact: {
      name: "Rahul Singh",
      email: "sports@university.edu",
      phone: "+91 97654 32109"
    }
  },
  {
    id: "3",
    title: "Annual Hackathon 2025",
    date: "May 5-6, 2025",
    time: "8:00 AM - 8:00 PM",
    location: "CS Department",
    image: techEventImage,
    category: "Tech",
    organizer: "Technical Committee",
    organizerLogo: "",
    attendees: 320,
    featured: false,
    description: "48-hour coding challenge to solve real-world problems using technology.",
    agenda: [],
    speakers: [],
    registration: {
      status: "coming_soon",
      deadline: "April 25, 2025",
      fee: "Free"
    },
    contact: {
      name: "Amit Kumar",
      email: "tech@university.edu",
      phone: "+91 95432 10987"
    }
  }
];

// Related events data
const relatedEvents = [
  {
    id: "7",
    title: "AR Rahman Musical Evening",
    date: "September 3, 2025",
    time: "7:30 PM",
    location: "Open Air Theatre",
    image: musicEventImage,
    category: "Music",
    organizer: "Cultural Club",
    attendees: 1500,
    featured: true
  },
  {
    id: "8",
    title: "Shankar Mahadevan Fusion Concert",
    date: "October 15, 2025",
    time: "7:00 PM",
    location: "University Auditorium",
    image: musicEventImage,
    category: "Music",
    organizer: "Music Department",
    attendees: 950,
    featured: false
  },
  {
    id: "9",
    title: "Classical Music Workshop",
    date: "November 10, 2025",
    time: "10:00 AM",
    location: "Music Room",
    image: musicEventImage,
    category: "Music",
    organizer: "Fine Arts Society",
    attendees: 120,
    featured: false
  }
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [registered, setRegistered] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Find the current event data
  const currentEvent = events.find(event => event.id === id) || events[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50">
        {/* Event Hero Section */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={currentEvent.image}
            alt={currentEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link to="/events" className="text-white hover:text-gray-200 flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Events
                  </Link>
                  <span className="text-gray-300">|</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-white/20 text-white">
                    {currentEvent.category}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {currentEvent.title}
                </h1>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/90 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span>{currentEvent.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    <span>{currentEvent.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{currentEvent.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" />
                    <span>{currentEvent.attendees} attending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  {liked ? "Saved" : "Save"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-indian-primary hover:bg-indian-secondary">
                      <Ticket className="w-4 h-4 mr-2" />
                      Register Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Registration Confirmation</DialogTitle>
                      <DialogDescription>
                        You're about to register for the event: {currentEvent.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="rounded-lg border p-4 mb-4">
                        <div className="font-medium">Event Details</div>
                        <div className="text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{currentEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>{currentEvent.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{currentEvent.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <div className="font-medium">Registration Fee</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {currentEvent.registration.fee}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setRegistered(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-indian-primary hover:bg-indian-secondary"
                        onClick={() => {
                          setRegistered(true);
                        }}
                      >
                        Confirm Registration
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="attendees">Attendees</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-0">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-4">Event Description</h2>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {currentEvent.description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-indian-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Date</div>
                          <div className="text-gray-600">{currentEvent.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-indian-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Time</div>
                          <div className="text-gray-600">{currentEvent.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-indian-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-gray-600">{currentEvent.location}</div>
                          <a href="#" className="text-indian-primary text-sm hover:underline">
                            View Map
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-indian-softPurple flex items-center justify-center flex-shrink-0">
                          <Ticket className="w-5 h-5 text-indian-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Registration Fee</div>
                          <div className="text-gray-600">{currentEvent.registration.fee}</div>
                          <div className="text-sm text-gray-500">
                            Deadline: {currentEvent.registration.deadline}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Contact Information</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-indian-primary text-white">
                            {currentEvent.contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{currentEvent.contact.name}</div>
                          <div className="text-sm text-gray-500">Event Coordinator</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-700">Email:</div>
                          <a href={`mailto:${currentEvent.contact.email}`} className="text-sm text-indian-primary hover:underline">
                            {currentEvent.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-gray-700">Phone:</div>
                          <a href={`tel:${currentEvent.contact.phone}`} className="text-sm text-indian-primary hover:underline">
                            {currentEvent.contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="agenda" className="mt-0">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-6">Event Schedule</h2>
                    
                    {currentEvent.agenda.length > 0 ? (
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                        
                        <div className="space-y-8">
                          {currentEvent.agenda.map((item, index) => (
                            <div key={index} className="relative pl-10">
                              <div className="absolute left-0 w-8 h-8 rounded-full bg-indian-softPurple flex items-center justify-center z-10">
                                <div className="w-3 h-3 rounded-full bg-indian-primary"></div>
                              </div>
                              
                              <div className="text-sm text-gray-500 mb-1">{item.time}</div>
                              <div className="font-medium text-gray-900">{item.activity}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Info className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Agenda Not Available</h3>
                        <p className="text-gray-500">
                          The detailed agenda for this event will be published soon.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="speakers" className="mt-0">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-6">Event Speakers</h2>
                    
                    {currentEvent.speakers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentEvent.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                            <Avatar className="w-16 h-16">
                              <AvatarFallback className="text-lg bg-indian-primary text-white">
                                {speaker.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <h3 className="font-semibold text-lg">{speaker.name}</h3>
                              <p className="text-gray-500">{speaker.role}</p>
                              
                              <div className="flex items-center gap-2 mt-3">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <UserPlus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Info className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No Speakers Listed</h3>
                        <p className="text-gray-500">
                          Information about speakers for this event will be updated soon.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="attendees" className="mt-0">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Attendees ({currentEvent.attendees})</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="#invite">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Invite Friends
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                          <Avatar className="w-16 h-16 mb-3">
                            <AvatarFallback className="bg-indian-softPurple text-indian-primary">
                              {String.fromCharCode(65 + index)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-sm">Student {index + 1}</div>
                          <div className="text-xs text-gray-500">Department of CS</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-6">
                      <Button variant="outline" size="sm">
                        View All Attendees
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussions" className="mt-0">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold mb-6">Event Discussions</h2>
                    
                    <div className="space-y-6">
                      {/* Sample comments */}
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-indian-softPurple text-indian-primary">RS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Rahul Sharma</span>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            This looks amazing! I've been wanting to attend an Arijit Singh concert for years. Can't wait!
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                              <Heart className="w-3.5 h-3.5" />
                              <span>12</span>
                            </button>
                            <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-indian-softPurple text-indian-primary">AM</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">Ananya Mehta</span>
                            <span className="text-xs text-gray-500">5 days ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Does anyone know if there's student discount available for this concert?
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                              <Heart className="w-3.5 h-3.5" />
                              <span>5</span>
                            </button>
                            <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </button>
                          </div>
                          
                          {/* Reply */}
                          <div className="mt-4 pl-6 border-l-2 border-gray-100">
                            <div className="flex gap-3">
                              <Avatar className="w-7 h-7">
                                <AvatarFallback className="text-xs bg-indian-primary text-white">PM</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">Priya Mehta</span>
                                  <span className="text-xs text-gray-500">3 days ago</span>
                                </div>
                                <p className="text-gray-700 text-sm">
                                  Yes, students get a 20% discount with valid ID. Check with the event organizers at the registration desk.
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span>8</span>
                                  </button>
                                  <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-indian-primary">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Reply</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 border-t pt-6">
                      <h3 className="font-medium mb-3">Leave a Comment</h3>
                      <textarea
                        className="w-full border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indian-primary focus:border-transparent"
                        rows={3}
                        placeholder="Share your thoughts about this event..."
                      ></textarea>
                      <div className="flex justify-end mt-3">
                        <Button className="bg-indian-primary hover:bg-indian-secondary">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Registration Status */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                {registered ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">You're Registered!</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      We've sent the confirmation details to your email.
                    </p>
                    <div className="rounded-lg border p-3 bg-gray-50 mb-4">
                      <div className="flex justify-center">
                        <QrCode className="w-32 h-32 text-gray-800" />
                      </div>
                      <div className="text-xs text-center text-gray-500 mt-2">
                        Show this QR code at the venue for check-in
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Ticket
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-4">Registration Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status</span>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {currentEvent.registration.status === "open" ? "Open" : "Coming Soon"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Deadline</span>
                        <span className="font-medium">{currentEvent.registration.deadline}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Registration Fee</span>
                        <span className="font-medium">{currentEvent.registration.fee}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available Seats</span>
                        <span className="font-medium">250 / 1500</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full bg-indian-primary hover:bg-indian-secondary">
                        <Ticket className="w-4 h-4 mr-2" />
                        Register Now
                      </Button>
                      <div className="text-center text-xs text-gray-500 mt-3">
                        Registrations close on {currentEvent.registration.deadline}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Event Organizer */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Event Organizer</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-indian-primary text-white">
                      {currentEvent.organizer.split(' ')[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{currentEvent.organizer}</div>
                    <div className="text-sm text-gray-500">Event Organizer</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  We organize cultural events across the university to promote arts and music.
                </p>
                
                <Button variant="outline" size="sm" className="w-full">
                  View Organizer Profile
                </Button>
              </div>
              
              {/* Event Location */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Event Location</h3>
                
                <div className="rounded-lg overflow-hidden h-[200px] bg-gray-100 mb-4">
                  {/* Map placeholder - In a real app, this would be an actual map */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                
                <div className="font-medium mb-1">{currentEvent.location}</div>
                <p className="text-sm text-gray-600 mb-4">
                  University Campus,<br />
                  Sector 16C, New Delhi,<br />
                  India - 110001
                </p>
                
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
              
              {/* Rating & Reviews */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Ratings & Reviews</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl font-bold">4.8</div>
                  <div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on 24 reviews</div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  See All Reviews
                </Button>
              </div>
              
              {/* Related Events */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Related Events</h3>
                
                <div className="space-y-4">
                  {relatedEvents.map((event) => (
                    <Link to={`/events/${event.id}`} key={event.id} className="flex gap-3 group">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-indian-primary transition-colors">
                          {event.title}
                        </h4>
                        <div className="text-xs text-gray-500">{event.date}</div>
                        <div className="text-xs text-gray-500">{event.location}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" asChild className="text-indian-primary">
                    <Link to="/events?category=music">View All Music Events</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
