
import { useState } from "react";
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  HelpCircle, 
  Moon, 
  Sun,
  UserCircle, 
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuGroup, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

// Mock notification data
const notifications = [
  {
    id: 1,
    title: "New user registered",
    description: "John Doe just signed up",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New order received",
    description: "Order #38294 needs processing",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "Server update completed",
    description: "The server has been updated successfully",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "Database backup",
    description: "Daily database backup completed",
    time: "2 hours ago",
    read: true,
  }
];

export default function TopNav() {
  const { theme, setTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(n => !n.read).length
  );
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: number) => {
    const updatedNotifications = notificationsList.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotificationsList(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    });
  };

  const markAllAsRead = () => {
    const updatedNotifications = notificationsList.map(notification => ({ 
      ...notification, 
      read: true 
    }));
    setNotificationsList(updatedNotifications);
    setUnreadCount(0);
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} theme activated`,
      description: `The theme has been changed to ${theme === "dark" ? "light" : "dark"} mode`,
    });
  };

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6 gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-7"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notificationsList.length > 0 ? (
                    notificationsList.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b last:border-0 ${!notification.read ? 'bg-muted/30' : ''}`}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs h-7"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
