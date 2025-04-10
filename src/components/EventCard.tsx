
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type EventCardProps = {
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
  compact?: boolean;
  price?: string;
};

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  image,
  category,
  organizer,
  attendees,
  featured = false,
  compact = false,
  price = "Free",
}: EventCardProps) => {
  let categoryColor = "";
  
  switch (category.toLowerCase()) {
    case "tech":
      categoryColor = "bg-blue-100 text-blue-800";
      break;
    case "music":
      categoryColor = "bg-purple-100 text-purple-800";
      break;
    case "sports":
      categoryColor = "bg-green-100 text-green-800";
      break;
    case "cultural":
      categoryColor = "bg-yellow-100 text-yellow-800";
      break;
    case "academic":
      categoryColor = "bg-red-100 text-red-800";
      break;
    default:
      categoryColor = "bg-gray-100 text-gray-800";
  }

  return (
    <div 
      className={`event-card bg-white rounded-lg overflow-hidden shadow-md border ${
        featured ? "border-indian-primary shadow-lg" : "border-gray-100"
      }`}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full object-cover ${compact ? "h-36" : "h-48"}`}
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-indian-accent text-indian-primary">Featured</Badge>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-start">
          <Badge className="bg-opacity-80 backdrop-blur-sm bg-black text-white flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {price}
          </Badge>
          <Badge className={`${categoryColor}`}>{category}</Badge>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-2">
          <Badge className="bg-opacity-80 backdrop-blur-sm bg-white text-gray-800">{date}</Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold text-gray-800 ${compact ? "text-base" : "text-lg"}`}>
          {title}
        </h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-indian-primary" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-indian-primary" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-indian-primary" />
            <span>{location}</span>
          </div>
          
          {attendees && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-indian-primary" />
              <span>{attendees} attending</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">By {organizer}</span>
          
          <Button 
            asChild 
            variant="default" 
            className="bg-indian-primary hover:bg-indian-secondary"
            size={compact ? "sm" : "default"}
          >
            <Link to={`/events/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
