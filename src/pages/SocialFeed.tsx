
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share2, Image, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample posts for the social feed
const initialPosts = [
  {
    id: "1",
    author: "Rahul Nair",
    authorRole: "Sports Committee Member",
    authorAvatar: "RN",
    content: "The inauguration of Chanakya Premier League was amazing! The opening ceremony showcased our university's rich cultural heritage with traditional performances. Can't wait for the exciting matches ahead!",
    image: "/lovable-uploads/54d6dc2e-f4d0-4a6d-a705-3facf3eb94c8.png",
    postedAt: "2 hours ago",
    likes: 42,
    comments: 8,
    shares: 5,
    isLiked: false,
  },
  {
    id: "2",
    author: "Priya Singh",
    authorRole: "Student",
    authorAvatar: "PS",
    content: "What an amazing first match of CPL! Team Arjuna vs Team Bhima was absolutely thrilling with a last-ball finish! The energy in the stadium was electric. Looking forward to more exciting matches this season!",
    image: "/lovable-uploads/8d2576ba-043f-4212-a58c-49ecd6999f55.png",
    postedAt: "1 day ago",
    likes: 37,
    comments: 5,
    shares: 3,
    isLiked: false,
  },
  {
    id: "3",
    author: "Arjun Kumar",
    authorRole: "Cultural Committee",
    authorAvatar: "AK",
    content: "The Arijit Singh concert preparations are in full swing! The stage setup looks phenomenal. Just a few days to go for one of the biggest events of the year!",
    image: "/lovable-uploads/10ac4ea5-29e5-450d-9468-2a35f8909cba.png",
    postedAt: "2 days ago",
    likes: 89,
    comments: 15,
    shares: 12,
    isLiked: false,
  }
];

const SocialFeed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.isLiked;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !isLiked
        };
      }
      return post;
    }));
  };
  
  const handleNewPost = () => {
    if (!newPostContent.trim() && !selectedImage) {
      toast({
        title: "Error",
        description: "Please add some text or an image to your post",
        variant: "destructive",
      });
      return;
    }
    
    // Get user info from localStorage (from login simulation)
    const userName = localStorage.getItem("userName") || "Guest User";
    const userRole = localStorage.getItem("userRole") || "user";
    
    // Create new post
    const newPost = {
      id: Date.now().toString(),
      author: userName,
      authorRole: userRole === "organizer" ? "Event Organizer" : "Student",
      authorAvatar: userName.split(" ").map(n => n[0]).join("").toUpperCase(),
      content: newPostContent,
      image: previewUrl,
      postedAt: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedImage(null);
    setPreviewUrl(null);
    
    toast({
      title: "Success",
      description: "Your post has been published",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar loggedIn={true} />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Social Feed</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <div className="hidden lg:block">
              <Card className="mb-6">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Profile</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarFallback className="bg-indian-primary text-white text-xl">
                        {(localStorage.getItem("userName") || "Guest").split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-lg font-semibold">
                      {localStorage.getItem("userName") || "Guest User"}
                    </h4>
                    <p className="text-gray-500 text-sm mb-4">
                      {localStorage.getItem("userRole") === "organizer" ? "Event Organizer" : "Student"}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Upcoming Events</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-medium">CPL Match: Team Chanakya vs Team Kautilya</h4>
                    <p className="text-sm text-gray-500">Tomorrow, 3:00 PM</p>
                  </div>
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Arijit Singh Live Concert</h4>
                    <p className="text-sm text-gray-500">April 30, 7:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Annual Hackathon 2025</h4>
                    <p className="text-sm text-gray-500">May 5-6, 8:00 AM</p>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/events">See All Events</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Create post card */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-indian-primary text-white">
                        {(localStorage.getItem("userName") || "Guest").split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your event experience..."
                        className="resize-none mb-3"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      {previewUrl && (
                        <div className="relative mb-3">
                          <img 
                            src={previewUrl} 
                            alt="Post preview" 
                            className="rounded-md max-h-60 w-auto"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                            onClick={() => {
                              setSelectedImage(null);
                              setPreviewUrl(null);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <label className="cursor-pointer hover:text-indian-primary transition-colors flex items-center gap-2">
                          <Image className="w-5 h-5" />
                          <span className="text-sm">Add Photo</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <Button 
                          className="bg-indian-primary hover:bg-indian-secondary"
                          onClick={handleNewPost}
                        >
                          Post
                          <Send className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Feed tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All Posts</TabsTrigger>
                  <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
                  <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-indian-primary text-white">
                            {post.authorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <span>{post.authorRole}</span>
                            <span>•</span>
                            <span>{post.postedAt}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="whitespace-pre-line mb-4">{post.content}</p>
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="rounded-md w-full h-auto"
                        />
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-3 flex justify-between text-sm text-gray-500">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`flex gap-2 items-center ${post.isLiked ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-2 items-center">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-2 items-center">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocialFeed;
