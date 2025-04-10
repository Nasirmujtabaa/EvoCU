
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, DollarSign, Image, Info, MapPin, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    isFree: true,
    startTime: "",
    endTime: "",
    organizer: "",
    maxAttendees: ""
  });
  
  useEffect(() => {
    // Check if user is logged in and is an organizer
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (!isLoggedIn) {
      navigate("/login");
      toast({
        title: "Access denied",
        description: "Please log in to create an event.",
        variant: "destructive",
      });
    } else if (userRole !== "organizer") {
      navigate("/dashboard");
      toast({
        title: "Access denied",
        description: "Only organizers can create events.",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      isFree: checked,
      price: checked ? "0" : prev.price
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.description || !formData.category || !startDate) {
      toast({
        title: "Form incomplete",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage for demo purposes
    const userName = localStorage.getItem("userName") || "Event Organizer";
    const eventData = {
      ...formData,
      id: Date.now().toString(),
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      image: imagePreview || "/placeholder.svg",
      organizer: userName,
      attendees: 0,
      createdAt: new Date().toISOString()
    };
    
    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem("createdEvents") || "[]");
    localStorage.setItem("createdEvents", JSON.stringify([...existingEvents, eventData]));
    
    // Show success message
    toast({
      title: "Event created!",
      description: "Your event has been successfully created.",
    });
    
    // Redirect to dashboard
    navigate("/dashboard");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Event</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to create your event.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-5 h-5 mr-2 text-indian-primary" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Enter the main details of your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title*</Label>
                    <Input 
                      id="title"
                      name="title"
                      placeholder="Enter a clear and descriptive title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      placeholder="Provide details about your event"
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category*</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={value => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="organizer">Organizer</Label>
                      <Input 
                        id="organizer"
                        name="organizer"
                        placeholder="Department or committee name"
                        value={formData.organizer}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Date and Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indian-primary" />
                    Date and Time
                  </CardTitle>
                  <CardDescription>When will your event take place?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label>Start Date*</Label>
                      <DatePicker date={startDate} setDate={setStartDate} />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <DatePicker date={endDate} setDate={setEndDate} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time*</Label>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <Input 
                          id="startTime"
                          name="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <Input 
                          id="endTime"
                          name="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Location and Capacity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indian-primary" />
                    Location and Capacity
                  </CardTitle>
                  <CardDescription>Where will your event be held?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Venue/Location*</Label>
                    <Input 
                      id="location"
                      name="location"
                      placeholder="Building and room number or venue name"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-400" />
                      <Input 
                        id="maxAttendees"
                        name="maxAttendees"
                        type="number"
                        min="1"
                        placeholder="Leave blank for unlimited"
                        value={formData.maxAttendees}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-indian-primary" />
                    Event Pricing
                  </CardTitle>
                  <CardDescription>Is this a free or paid event?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isFree" className="cursor-pointer">This is a free event</Label>
                    <Switch 
                      id="isFree" 
                      checked={formData.isFree} 
                      onCheckedChange={handleSwitchChange} 
                    />
                  </div>
                  
                  {!formData.isFree && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Ticket Price (₹)*</Label>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                        <Input 
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          step="50"
                          placeholder="Enter ticket price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required={!formData.isFree}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Event Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="w-5 h-5 mr-2 text-indian-primary" />
                    Event Image
                  </CardTitle>
                  <CardDescription>Upload a featured image for your event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                    {imagePreview ? (
                      <div className="relative w-full max-w-md">
                        <img 
                          src={imagePreview} 
                          alt="Event preview" 
                          className="w-full h-auto rounded-md shadow-sm" 
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setImagePreview(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-500 mb-4">Drag and drop an image, or click to browse</p>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose Image
                          </Button>
                          <input 
                            id="image-upload" 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Separator />
              
              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-indian-primary hover:bg-indian-secondary"
                >
                  Create Event
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
