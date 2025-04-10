
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@example.com",
    role: localStorage.getItem("userRole") || "user",
    bio: "Student at Chanakya University with interests in technology and culture.",
    department: "Computer Science",
    phone: "+919541118287",
    avatar: "",
  });

  const [editing, setEditing] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setFilePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userRole", user.role);
    
    if (filePreview) {
      localStorage.setItem("userAvatar", filePreview);
    }
    
    setEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    // Dispatch storage event to update other components
    window.dispatchEvent(new Event("storage"));
  };

  const getInitials = () => {
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                      {filePreview ? (
                        <AvatarImage src={filePreview} alt={user.name} />
                      ) : (
                        <>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-indian-primary text-white text-xl">
                            {getInitials()}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    {editing && (
                      <div className="absolute bottom-0 right-0">
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                          <Camera className="w-5 h-5 text-gray-600" />
                          <input 
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {user.role === "organizer" ? "Organizer" : "User"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Button 
                    variant={editing ? "default" : "outline"} 
                    size="sm"
                    onClick={() => editing ? handleSave() : setEditing(true)}
                    className={editing ? "bg-indian-primary hover:bg-indian-secondary" : ""}
                  >
                    {editing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        readOnly={!editing}
                        className={!editing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                        readOnly={!editing}
                        className={!editing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputChange}
                        readOnly={!editing}
                        className={!editing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        readOnly={!editing}
                        className={!editing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio"
                        name="bio"
                        rows={4}
                        value={user.bio}
                        onChange={handleInputChange}
                        readOnly={!editing}
                        className={!editing ? "bg-gray-50 resize-none" : "resize-none"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
