
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ChevronRight, 
  Clock, 
  Download, 
  Edit, 
  Plus, 
  Search, 
  Trash, 
  Users,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

// Import the updated images
const musicEventImage = "/lovable-uploads/3c3d4fd7-920f-4e1b-99a2-54c895bdd75b.png"; // Arijit.png
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "/lovable-uploads/c6e29511-8a6b-4618-ae4b-aad484260dd3.png"; // Classical.png
const academicEventImage = "/lovable-uploads/c3152829-8934-4f64-aba8-e3d957ddd6ea.png"; // Research.png
const poetryEventImage = "/lovable-uploads/45762d39-29dd-4a67-8bc0-affaae8004bc.png"; // Spoken.png

// Sample registered events
const registeredEvents = [
  {
    id: "1",
    title: "Arijit Singh Live Concert",
    date: "April 30, 2025",
    time: "7:00 PM",
    location: "University Auditorium",
    image: musicEventImage,
    category: "Music",
    organizer: "Cultural Committee",
    attendees: 1250,
    status: "upcoming",
    ticketId: "MUSIC-2025-001",
    registrationDate: "March 15, 2025"
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
    status: "upcoming",
    ticketId: "TECH-2025-045",
    registrationDate: "March 20, 2025"
  },
  {
    id: "5",
    title: "Research Symposium",
    date: "July 7-8, 2025",
    time: "10:00 AM",
    location: "Central Library",
    image: academicEventImage,
    category: "Academic",
    organizer: "Research Department",
    attendees: 280,
    status: "upcoming",
    ticketId: "ACAD-2025-112",
    registrationDate: "April 2, 2025"
  }
];

// Sample organized events
const organizedEvents = [
  {
    id: "4",
    title: "Classical Dance Competition",
    date: "June 12, 2025",
    time: "6:00 PM",
    location: "Cultural Center",
    image: culturalEventImage,
    category: "Cultural",
    organizer: "Fine Arts Society",
    attendees: 450,
    status: "upcoming",
    registrations: 320,
    revenue: "₹48,000"
  },
  {
    id: "8",
    title: "Spoken Word Poetry Night",
    date: "April 25, 2025",
    time: "6:30 PM",
    location: "Student Center",
    image: poetryEventImage,
    category: "Cultural",
    organizer: "Literary Club",
    attendees: 180,
    status: "upcoming",
    registrations: 120,
    revenue: "₹6,000"
  }
];

// Sample past events
const pastEvents = [
  {
    id: "9",
    title: "Winter Music Festival 2024",
    date: "January 15-17, 2025",
    time: "5:00 PM",
    location: "University Grounds",
    image: "/lovable-uploads/fe8e4541-bd29-47c3-8f3f-323822848d00.png",
    category: "Music",
    organizer: "Cultural Committee",
    attendees: 1500,
    status: "completed",
    ticketId: "MUSIC-2024-089",
    registrationDate: "December 20, 2024",
    attended: true
  },
  {
    id: "10",
    title: "Data Science Workshop",
    date: "February 25, 2025",
    time: "9:00 AM",
    location: "Computer Sciences Building",
    image: techEventImage,
    category: "Tech",
    organizer: "AI Club",
    attendees: 250,
    status: "completed",
    ticketId: "TECH-2025-017",
    registrationDate: "February 10, 2025",
    attended: true
  }
];

const MyEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filterEvents = (events: any[]) => {
    if (!searchTerm) return events;
    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const handleDeleteEvent = () => {
    toast({
      title: "Event cancelled",
      description: "Your registration has been cancelled successfully.",
    });
    setDeleteDialogOpen(false);
  };
  
  const handleDownloadTicket = (ticketId: string) => {
    toast({
      title: "Ticket downloaded",
      description: `Ticket ${ticketId} has been downloaded successfully.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
              <p className="text-gray-600">Manage your events and registrations</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search events..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className="bg-indian-primary hover:bg-indian-secondary whitespace-nowrap">
                <Link to="/create-event">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="registered">
            <TabsList className="mb-8">
              <TabsTrigger value="registered">My Registrations</TabsTrigger>
              <TabsTrigger value="organized">My Organized Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="registered" className="mt-0">
              {filterEvents(registeredEvents).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filterEvents(registeredEvents).map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover md:h-full" 
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                        <div className="md:col-span-2 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                              <Badge className="bg-yellow-100 text-yellow-800 mb-3">{event.status}</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                onClick={() => {
                                  setSelectedEvent(event.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-indian-primary" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-indian-primary" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Ticket ID: {event.ticketId}</p>
                              <p className="text-xs text-gray-500">Registered on: {event.registrationDate}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownloadTicket(event.ticketId)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Ticket
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No registered events</h3>
                  <p className="text-gray-500 mb-6">
                    You haven't registered for any events yet.
                  </p>
                  <Button asChild>
                    <Link to="/events">Browse Events</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="organized" className="mt-0">
              {filterEvents(organizedEvents).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filterEvents(organizedEvents).map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover md:h-full" 
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                        <div className="md:col-span-2 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                              <Badge className="bg-green-100 text-green-800 mb-3">{event.status}</Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild size="icon" variant="ghost">
                                <Link to={`/edit-event/${event.id}`}>
                                  <Edit className="h-4 w-4 text-blue-500" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-indian-primary" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-indian-primary" />
                              <span>{event.registrations} registrations</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Revenue: {event.revenue}</p>
                            </div>
                            <Button 
                              asChild
                              variant="outline" 
                              size="sm"
                            >
                              <Link to={`/event-dashboard/${event.id}`}>
                                Manage Event
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No organized events</h3>
                  <p className="text-gray-500 mb-6">
                    You haven't organized any events yet.
                  </p>
                  <Button asChild>
                    <Link to="/create-event">Create an Event</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-0">
              {filterEvents(pastEvents).length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filterEvents(pastEvents).map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover md:h-full" 
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                        <div className="md:col-span-2 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                              <Badge className="bg-gray-100 text-gray-800 mb-3">Completed</Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-indian-primary" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-indian-primary" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500">Ticket ID: {event.ticketId}</p>
                              <p className="text-xs text-gray-500">
                                Status: {event.attended ? (
                                  <span className="text-green-600">Attended</span>
                                ) : (
                                  <span className="text-red-600">Missed</span>
                                )}
                              </p>
                            </div>
                            <Button 
                              asChild
                              variant="outline" 
                              size="sm"
                            >
                              <Link to={`/events/${event.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No past events</h3>
                  <p className="text-gray-500 mb-6">
                    You haven't attended any events in the past.
                  </p>
                  <Button asChild>
                    <Link to="/events">Browse Events</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your registration for this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Keep Registration
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Cancel Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MyEvents;
