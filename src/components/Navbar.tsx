
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const Navbar = ({ loggedIn: propsLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(propsLoggedIn);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole");
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    
    setIsLoggedIn(propsLoggedIn || storedLoggedIn);
    setUserRole(storedUserRole);
    setUserName(storedUserName);
    setUserEmail(storedUserEmail);
    
    // Add event listener for storage changes
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserRole(localStorage.getItem("userRole"));
      setUserName(localStorage.getItem("userName"));
      setUserEmail(localStorage.getItem("userEmail"));
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [propsLoggedIn]);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    
    // Update state
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);
    setUserEmail(null);
    
    // Show toast
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to home
    navigate("/");
  };
  
  const getInitials = () => {
    if (!userName) return "EC";
    return userName.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/ba648c73-85e0-4488-af76-42b72f407603.png" 
              alt="EVO Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-800">
              EvoCU
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-1 md:flex">
          <Link
            to="/"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            to="/events"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Events
          </Link>
          <Link
            to="/calendar"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Calendar
          </Link>
          <Link
            to="/social-feed"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Social Feed
          </Link>
          <Link
            to="/support"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Calendar className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 rounded-full"
                  >
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="bg-indian-primary text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex flex-col items-start w-full">
                    <span className="font-semibold">{userName || "User"}</span>
                    <span className="text-xs text-gray-500">{userEmail || "user@example.com"}</span>
                    <span className="mt-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {userRole === "organizer" ? "Organizer" : "User"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-events" className="flex items-center w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Events
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "organizer" && (
                    <DropdownMenuItem>
                      <Link to="/create-event" className="flex items-center w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Create Event
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center w-full">
                      <User className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex items-center w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-indian-primary hover:bg-indian-secondary">
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/ba648c73-85e0-4488-af76-42b72f407603.png" 
                alt="EVO Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">EvoCU</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
          </div>
          <div className="flex flex-col flex-1 p-4 gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback className="bg-indian-primary text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{userName || "User"}</div>
                  <div className="text-sm text-gray-500">{userEmail || "user@example.com"}</div>
                  <div className="mt-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full inline-block">
                    {userRole === "organizer" ? "Organizer" : "User"}
                  </div>
                </div>
              </div>
            ) : null}
            <nav className="flex flex-col py-4 space-y-2">
              <Link
                to="/"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/calendar"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendar
              </Link>
              <Link
                to="/social-feed"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Social Feed
                </div>
              </Link>
              <Link
                to="/support"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
            {!isLoggedIn ? (
              <div className="flex flex-col gap-2 mt-auto">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-indian-primary hover:bg-indian-secondary">
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="mt-auto border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
