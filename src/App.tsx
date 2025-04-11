
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import CreateEvent from "@/pages/CreateEvent";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Calendar from "@/pages/Calendar";
import Support from "@/pages/Support";
import SocialFeed from "@/pages/SocialFeed";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import MyEvents from "@/pages/MyEvents";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/support" element={<Support />} />
        <Route path="/social-feed" element={<SocialFeed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
