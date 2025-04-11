
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Mail, Phone, MapPin, Upload, X, Building, AtSign, User as UserIcon, CalendarIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Form schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().max(250, "Bio must be less than 250 characters").optional(),
  location: z.string().optional(),
  university: z.string().optional(),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
    
    // Load profile data
    const storedName = localStorage.getItem("userName") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";
    const storedAvatar = localStorage.getItem("userAvatar");
    
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
    
    // Load user events
    const events = JSON.parse(localStorage.getItem("userEvents") || "[]");
    setUserEvents(events);
  }, [navigate]);

  // Form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      phone: localStorage.getItem("userPhone") || "",
      department: localStorage.getItem("userDepartment") || "",
      role: localStorage.getItem("userRole") || "student",
      bio: localStorage.getItem("userBio") || "",
      location: localStorage.getItem("userLocation") || "",
      university: localStorage.getItem("userUniversity") || "Chanakya University",
      interests: localStorage.getItem("userInterests") || "",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const avatarDataUrl = e.target.result as string;
          setAvatar(avatarDataUrl);
          localStorage.setItem("userAvatar", avatarDataUrl);
          
          toast({
            title: "Avatar updated",
            description: "Your profile picture has been successfully updated.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeAvatar = () => {
    setAvatar(null);
    localStorage.removeItem("userAvatar");
    toast({
      title: "Avatar removed",
      description: "Your profile picture has been removed.",
    });
  };

  const onSubmit = (data: ProfileFormValues) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Store profile data in localStorage
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userPhone", data.phone || "");
      localStorage.setItem("userDepartment", data.department || "");
      localStorage.setItem("userRole", data.role || "");
      localStorage.setItem("userBio", data.bio || "");
      localStorage.setItem("userLocation", data.location || "");
      localStorage.setItem("userUniversity", data.university || "");
      localStorage.setItem("userInterests", data.interests || "");
      
      // Show success message
      toast({
        title: "Profile updated",
        description: "Your profile changes have been saved successfully.",
      });
      
      setIsLoading(false);
      
      // Update localStorage event for navbar to detect changes
      window.dispatchEvent(new Event("storage"));
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="myEvents">My Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Avatar Section */}
                      <div className="md:w-1/4 flex flex-col items-center">
                        <div className="relative group mb-4">
                          <Avatar className="w-40 h-40">
                            {avatar ? (
                              <AvatarImage src={avatar} alt="Profile" />
                            ) : (
                              <AvatarFallback className="bg-indian-primary text-4xl text-white">
                                {getInitials(form.watch("name") || "User")}
                              </AvatarFallback>
                            )}
                            
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                              <div className="flex flex-col items-center gap-2">
                                <label htmlFor="avatarUpload" className="cursor-pointer">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                                    <Camera className="h-5 w-5 text-gray-700" />
                                  </div>
                                </label>
                                <Input
                                  id="avatarUpload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleAvatarChange}
                                />
                              </div>
                            </div>
                          </Avatar>
                          
                          {avatar && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white"
                              onClick={removeAvatar}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => document.getElementById("avatarUpload")?.click()}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Change Photo
                        </Button>
                      </div>
                      
                      {/* Form Section */}
                      <div className="md:w-3/4">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input className="pl-9" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input className="pl-9" type="email" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input className="pl-9" {...field} />
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
                                        <Input className="pl-9" placeholder="City, State" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="university"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>University</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input className="pl-9" {...field} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. Computer Science" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Role</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="student">Student</SelectItem>
                                      <SelectItem value="faculty">Faculty</SelectItem>
                                      <SelectItem value="staff">Staff</SelectItem>
                                      <SelectItem value="organizer">Event Organizer</SelectItem>
                                      <SelectItem value="alumni">Alumni</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="interests"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Interests</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g. Photography, Design, Technology" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Separate multiple interests with commas
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bio</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us a bit about yourself"
                                      className="h-24"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Maximum 250 characters
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex justify-end">
                              <Button
                                type="submit"
                                className="bg-indian-primary hover:bg-indian-secondary"
                                disabled={isLoading}
                              >
                                {isLoading ? "Saving..." : "Save Changes"}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="myEvents">
                <Card>
                  <CardContent className="p-6">
                    {userEvents.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userEvents.map((event, index) => (
                          <div key={index} className="bg-white rounded-lg shadow overflow-hidden border">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                              <div className="flex items-center text-sm text-gray-600 mb-2">
                                <CalendarIcon className="w-4 h-4 mr-2 text-indian-primary" />
                                <span>{event.dateDisplay}</span>
                              </div>
                              <div className="flex justify-between mt-4">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  {event.price || "Free"}
                                </span>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <AtSign className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No events yet</h3>
                        <p className="text-gray-500 mb-4">
                          You haven't created or participated in any events yet.
                        </p>
                        <Button asChild className="bg-indian-primary hover:bg-indian-secondary">
                          <a href="/create-event">Create Event</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
