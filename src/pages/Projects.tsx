
import { useState } from "react";
import { FolderPlus, Search, Calendar, Clock, MoreHorizontal, Star, StarOff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Sample project data
const mockProjects = [
  { 
    id: 1, 
    name: "E-commerce Redesign", 
    description: "Redesigning the UI/UX for the e-commerce platform", 
    status: "In Progress", 
    progress: 65, 
    members: 4, 
    dueDate: "Oct 15, 2023",
    starred: true,
  },
  { 
    id: 2, 
    name: "Mobile App Development", 
    description: "Building a new mobile application for clients", 
    status: "Planning", 
    progress: 25, 
    members: 5, 
    dueDate: "Dec 1, 2023",
    starred: false,
  },
  { 
    id: 3, 
    name: "Marketing Campaign", 
    description: "Launching Q4 marketing campaign for product line", 
    status: "Completed", 
    progress: 100, 
    members: 3, 
    dueDate: "Sep 30, 2023",
    starred: false,
  },
  { 
    id: 4, 
    name: "Database Migration", 
    description: "Migrating from MySQL to PostgreSQL", 
    status: "In Progress", 
    progress: 45, 
    members: 2, 
    dueDate: "Nov 10, 2023",
    starred: true,
  },
  { 
    id: 5, 
    name: "Analytics Dashboard", 
    description: "Creating a comprehensive analytics dashboard", 
    status: "In Progress", 
    progress: 70, 
    members: 3, 
    dueDate: "Oct 25, 2023",
    starred: false,
  },
  { 
    id: 6, 
    name: "Content Strategy", 
    description: "Developing content strategy for social media", 
    status: "Planning", 
    progress: 15, 
    members: 4, 
    dueDate: "Dec 15, 2023",
    starred: false,
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "in-progress") return matchesSearch && project.status === "In Progress";
    if (activeTab === "planning") return matchesSearch && project.status === "Planning";
    if (activeTab === "completed") return matchesSearch && project.status === "Completed";
    if (activeTab === "starred") return matchesSearch && project.starred;
    
    return matchesSearch;
  });

  // Toggle star status
  const toggleStar = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, starred: !project.starred } : project
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-amber-100 text-amber-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">Manage and track all your ongoing projects</p>
          </div>
          <Button className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onToggleStar={toggleStar} 
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onToggleStar={toggleStar} 
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="planning" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onToggleStar={toggleStar} 
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onToggleStar={toggleStar} 
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="starred" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onToggleStar={toggleStar} 
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    status: string;
    progress: number;
    members: number;
    dueDate: string;
    starred: boolean;
  };
  onToggleStar: (id: number) => void;
  getStatusColor: (status: string) => string;
}

function ProjectCard({ project, onToggleStar, getStatusColor }: ProjectCardProps) {
  return (
    <div className="dashboard-card flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg truncate">{project.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStar(project.id)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            {project.starred ? (
              <Star className="h-5 w-5 fill-yellow-500" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
        {project.description}
      </p>
      
      <div className="space-y-4 mt-auto">
        <div className="flex justify-between items-center">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="h-4 w-4" />
            {project.members}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {project.dueDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {project.progress}% Complete
          </div>
        </div>
      </div>
    </div>
  );
}
