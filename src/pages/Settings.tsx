
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Lock, Eye, EyeOff, Save, Shield, Moon, Sun, Bell as BellIcon, Languages } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState("english");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    // Password validation
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">Manage your account preferences and settings</p>
            
            <Tabs defaultValue="general">
              <div className="flex flex-col sm:flex-row gap-6">
                <TabsList className="flex flex-row sm:flex-col w-full sm:w-48 h-auto">
                  <TabsTrigger value="general" className="justify-start w-full">General</TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full">Notifications</TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full">Security & Privacy</TabsTrigger>
                  <TabsTrigger value="appearance" className="justify-start w-full">Appearance</TabsTrigger>
                </TabsList>
                
                <div className="flex-1">
                  <TabsContent value="general" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Manage your basic account settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Language</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Languages className="w-4 h-4 text-gray-500" />
                              <Label>Preferred Language</Label>
                            </div>
                            <select 
                              className="rounded-md border border-gray-200 p-2"
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                            >
                              <option value="english">English</option>
                              <option value="hindi">Hindi</option>
                              <option value="tamil">Tamil</option>
                              <option value="telugu">Telugu</option>
                              <option value="kannada">Kannada</option>
                            </select>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Account Management</h3>
                          
                          <Button 
                            onClick={() => navigate("/profile")} 
                            variant="outline" 
                            className="w-full justify-start"
                          >
                            Edit Profile
                          </Button>
                          
                          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                            Deactivate Account
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <Button onClick={handleSaveSettings}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Control how and when you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Email Notifications</h3>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-events">Event reminders</Label>
                            <Switch 
                              id="email-events" 
                              checked={emailNotifications} 
                              onCheckedChange={setEmailNotifications} 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-marketing">Marketing emails and newsletters</Label>
                            <Switch 
                              id="email-marketing" 
                              checked={marketingEmails} 
                              onCheckedChange={setMarketingEmails} 
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Push Notifications</h3>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="push-all">All push notifications</Label>
                            <Switch 
                              id="push-all" 
                              checked={pushNotifications} 
                              onCheckedChange={setPushNotifications} 
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">SMS Notifications</h3>
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sms-events">Event reminders via SMS</Label>
                            <Switch 
                              id="sms-events" 
                              checked={smsNotifications} 
                              onCheckedChange={setSmsNotifications} 
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <Button onClick={handleSaveSettings}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security & Privacy</CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <form onSubmit={handleChangePassword} className="space-y-4">
                          <h3 className="text-sm font-medium">Change Password</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <div className="relative">
                              <Input 
                                id="current-password" 
                                type={showCurrentPassword ? "text" : "password"} 
                                value={currentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)} 
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0 top-0 h-full aspect-square"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <div className="relative">
                              <Input 
                                id="new-password" 
                                type={showNewPassword ? "text" : "password"} 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0 top-0 h-full aspect-square"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <div className="relative">
                              <Input 
                                id="confirm-password" 
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0 top-0 h-full aspect-square"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          
                          <Button type="submit" className="mt-2">
                            <Lock className="w-4 h-4 mr-2" />
                            Update Password
                          </Button>
                        </form>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Privacy Settings</h3>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="profile-visibility" className="block">Profile Visibility</Label>
                              <p className="text-sm text-gray-500">Control who can see your profile</p>
                            </div>
                            <select 
                              id="profile-visibility"
                              className="rounded-md border border-gray-200 p-2"
                            >
                              <option value="public">Public</option>
                              <option value="university">University Members Only</option>
                              <option value="friends">Connections Only</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="data-sharing" className="block">Data Sharing</Label>
                              <p className="text-sm text-gray-500">Allow anonymous usage data collection</p>
                            </div>
                            <Switch id="data-sharing" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <Button onClick={handleSaveSettings}>
                          <Shield className="w-4 h-4 mr-2" />
                          Save Privacy Settings
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how the application looks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Theme</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {darkMode ? (
                                <Moon className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Sun className="w-4 h-4 text-gray-500" />
                              )}
                              <Label htmlFor="dark-mode">Dark Mode</Label>
                            </div>
                            <Switch 
                              id="dark-mode" 
                              checked={darkMode} 
                              onCheckedChange={setDarkMode}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Accessibility</h3>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="text-size" className="block">Text Size</Label>
                              <p className="text-sm text-gray-500">Adjust the size of text throughout the app</p>
                            </div>
                            <select 
                              id="text-size"
                              className="rounded-md border border-gray-200 p-2"
                            >
                              <option value="small">Small</option>
                              <option value="medium" selected>Medium</option>
                              <option value="large">Large</option>
                              <option value="x-large">Extra Large</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="reduce-motion" className="block">Reduce Motion</Label>
                              <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                            </div>
                            <Switch id="reduce-motion" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end">
                        <Button onClick={handleSaveSettings}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Appearance
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
