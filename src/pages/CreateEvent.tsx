
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CalendarIcon, 
  Clock, 
  Upload, 
  Calendar as CalendarLucide, 
  Info, 
  MapPin, 
  Users
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date().optional(),
  time: z.string().min(1, "Start time is required"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  organizer: z.string().min(2, "Organizer name must be at least 2 characters"),
  maxAttendees: z.string().optional(),
  price: z.string().optional(),
  isFeatured: z.boolean().default(false),
  imageUrl: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email").optional(),
  contactPhone: z.string().optional(),
  registrationDeadline: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateEvent = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      time: "",
      location: "",
      organizer: "",
      maxAttendees: "",
      price: "Free",
      isFeatured: false,
      contactEmail: "",
      contactPhone: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    // Format date range for display
    const formattedStartDate = format(data.startDate, "MMMM d, yyyy");
    let dateDisplay = formattedStartDate;
    
    if (data.endDate) {
      const formattedEndDate = format(data.endDate, "MMMM d, yyyy");
      if (formattedStartDate !== formattedEndDate) {
        dateDisplay = `${formattedStartDate} - ${formattedEndDate}`;
      }
    }
    
    // Prepare the event data
    const eventData = {
      ...data,
      dateDisplay,
      id: `event-${Date.now()}`,
      image: previewImage || "/lovable-uploads/70d9ecd2-403a-481c-970b-82646d3e51f9.png", // Default image if none provided
    };

    // Store event in localStorage (in a real app, this would be sent to a server)
    const existingEvents = localStorage.getItem("userEvents") 
      ? JSON.parse(localStorage.getItem("userEvents") || "[]") 
      : [];
      
    localStorage.setItem("userEvents", JSON.stringify([...existingEvents, eventData]));
    
    // Show success toast
    toast({
      title: "Event created successfully!",
      description: "Your event has been published and is now visible to others.",
    });

    // Redirect to events page
    navigate("/events");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create an Event</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-indian-primary" />
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide details about your event" 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Event Image</Label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-full sm:w-1/2">
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center h-48">
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                          <Input 
                            id="imageUpload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange} 
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                            onClick={() => document.getElementById('imageUpload')?.click()}
                          >
                            Select File
                          </Button>
                        </div>
                      </div>
                      
                      {previewImage && (
                        <div className="w-full sm:w-1/2 h-48 rounded-md overflow-hidden">
                          <img 
                            src={previewImage} 
                            alt="Event preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Date, Time, Location Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <CalendarLucide className="h-5 w-5 text-indian-primary" />
                    <h2 className="text-xl font-semibold">Date, Time & Location</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date (if multi-day event)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date (optional)</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                  const startDate = form.getValues("startDate");
                                  return date < startDate;
                                }}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Leave empty for single-day events
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input className="pl-9" placeholder="e.g. 10:00 AM" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input className="pl-9" placeholder="Event venue" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Organizer & Attendance Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indian-primary" />
                    <h2 className="text-xl font-semibold">Organizer & Attendance</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organizer / Host</FormLabel>
                        <FormControl>
                          <Input placeholder="Department or committee name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="maxAttendees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Attendees</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Leave empty for unlimited" {...field} />
                          </FormControl>
                          <FormDescription>
                            Set a cap on registrations
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Free, ₹200, etc." {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter "Free" for no-cost events
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Feature this event</FormLabel>
                          <FormDescription>
                            Featured events appear prominently on the home page and events listing
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-indian-primary" />
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email for inquiries" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+919541118287" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-indian-primary hover:bg-indian-secondary">
                    Publish Event
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateEvent;
