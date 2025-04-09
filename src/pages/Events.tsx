
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Filter, Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventCategoryFilter from "@/components/EventCategoryFilter";

// Import the uploaded images
const musicEventImage = "public/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png";
const sportsEventImage = "public/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png";
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "public/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png";
const academicEventImage = "public/lovable-uploads/5d040975-9adb-46d8-b90b-7bbf133338b9.png";

// Categories data
const categories = [
  { id: "tech", name: "Tech", color: "bg-blue-600" },
  { id: "music", name: "Music", color: "bg-purple-600" },
  { id: "sports", name: "Sports", color: "bg-green-600" },
  { id: "cultural", name: "Cultural", color: "bg-yellow-600" },
  { id: "academic", name: "Academic", color: "bg-red-600" },
];

// Events data
const allEvents = [
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
    id: "6",
    title: "Virat Kohli Cricket Masterclass",
    date: "August 20, 2025",
    time: "11:00 AM",
    location: "University Stadium",
    image: sportsEventImage,
    category: "Sports",
    organizer: "Sports Department",
    attendees: 750,
    featured: true
  },
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
    title: "AI & ML Workshop by IIT Professors",
    date: "October 15-16, 2025",
    time: "9:00 AM",
    location: "Technology Center",
    image: techEventImage,
    category: "Tech",
    organizer: "CS Department",
    attendees: 300,
    featured: false
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Filter events based on search term and selected categories
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
                           
    const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(event.category.toLowerCase());
                            
    return matchesSearch && matchesCategory;
  });
  
  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events</h1>
              <p className="text-gray-600">Discover and participate in exciting events</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" className="hidden md:flex">
                <Link to="/calendar">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendar View
                </Link>
              </Button>
              
              <div className="flex items-center border rounded-md p-1 bg-white">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-indian-primary hover:bg-indian-secondary" : ""}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-indian-primary hover:bg-indian-secondary" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search events by name, organizer, location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Select defaultValue="upcoming">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Free Events</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Paid Events</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Registrations Open</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>With Certificates</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Organizers</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem>Technical Committee</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Cultural Club</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Sports Department</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Student Council</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <EventCategoryFilter
                categories={categories}
                onFilterChange={handleCategoryFilter}
              />
            </div>
          </div>
          
          {/* Events Tabs */}
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="featured">Featured Events</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any events matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategories([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="flex bg-white rounded-lg shadow-sm border overflow-hidden">
                      <div className="w-1/4 flex-none">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-gray-500 text-sm">{event.organizer}</p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {event.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarDays className="w-4 h-4 mr-2 text-indian-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Search className="w-4 h-4 mr-2 text-indian-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Search className="w-4 h-4 mr-2 text-indian-primary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 mr-2 text-indian-primary" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button 
                            asChild 
                            className="bg-indian-primary hover:bg-indian-secondary"
                          >
                            <Link to={`/events/${event.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredEvents.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-indian-primary text-white hover:bg-indian-secondary">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allEvents
                  .filter(event => event.featured)
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allEvents
                  .sort((a, b) => (b.attendees || 0) - (a.attendees || 0))
                  .slice(0, 6)
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="thisWeek" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allEvents
                  .slice(0, 3)
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
