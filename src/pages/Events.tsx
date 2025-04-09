
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar as CalendarIcon, Clock, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EventCard from "@/components/EventCard";
import EventCategoryFilter from "@/components/EventCategoryFilter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for events
const eventCategories = [
  { id: "1", name: "Cultural", color: "bg-pink-500" },
  { id: "2", name: "Technical", color: "bg-blue-500" },
  { id: "3", name: "Sports", color: "bg-green-500" },
  { id: "4", name: "Workshop", color: "bg-purple-500" },
  { id: "5", name: "Seminar", color: "bg-yellow-500" },
  { id: "6", name: "Competition", color: "bg-red-500" },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Rang Tarang - Cultural Night",
    description: "Experience the vibrant colors and rhythms of Indian culture with classical dance performances and music.",
    date: "2023-04-15",
    time: "18:00",
    location: "Tagore Auditorium",
    category: "Cultural",
    image: "/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png",
    organizer: "Cultural Club",
    attendees: 120,
  },
  {
    id: "2",
    title: "Code Crusade Hackathon",
    description: "A 24-hour coding marathon to build innovative solutions for real-world problems. Open for all students.",
    date: "2023-04-22",
    time: "09:00",
    location: "Tech Hub, Block C",
    category: "Technical",
    image: "/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png",
    organizer: "Coding Club",
    attendees: 85,
  },
  {
    id: "3",
    title: "Arijit Singh Live Concert",
    description: "Experience the musical journey with Arijit Singh's soulful melodies and chart-topping hits.",
    date: "2023-05-01",
    time: "19:30",
    location: "University Open Amphitheater",
    category: "Cultural",
    image: "/lovable-uploads/ef443086-ae37-4ba7-8cef-bfee1fc4fdbd.png",
    organizer: "Music Society",
    attendees: 500,
  },
  {
    id: "4",
    title: "Inter-College Cricket Tournament",
    description: "Annual cricket tournament between top colleges. Come support your team!",
    date: "2023-05-10",
    time: "09:00",
    location: "University Sports Complex",
    category: "Sports",
    image: "/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png",
    organizer: "Sports Committee",
    attendees: 320,
  },
  {
    id: "5",
    title: "AI & ML Workshop",
    description: "Hands-on workshop on artificial intelligence and machine learning concepts with expert guidance.",
    date: "2023-05-15",
    time: "10:00",
    location: "Computer Science Building",
    category: "Workshop",
    image: "/lovable-uploads/5d040975-9adb-46d8-b90b-7bbf133338b9.png",
    organizer: "Tech Society",
    attendees: 65,
  },
  {
    id: "6",
    title: "Career Counseling Seminar",
    description: "Industry experts share insights on career paths, opportunities, and preparation for future jobs.",
    date: "2023-05-20",
    time: "14:00",
    location: "Central Auditorium",
    category: "Seminar",
    image: "/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png",
    organizer: "Career Development Cell",
    attendees: 230,
  },
];

const pastEvents = [
  {
    id: "7",
    title: "Annual Tech Fest - Techkriti",
    description: "The biggest technology festival showcasing innovation, robotics, and coding competitions.",
    date: "2023-03-10",
    time: "09:00",
    location: "Main Campus",
    category: "Technical",
    image: "/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png",
    organizer: "Tech Council",
    attendees: 500,
  },
  {
    id: "8",
    title: "Kathak Dance Workshop",
    description: "Learn the classical dance form of Kathak from expert dancers and choreographers.",
    date: "2023-03-15",
    time: "16:00",
    location: "Dance Academy",
    category: "Workshop",
    image: "/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png",
    organizer: "Dance Club",
    attendees: 45,
  },
  {
    id: "9",
    title: "Debate Competition: Emerging Economies",
    description: "Inter-college debate on the future of emerging economies and global challenges.",
    date: "2023-03-20",
    time: "11:00",
    location: "Humanities Block",
    category: "Competition",
    image: "/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png",
    organizer: "Debate Society",
    attendees: 120,
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterEvents = (events: any[]) => {
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(event.category);
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredPastEvents = filterEvents(pastEvents);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">University Events</h1>
            <p className="text-gray-600 mt-1">Discover and participate in exciting campus events</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Categories</h4>
                  <EventCategoryFilter 
                    categories={eventCategories} 
                    onFilterChange={setSelectedCategories}
                  />
                </div>
              </PopoverContent>
            </Popover>
            
            <Button asChild className="bg-indian-primary hover:bg-indian-secondary whitespace-nowrap">
              <Link to="/events/create">Create Event</Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            {filteredUpcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.map((event) => (
                  <Link to={`/events/${event.id}`} key={event.id}>
                    <EventCard event={event} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-8">
            {filteredPastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map((event) => (
                  <Link to={`/events/${event.id}`} key={event.id}>
                    <EventCard event={event} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No past events found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
