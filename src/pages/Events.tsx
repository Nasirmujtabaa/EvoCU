import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventCategoryFilter from "@/components/EventCategoryFilter";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  organizer: string;
  attendees?: number;
  featured?: boolean;
  price?: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    // Fetch events from API or use local data
    const fetchEvents = async () => {
      try {
        // Replace with actual API endpoint
        // const response = await fetch('/api/events');
        // const data = await response.json();
        // setEvents(data);

        // Using local data for demonstration
        const localEvents: Event[] = [
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
            price: "₹200"
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
            price: "₹500"
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
            price: "Free"
          },
          {
            id: "4",
            title: "Diwali Fest",
            date: "Oct 20, 2024",
            time: "6:00 PM",
            location: "University Cultural Center",
            image: "/lovable-uploads/4e599995-cae7-494f-9999-ca5419532c75.png",
            category: "Cultural",
            organizer: "Cultural Committee",
            attendees: 700,
            featured: true,
            price: "Free"
          },
          {
            id: "5",
            title: "Cricket Tournament",
            date: "Nov 10-15, 2024",
            time: "10:00 AM",
            location: "University Cricket Ground",
            image: "/lovable-uploads/4e599995-cae7-494f-9999-ca5419532c75.png",
            category: "Sports",
            organizer: "Sports Committee",
            attendees: 450,
            featured: false,
            price: "₹150"
          },
          {
            id: "6",
            title: "AI Workshop",
            date: "Dec 2, 2024",
            time: "2:00 PM",
            location: "AI Lab",
            image: "/lovable-uploads/f4058195-637f-4050-b977-658d07522ace.png",
            category: "Tech",
            organizer: "AI Club",
            attendees: 120,
            featured: false,
            price: "Free"
          },
        ];
        setEvents(localEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = categoryFilter ? event.category === categoryFilter : true;
    
    return searchMatch && categoryMatch;
  }).sort((a, b) => {
    // Sort by date (most recent first)
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="relative w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>

            <EventCategoryFilter onCategoryChange={setCategoryFilter} />
          </div>

          <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="featured" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents
                  .filter((event) => event.featured)
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="sports" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents
                  .filter((event) => event.category === "Sports")
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="music" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents
                  .filter((event) => event.category === "Music")
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="tech" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents
                  .filter((event) => event.category === "Tech")
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="cultural" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents
                  .filter((event) => event.category === "Cultural")
                  .map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                No events found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
