
import { useState } from "react";
import { Search, Edit, Star, Trash, MoreHorizontal, ChevronRight, AlertCircle, Tag, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock message data
const mockMessages = [
  {
    id: 1,
    sender: "John Smith",
    subject: "Project Update - E-commerce Redesign",
    preview: "I wanted to share the latest updates on our project. The team has made significant progress with the redesign...",
    date: "10:32 AM",
    read: false,
    starred: true,
    category: "primary",
  },
  {
    id: 2,
    sender: "Marketing Team",
    subject: "Weekly Analytics Report",
    preview: "Here's your weekly analytics report showing the performance metrics for the last 7 days. We've seen a 15% increase in...",
    date: "Yesterday",
    read: true,
    starred: false,
    category: "primary",
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    subject: "Client Meeting Notes",
    preview: "Attached are the notes from our meeting with the client today. They were pleased with our progress but had a few...",
    date: "Oct 2",
    read: true,
    starred: true,
    category: "primary",
  },
  {
    id: 4,
    sender: "Dev Team",
    subject: "New Feature Deployment",
    preview: "We've successfully deployed the new features to production. Please review and let us know if you notice any issues...",
    date: "Sep 28",
    read: true,
    starred: false,
    category: "primary",
  },
  {
    id: 5,
    sender: "HR Department",
    subject: "Monthly Team Building Event",
    preview: "We're planning our monthly team building event for next Friday. Please fill out the survey to indicate your preferences...",
    date: "Sep 25",
    read: false,
    starred: false,
    category: "social",
  },
  {
    id: 6,
    sender: "System Notification",
    subject: "Your account password was changed",
    preview: "This is a confirmation that your account password was changed. If you did not make this change, please contact...",
    date: "Sep 20",
    read: true,
    starred: false,
    category: "updates",
  },
  {
    id: 7,
    sender: "David Wilson",
    subject: "Project Proposal - New Client",
    preview: "I've attached the project proposal for our potential new client. Please review it before our meeting tomorrow and...",
    date: "Sep 15",
    read: true,
    starred: true,
    category: "primary",
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);

  // Filter messages based on search and tab
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "inbox") return matchesSearch;
    if (activeTab === "starred") return matchesSearch && message.starred;
    if (activeTab === "unread") return matchesSearch && !message.read;
    
    return matchesSearch;
  });

  // Toggle star status
  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
  };

  // Mark as read
  const markAsRead = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };

  // Handle selection
  const toggleSelect = (id: number) => {
    setSelectedMessageIds(prev => 
      prev.includes(id) 
        ? prev.filter(messageId => messageId !== id) 
        : [...prev, id]
    );
  };

  // Bulk actions
  const markSelectedAsRead = () => {
    setMessages(messages.map(message => 
      selectedMessageIds.includes(message.id) ? { ...message, read: true } : message
    ));
    setSelectedMessageIds([]);
  };

  const deleteSelected = () => {
    setMessages(messages.filter(message => !selectedMessageIds.includes(message.id)));
    setSelectedMessageIds([]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            <p className="text-muted-foreground">Manage your communications</p>
          </div>
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Compose
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            <Button 
              variant={activeTab === "inbox" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("inbox")}
            >
              Inbox
              <span className="ml-auto bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">
                {messages.filter(m => !m.read).length}
              </span>
            </Button>
            <Button 
              variant={activeTab === "starred" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("starred")}
            >
              Starred
            </Button>
            <Button 
              variant={activeTab === "unread" ? "default" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Sent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Drafts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Trash
            </Button>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Search and actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {selectedMessageIds.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={markSelectedAsRead}>
                    Mark as Read
                  </Button>
                  <Button variant="outline" size="sm" onClick={deleteSelected}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Messages list */}
            <div className="border rounded-md overflow-hidden">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg">No messages found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-center p-4 hover:bg-muted/30 cursor-pointer ${!message.read ? 'bg-primary/5' : ''}`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedMessageIds.includes(message.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelect(message.id);
                          }}
                        />
                        
                        <button 
                          onClick={(e) => toggleStar(message.id, e)}
                          className={`flex-shrink-0 ${message.starred ? 'text-yellow-500' : 'text-muted-foreground'}`}
                        >
                          <Star className={`h-5 w-5 ${message.starred ? 'fill-yellow-500' : ''}`} />
                        </button>
                        
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-baseline">
                            <h4 className={`font-medium truncate ${!message.read ? 'font-semibold' : ''}`}>
                              {message.sender}
                            </h4>
                            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                              {message.date}
                            </span>
                          </div>
                          
                          <h3 className={`truncate ${!message.read ? 'font-semibold' : ''}`}>
                            {message.subject}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground truncate">
                            {message.preview}
                          </p>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
