
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, addMonths, subMonths, isSameDay, isSameMonth, startOfWeek, startOfMonth, endOfMonth, endOfWeek, addDays, isSameYear } from "date-fns";
import { ChevronLeft, ChevronRight, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";

// Import the uploaded images
const musicEventImage = "public/lovable-uploads/2311f71d-3e0f-439e-80b6-47b7777c2386.png";
const sportsEventImage = "public/lovable-uploads/bf7455ed-b4c1-4902-a9b6-d41a0d3ac498.png";
const techEventImage = "public/lovable-uploads/979d7c16-1c8e-4584-bfb6-f33312cfe3a7.png";
const culturalEventImage = "public/lovable-uploads/9b443c52-a303-44ee-955d-6816a5395aa8.png";
const academicEventImage = "public/lovable-uploads/5d040975-9adb-46d8-b90b-7bbf133338b9.png";

// Events data
const events = [
  {
    id: "1",
    title: "Arijit Singh Live Concert",
    date: new Date(2025, 3, 15),
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
    date: new Date(2025, 2, 10),
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
    date: new Date(2025, 4, 5),
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
    date: new Date(2025, 5, 12),
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
    date: new Date(2025, 6, 7),
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
    date: new Date(2025, 7, 20),
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
    title: "AI & ML Workshop by IIT Professors",
    date: new Date(2025, 9, 15),
    time: "9:00 AM",
    location: "Technology Center",
    image: techEventImage,
    category: "Tech",
    organizer: "CS Department",
    attendees: 300,
    featured: false
  },
  {
    id: "8",
    title: "AR Rahman Musical Evening",
    date: new Date(2025, 8, 3),
    time: "7:30 PM",
    location: "Open Air Theatre",
    image: musicEventImage,
    category: "Music",
    organizer: "Cultural Club",
    attendees: 1500,
    featured: true
  }
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const header = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Helper function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(event.date, date)
    );
  };

  // Get events for selected date (or current date if none selected)
  const selectedDateEvents = selectedDate 
    ? getEventsForDate(selectedDate)
    : [];

  // Get all events in the current month
  const currentMonthEvents = events.filter(event => 
    isSameMonth(event.date, currentDate) && isSameYear(event.date, currentDate)
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
              <p className="text-gray-600">Plan ahead with our visual event calendar</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select 
                defaultValue="month" 
                onValueChange={(value) => setView(value as "month" | "week" | "day")}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <span>Today</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={(date) => {
                      if (date) {
                        setCurrentDate(date);
                        setSelectedDate(date);
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Button asChild variant="outline">
                <Link to="/events">
                  <List className="w-4 h-4 mr-2" />
                  List View
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm border p-6">
              {header()}
              
              <div className="calendar-view">
                {view === "month" && (
                  <div>
                    {/* Calendar days header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div 
                          key={day} 
                          className="text-center text-sm font-medium text-gray-500 py-2"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays(currentDate, (day) => {
                        const dayEvents = getEventsForDate(day);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isToday = isSameDay(day, new Date());
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        
                        return (
                          <div 
                            key={day.toString()} 
                            className={`
                              min-h-[100px] border rounded-md overflow-hidden 
                              ${isCurrentMonth ? "bg-white" : "bg-gray-50"} 
                              ${isSelected ? "ring-2 ring-indian-primary" : ""}
                              ${isToday ? "border-indian-primary" : "border-gray-200"}
                            `}
                            onClick={() => setSelectedDate(day)}
                          >
                            <div className={`
                              text-right px-2 py-1 text-sm
                              ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                              ${isToday ? "font-bold bg-indian-softPurple text-indian-primary" : ""}
                            `}>
                              {format(day, "d")}
                            </div>
                            
                            <div className="px-1 py-1">
                              {dayEvents.slice(0, 2).map((event, idx) => (
                                <div 
                                  key={event.id} 
                                  className={`
                                    text-xs truncate rounded px-1 py-0.5 mb-1 
                                    ${getCategoryColor(event.category)}
                                  `}
                                >
                                  {event.title}
                                </div>
                              ))}
                              
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-center text-gray-500">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {view === "week" && (
                  <div>
                    <div className="text-center mb-4">
                      Week View Coming Soon
                    </div>
                  </div>
                )}
                
                {view === "day" && (
                  <div>
                    <div className="text-center mb-4">
                      Day View Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Events for Selected Date */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  {selectedDate 
                    ? `Events on ${format(selectedDate, "MMMM d, yyyy")}`
                    : "Select a date to see events"}
                </h2>
                
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex gap-3 border rounded-md p-2 hover:bg-gray-50 transition-colors"
                      >
                        <div 
                          className="w-3 self-stretch rounded-full"
                          style={{ backgroundColor: getCategoryColorCode(event.category) }}
                        ></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {event.title}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {event.time} • {event.location}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              asChild 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-indian-primary"
                            >
                              <Link to={`/events/${event.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : selectedDate ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <Calendar className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Events</h3>
                    <p className="text-gray-500 text-sm">
                      There are no events scheduled for this date.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <Calendar className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">
                      Click on a date to see events scheduled for that day.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Upcoming Events in the Month */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Events in {format(currentDate, "MMMM yyyy")}
                </h2>
                
                {currentMonthEvents.length > 0 ? (
                  <div className="space-y-4">
                    {currentMonthEvents
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((event) => (
                        <div 
                          key={event.id} 
                          className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-2 w-14 h-14 text-center flex-shrink-0">
                            <span className="text-xs text-gray-500">{format(event.date, "MMM")}</span>
                            <span className="text-lg font-bold text-gray-800">{format(event.date, "d")}</span>
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-gray-900">{event.title}</h3>
                            <div className="text-sm text-gray-500 mb-1">
                              {event.time} • {event.location}
                            </div>
                            <span 
                              className={`inline-block px-2 py-0.5 text-xs rounded-full ${getCategoryColor(event.category)}`}
                            >
                              {event.category}
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">
                      No events scheduled for this month.
                    </p>
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm"
                  >
                    <Link to="/events">View All Events</Link>
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

// Helper function to generate calendar days for the month view
const generateCalendarDays = (date: Date, renderDay: (day: Date) => React.ReactNode) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  let day = startDate;
  const days = [];
  
  while (day <= endDate) {
    days.push(renderDay(day));
    day = addDays(day, 1);
  }
  
  return days;
};

// Helper function to get color classes for event categories
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "tech":
      return "bg-blue-100 text-blue-800";
    case "music":
      return "bg-purple-100 text-purple-800";
    case "sports":
      return "bg-green-100 text-green-800";
    case "cultural":
      return "bg-yellow-100 text-yellow-800";
    case "academic":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to get color codes for event categories
const getCategoryColorCode = (category: string) => {
  switch (category.toLowerCase()) {
    case "tech":
      return "#3b82f6";
    case "music":
      return "#8b5cf6";
    case "sports":
      return "#22c55e";
    case "cultural":
      return "#eab308";
    case "academic":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export default CalendarView;
