
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Share2, 
  Heart, 
  Bookmark, 
  ChevronLeft,
  DollarSign,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample events data
const eventsData = [
  {
    id: "1",
    title: "CPL (Chanakya Premier League)",
    date: "April 10-24, 2025",
    time: "9:00 AM",
    location: "University Sports Complex",
    image: "/lovable-uploads/78c51d2b-62e0-4f69-a05b-b457cf03c55f.png",
    category: "Sports",
    organizer: "Sports Committee",
    attendees: 850,
    featured: true,
    price: "₹200",
    description: "Get ready for the most exciting cricket tournament of the year! The Chanakya Premier League brings together the best cricketers from across colleges to compete in a thrilling format. Experience the excitement, team spirit, and competitive atmosphere as teams battle it out for the prestigious CPL trophy. With live commentary, refreshments, and prizes for spectators, this is an event you won't want to miss.",
    contactEmail: "sports@chanakya.edu",
    contactPhone: "+919541118287",
    startDate: "April 10, 2025",
    endDate: "April 24, 2025",
    registrationEnd: "April 5, 2025",
    maxAttendees: 1000,
    venue: "University Sports Complex, Main Ground",
    venueAddress: "Chanakya University, Rural Bangalore",
    organizers: [
      {
        name: "Sports Committee",
        role: "Main Organizer"
      },
      {
        name: "Student Council",
        role: "Co-organizer"
      }
    ],
    speakers: [],
    schedule: [
      {
        date: "April 10, 2025",
        time: "9:00 AM",
        title: "Opening Ceremony"
      },
      {
        date: "April 10-22, 2025",
        time: "Various",
        title: "League Matches"
      },
      {
        date: "April 23, 2025",
        time: "3:00 PM",
        title: "Semi-Finals"
      },
      {
        date: "April 24, 2025",
        time: "5:00 PM",
        title: "Finals & Closing Ceremony"
      }
    ]
  },
  {
    id: "2",
    title: "Arijit Singh Live Concert",
    date: "April 30, 2025",
    time: "7:00 PM",
    location: "University Auditorium",
    image: "/lovable-uploads/8375f1c6-6533-40ff-b2ef-df2485f63196.png",
    category: "Music",
    organizer: "Cultural Committee",
    attendees: 1250,
    featured: false,
    price: "₹500",
    description: "Experience the magical voice of Arijit Singh live on campus! Join us for an unforgettable evening of soulful melodies and chart-topping hits performed by one of India's most beloved singers. The concert will feature a stunning light show, state-of-the-art sound, and an immersive musical experience. Limited tickets available, so book early!",
    contactEmail: "cultural@chanakya.edu",
    contactPhone: "+919541118287",
    startDate: "April 30, 2025",
    endDate: "April 30, 2025",
    registrationEnd: "April 25, 2025",
    maxAttendees: 2000,
    venue: "University Grand Auditorium",
    venueAddress: "Chanakya University, Rural Bangalore",
    organizers: [
      {
        name: "Cultural Committee",
        role: "Main Organizer"
      },
      {
        name: "Music Club",
        role: "Co-organizer"
      }
    ],
    speakers: [
      {
        name: "Arijit Singh",
        role: "Lead Performer"
      }
    ],
    schedule: [
      {
        date: "April 30, 2025",
        time: "6:00 PM",
        title: "Doors Open"
      },
      {
        date: "April 30, 2025",
        time: "7:00 PM",
        title: "Concert Begins"
      },
      {
        date: "April 30, 2025",
        time: "10:00 PM",
        title: "Event Ends"
      }
    ]
  },
  {
    id: "3",
    title: "Annual Hackathon 2025",
    date: "May 5-6, 2025",
    time: "8:00 AM",
    location: "CS Department",
    image: "/lovable-uploads/f4058195-637f-4050-b977-658d07522ace.png",
    category: "Tech",
    organizer: "Technical Committee",
    attendees: 320,
    featured: false,
    price: "Free",
    description: "Join the 24-hour coding marathon where creativity meets technology! The Annual Hackathon brings together programmers, designers, and innovators to develop solutions to real-world problems. With mentorship from industry experts, workshops, and amazing prizes, this is your chance to showcase your technical skills and innovative ideas. Open to all skill levels!",
    contactEmail: "tech@chanakya.edu",
    contactPhone: "+919541118287",
    startDate: "May 5, 2025",
    endDate: "May 6, 2025",
    registrationEnd: "April 30, 2025",
    maxAttendees: 400,
    venue: "Computer Science Building, Innovation Lab",
    venueAddress: "Chanakya University, Rural Bangalore",
    organizers: [
      {
        name: "Technical Committee",
        role: "Main Organizer"
      },
      {
        name: "CS Department",
        role: "Co-organizer"
      }
    ],
    speakers: [
      {
        name: "Dr. Rajiv Kumar",
        role: "Keynote Speaker"
      },
      {
        name: "Priya Sharma",
        role: "Industry Expert"
      }
    ],
    schedule: [
      {
        date: "May 5, 2025",
        time: "8:00 AM",
        title: "Registration & Opening Ceremony"
      },
      {
        date: "May 5, 2025",
        time: "9:00 AM",
        title: "Hackathon Begins"
      },
      {
        date: "May 6, 2025",
        time: "9:00 AM",
        title: "Submissions Due"
      },
      {
        date: "May 6, 2025",
        time: "2:00 PM",
        title: "Presentations & Judging"
      },
      {
        date: "May 6, 2025",
        time: "5:00 PM",
        title: "Award Ceremony"
      }
    ]
  },
  {
    id: "4",
    title: "Classical Dance Competition",
    date: "June 12, 2025",
    time: "6:00 PM",
    location: "Cultural Center",
    image: "/lovable-uploads/b9903d66-1f57-4615-8d26-e453321df716.png",
    category: "Cultural",
    organizer: "Fine Arts Society",
    attendees: 450,
    price: "₹100",
    description: "Celebrate the rich tapestry of Indian classical dance forms at our annual competition. Watch mesmerizing performances of Bharatanatyam, Kathak, Odissi, and more from talented dancers across universities. A panel of renowned judges will evaluate performances based on technique, expression, and presentation. Join us for an evening of grace, rhythm, and cultural heritage.",
    contactEmail: "arts@chanakya.edu",
    contactPhone: "+919541118287"
  },
  {
    id: "5",
    title: "Research Symposium",
    date: "July 7-8, 2025",
    time: "10:00 AM",
    location: "Central Library",
    image: "/lovable-uploads/5cb5426c-342a-47a2-a5e4-bf0c6d371335.png",
    category: "Academic",
    organizer: "Research Department",
    attendees: 280,
    price: "Free",
    description: "Join the intellectual discourse at our Research Symposium where scholars present groundbreaking research across disciplines. Featuring keynote addresses from distinguished academics, panel discussions, and poster presentations, this event encourages cross-disciplinary collaboration and knowledge exchange. An excellent opportunity for students and faculty to showcase research and forge academic connections."
  },
  {
    id: "7",
    title: "Technology Career Fair",
    date: "May 20, 2025",
    time: "10:00 AM",
    location: "University Convention Center",
    image: "/lovable-uploads/2379066d-cae1-4445-8c42-89b77b7c7983.png",
    category: "Tech",
    organizer: "Career Services",
    attendees: 720,
    price: "Free",
    description: "Connect with top technology companies and startups at our annual Technology Career Fair. This event brings together employers seeking fresh talent and students looking for internships and job opportunities in the tech industry. Prepare your resume, practice your elevator pitch, and dress professionally for this chance to network with recruiters from leading organizations in the technology sector."
  },
  {
    id: "8",
    title: "Spoken Word Poetry Night",
    date: "April 25, 2025",
    time: "6:30 PM",
    location: "Student Center",
    image: "/lovable-uploads/6173ca42-8b57-43dc-857e-c3a6a6cd6bb1.png",
    category: "Cultural",
    organizer: "Literary Club",
    attendees: 180,
    price: "₹50",
    description: "Experience the power of words at our Spoken Word Poetry Night where emotions come alive through performance poetry. This intimate gathering showcases student poets expressing their thoughts on various themes from personal experiences to social issues. The evening includes open mic sessions for audience members to share their own poetry. A soulful event that celebrates the art of storytelling through poetic expression."
  }
];

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch the event data from an API
    const foundEvent = eventsData.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
    
    // Check if user is already registered (demo only)
    const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    if (registeredEvents.includes(id)) {
      setIsRegistered(true);
    }
  }, [id]);
  
  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Add to registered events in localStorage (demo only)
      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
      localStorage.setItem("registeredEvents", JSON.stringify([...registeredEvents, id]));
      
      setIsRegistered(true);
      setIsRegistering(false);
      
      toast({
        title: "Registration successful!",
        description: `You have successfully registered for ${event?.title}.`,
      });
    }, 1500);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Sharing not supported",
        description: "Web Share API is not supported in this browser.",
      });
    }
  };
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/events">Browse All Events</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Event Header */}
        <div className="relative">
          <div className="w-full h-64 md:h-96 bg-gray-300 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
          
          <div className="absolute top-4 left-4">
            <Button asChild variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <Link to="/events">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </div>
          
          <div className="container mx-auto px-4 relative -mt-20">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:flex items-start gap-6">
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {event.price}
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-indian-primary" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-indian-primary" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-indian-primary" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2 text-indian-primary" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback className="bg-indian-primary text-white">
                      {event.organizer.split(" ").map((word: string) => word[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-500">Organized by</p>
                    <p className="font-medium">{event.organizer}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {isRegistered ? (
                    <Button className="bg-green-600 hover:bg-green-700" disabled>
                      <Check className="w-4 h-4 mr-2" />
                      Registered
                    </Button>
                  ) : (
                    <Button 
                      className="bg-indian-primary hover:bg-indian-secondary"
                      onClick={handleRegister}
                      disabled={isRegistering}
                    >
                      {isRegistering ? "Registering..." : "Register Now"}
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button variant="ghost" className="gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:inline">Interested</span>
                  </Button>
                  
                  <Button variant="ghost" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 mt-6 md:mt-0">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {event.contactEmail || "support@evocu.edu"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {event.contactPhone || "+919541118287"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event Description */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>{event.description}</p>
                </div>
              </div>
              
              {event.schedule && event.schedule.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Event Schedule</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item: any, index: number) => (
                      <div key={index} className="flex">
                        <div className="mr-4 relative">
                          <div className="w-3 h-3 rounded-full bg-indian-primary ring-4 ring-indigo-50"></div>
                          {index < event.schedule.length - 1 && (
                            <div className="absolute top-3 bottom-0 left-1.5 w-px bg-gray-200"></div>
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.date} • {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date and Time</p>
                    <p className="font-medium">{event.date} • {event.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.venueAddress || "Chanakya University, Rural Bangalore"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="font-medium">{event.price}</p>
                  </div>
                  
                  {event.registrationEnd && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Registration Deadline</p>
                      <p className="font-medium">{event.registrationEnd}</p>
                    </div>
                  )}
                  
                  {event.maxAttendees && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Capacity</p>
                      <p className="font-medium">{event.maxAttendees} attendees</p>
                    </div>
                  )}
                </div>
              </div>
              
              {event.organizers && event.organizers.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Organizers</h2>
                  <div className="space-y-4">
                    {event.organizers.map((org: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarFallback className="bg-indian-primary text-white">
                            {org.name.split(" ").map((word: string) => word[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{org.name}</p>
                          <p className="text-sm text-gray-500">{org.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.speakers && event.speakers.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Speakers</h2>
                  <div className="space-y-4">
                    {event.speakers.map((speaker: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="mr-3">
                          <AvatarFallback className="bg-indian-primary text-white">
                            {speaker.name.split(" ").map((word: string) => word[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{speaker.name}</p>
                          <p className="text-sm text-gray-500">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
