import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Check, X, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/ui/date-picker";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventCategoryFilter from "@/components/EventCategoryFilter";

// Sample events data with consistent IDs
const allEvents = [
  {
    id: "1",
    title: "CPL (Chanakya Premier League)",
    date: "April 10 - April 24, 2025",
    time: "9:00 AM",
    location: "University Sports Complex",
    image: "/lovable-uploads/ffa028ae-d707-4b94-a103-3172fdf017de.png",
    category: "Sports",
    organizer: "Sports Committee",
    attendees: 850,
    price: "₹200",
    featured: true,
    status: "ongoing"
  },
  {
    id: "2",
    title: "Arijit Singh Live Concert",
    date: "April 30, 2025",
    time: "7:00 PM",
    location: "University Auditorium",
    image: "/lovable-uploads/3c3d4fd7-920f-4e1b-99a2-54c895bdd75b.png",
    category: "Music",
    organizer: "Cultural Committee",
    attendees: 1250,
    price: "₹500",
    featured: false,
    status: "upcoming"
  },
  {
    id: "3",
    title: "Annual Hackathon 2025",
    date: "May 5-6, 2025",
    time: "8:00 AM",
    location: "CS Department",
    image: "/lovable-uploads/a80a907c-14f5-46ba-8d96-b09d5a2dd296.png",
    category: "Tech",
    organizer: "Technical Committee",
    attendees: 320,
    price: "Free",
    featured: false,
    status: "upcoming"
  },
  {
    id: "4",
    title: "Classical Dance Competition",
    date: "June 12, 2025",
    time: "6:00 PM",
    location: "Cultural Center",
    image: "/lovable-uploads/c6e29511-8a6b-4618-ae4b-aad484260dd3.png",
    category: "Cultural",
    organizer: "Fine Arts Society",
    attendees: 450,
    price: "₹150",
    featured: false,
    status: "upcoming"
  },
  {
    id: "5",
    title: "Research Symposium",
    date: "July 7-8, 2025",
    time: "10:00 AM",
    location: "Central Library",
    image: "/lovable-uploads/c3152829-8934-4f64-aba8-e3d957ddd6ea.png",
    category: "Academic",
    organizer: "Research Department",
    attendees: 280,
    price: "Free",
    featured: false,
    status: "upcoming"
  },
  {
    id: "6",
    title: "Technology Career Fair",
    date: "May 20, 2025",
    time: "10:00 AM",
    location: "University Convention Center",
    image: "/lovable-uploads/995ea5fa-8af3-472e-89af-4ac3df57f987.png",
    category: "Tech",
    organizer: "Career Services",
    attendees: 720,
    price: "Free",
    featured: false,
    status: "upcoming"
  },
  {
    id: "7",
    title: "Spoken Word Poetry Night",
    date: "April 25, 2025",
    time: "6:30 PM",
    location: "Student Center",
    image: "/lovable-uploads/45762d39-29dd-4a67-8bc0-affaae8004bc.png",
    category: "Cultural",
    organizer: "Literary Club",
    attendees: 180,
    price: "₹50",
    featured: false,
    status: "upcoming"
  },
  {
    id: "8",
    title: "Winter Music Festival 2024",
    date: "January 15-17, 2025",
    time: "5:00 PM",
    location: "University Grounds",
    image: "/lovable-uploads/fe8e4541-bd29-47c3-8f3f-323822848d00.png",
    category: "Music",
    organizer: "Cultural Committee",
    attendees: 1500,
    price: "₹300",
    featured: false,
    status: "previous"
  },
  {
    id: "9",
    title: "Data Science Workshop",
    date: "February 25, 2025",
    time: "9:00 AM",
    location: "Computer Sciences Building",
    image: "/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png",
    category: "Tech",
    organizer: "AI Club",
    attendees: 250,
    price: "Free",
    featured: false,
    status: "previous"
  }
];

const categories = [
  { id: "tech", name: "Tech", color: "bg-blue-600" },
  { id: "music", name: "Music", color: "bg-purple-600" },
  { id: "sports", name: "Sports", color: "bg-green-600" },
  { id: "cultural", name: "Cultural", color: "bg-yellow-600" },
  { id: "academic", name: "Academic", color: "bg-red-600" }
];

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [attendeeRange, setAttendeeRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("date-asc");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  
  useEffect(() => {
    // Check for category filter in URL
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Apply filters
    let filtered = [...allEvents];
    
    // Filter by event status if not 'all'
    if (currentTab !== "all") {
      filtered = filtered.filter(event => event.status === currentTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => 
        selectedCategories.includes(event.category.toLowerCase())
      );
    }
    
    // Filter by attendee range
    filtered = filtered.filter(event => 
      event.attendees >= attendeeRange[0] && event.attendees <= attendeeRange[1]
    );
    
    // Sort events
    switch (sortBy) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "popularity":
        filtered.sort((a, b) => b.attendees - a.attendees);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredEvents(filtered);
    setIsFilterApplied(searchTerm !== "" || selectedCategories.length > 0 || attendeeRange[0] > 0 || attendeeRange[1] < 1500);
  }, [searchTerm, selectedCategories, attendeeRange, sortBy, searchParams, currentTab]);
  
  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories);
    
    // Update URL with category filter
    if (categories.length === 1) {
      setSearchParams({ category: categories[0] });
    } else if (categories.length === 0) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setAttendeeRange([0, 1500]);
    setSortBy("date-asc");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
              <p className="text-gray-600">Discover exciting events happening around your campus</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Input 
                  placeholder="Search events" 
                  className=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {isFilterApplied && (
                      <span className="flex h-2 w-2 rounded-full bg-indian-primary"></span>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="max-w-md w-full mx-auto">
                    <DrawerHeader>
                      <DrawerTitle>Filter Events</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 py-2">
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center gap-2">
                              <Checkbox 
                                id={`category-${category.id}`} 
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedCategories([...selectedCategories, category.id]);
                                  } else {
                                    setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                                  }
                                }}
                              />
                              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Expected Attendees</h3>
                        <Slider 
                          value={attendeeRange} 
                          min={0} 
                          max={1500} 
                          step={50} 
                          onValueChange={setAttendeeRange}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{attendeeRange[0]}+</span>
                          <span>Up to {attendeeRange[1]}</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Sort By</h3>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
                            <SelectItem value="date-desc">Date (Latest first)</SelectItem>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem value="popularity">Popularity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button onClick={clearFilters} variant="outline">
                        Reset Filters
                      </Button>
                      <DrawerClose asChild>
                        <Button>Apply Filters</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          
          <div className="mb-6">
            <EventCategoryFilter 
              categories={categories} 
              selectedCategories={selectedCategories}
              onFilterChange={handleCategoryFilter} 
            />
          </div>
          
          <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="previous">Previous Events</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {isFilterApplied && (
            <div className="flex items-center mb-6 gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    <span>Search: {searchTerm}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchTerm("")}
                    />
                  </Badge>
                )}
                
                {selectedCategories.map(cat => {
                  const category = categories.find(c => c.id === cat);
                  return (
                    <Badge key={cat} variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-full">
                      <span>Category: {category?.name}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                      />
                    </Badge>
                  );
                })}
                
                {(attendeeRange[0] > 0 || attendeeRange[1] < 1500) && (
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-full">
                    <span>Attendees: {attendeeRange[0]} - {attendeeRange[1]}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setAttendeeRange([0, 1500])}
                    />
                  </Badge>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any events matching your filters. Try adjusting your search.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
