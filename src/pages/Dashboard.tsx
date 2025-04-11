
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

// Import the uploaded images
const musicEventImage = "/lovable-uploads/3c3d4fd7-920f-4e1b-99a2-54c895bdd75b.png"; // Arijit.png
const sportsEventImage = "public/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png";
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "/lovable-uploads/c6e29511-8a6b-4618-ae4b-aad484260dd3.png"; // Classical.png
const academicEventImage = "/lovable-uploads/c3152829-8934-4f64-aba8-e3d957ddd6ea.png"; // Research.png
const poetryEventImage = "/lovable-uploads/45762d39-29dd-4a67-8bc0-affaae8004bc.png"; // Spoken.png

// Sample chart data
const eventActivityData = [
  { name: "Jan", events: 15, attendees: 850 },
  { name: "Feb", events: 20, attendees: 1200 },
  { name: "Mar", events: 25, attendees: 1500 },
  { name: "Apr", events: 18, attendees: 1100 },
  { name: "May", events: 22, attendees: 1350 },
  { name: "Jun", events: 30, attendees: 1800 },
];

// Sample events data
const events = [
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
  },
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
    featured: false
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
    featured: false
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
    price: "₹50",
    featured: false
  }
];

// Sample upcoming events
const upcomingEvents = events.slice(0, 3);

// Sample registered events
const registeredEvents = [events[0], events[1], events[3]];

// Sample organized events
const organizedEvents = [events[2], events[4]];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening around your campus.</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Upcoming Events</CardTitle>
                <Calendar className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-gray-500">+2 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Registered Events</CardTitle>
                <Clock className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">+3 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">My Organized Events</CardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-gray-500">+1 from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Past Events</CardTitle>
                <BarChart className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-500">View attendance insights</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Activity Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Event Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={eventActivityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar
                      yAxisId="left"
                      dataKey="events"
                      fill="#9b87f5"
                      name="Events"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="attendees"
                      fill="#7E69AB"
                      name="Attendees"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Event Management Tabs */}
          <Tabs defaultValue="upcoming">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="registered">My Registrations</TabsTrigger>
                <TabsTrigger value="organized">My Organized Events</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button size="sm" className="bg-indian-primary hover:bg-indian-secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </div>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link to="/events">
                    View All Events
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="registered" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="organized" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organizedEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
                
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg p-6 text-center">
                  <Plus className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Create New Event</h3>
                  <p className="text-gray-500 mb-4">
                    Start organizing your next amazing event
                  </p>
                  <Button asChild className="bg-indian-primary hover:bg-indian-secondary">
                    <Link to="/create-event">Create Event</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
