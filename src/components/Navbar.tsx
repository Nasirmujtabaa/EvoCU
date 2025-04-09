
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  ChevronDown,
  Menu,
  Search,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Navbar = ({ loggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indian-primary text-white">
              <span className="text-lg font-bold">US</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              Utsav Sarthi
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
            to="/support"
            className="px-3 py-2 text-sm transition-colors rounded-md hover:bg-gray-100"
          >
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {loggedIn ? (
            <>
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  className="w-[200px] pl-8 rounded-full bg-gray-50"
                />
              </div>
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
                        US
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/my-events" className="flex items-center w-full">
                      My Events
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/logout" className="flex items-center w-full">
                      Logout
                    </Link>
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indian-primary text-white">
                <span className="text-lg font-bold">US</span>
              </div>
              <span className="text-xl font-bold">Utsav Sarthi</span>
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
            {loggedIn ? (
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback className="bg-indian-primary text-white">
                    US
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">User Name</div>
                  <div className="text-sm text-gray-500">student@email.com</div>
                </div>
              </div>
            ) : null}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                className="w-full pl-8 bg-gray-50"
              />
            </div>
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
                to="/support"
                className="px-3 py-2 transition-colors rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
            </nav>
            {!loggedIn && (
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
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
