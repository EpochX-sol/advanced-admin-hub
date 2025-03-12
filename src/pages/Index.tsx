
import { useEffect, useState } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, AreaChart, Area 
} from "recharts";
import { 
  ArrowUpRight, Users, DollarSign, ShoppingCart, TrendingUp, 
  ArrowRight, CheckCircle, Clock, AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";

const revenueData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
];

const userActivityData = [
  { name: "Mon", active: 500, new: 90 },
  { name: "Tue", active: 600, new: 80 },
  { name: "Wed", active: 650, new: 120 },
  { name: "Thu", active: 700, new: 110 },
  { name: "Fri", active: 750, new: 150 },
  { name: "Sat", active: 500, new: 80 },
  { name: "Sun", active: 450, new: 70 },
];

const trafficSourceData = [
  { name: "Direct", value: 30 },
  { name: "Organic Search", value: 25 },
  { name: "Paid Search", value: 15 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
];

const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const statsCards = [
  { title: "Total Users", value: "2,543", icon: Users, trend: "+12.5%", color: "text-blue-500", bgColor: "bg-blue-100" },
  { title: "Revenue", value: "$45,233", icon: DollarSign, trend: "+8.2%", color: "text-green-500", bgColor: "bg-green-100" },
  { title: "Orders", value: "1,232", icon: ShoppingCart, trend: "+15.3%", color: "text-purple-500", bgColor: "bg-purple-100" },
  { title: "Growth", value: "+23.5%", icon: TrendingUp, trend: "+4.1%", color: "text-orange-500", bgColor: "bg-orange-100" },
];

const recentActivities = [
  { id: 1, title: "New user registered", time: "2 minutes ago", type: "new-user", icon: Users },
  { id: 2, title: "Order #38294 completed", time: "15 minutes ago", type: "order", icon: CheckCircle },
  { id: 3, title: "Payment received from client", time: "42 minutes ago", type: "payment", icon: DollarSign },
  { id: 4, title: "System update scheduled", time: "1 hour ago", type: "system", icon: Clock },
  { id: 5, title: "Server alert: High CPU usage", time: "3 hours ago", type: "alert", icon: AlertCircle },
];

const todoItems = [
  { id: 1, task: "Review new user registrations", completed: false },
  { id: 2, task: "Respond to support tickets", completed: true },
  { id: 3, task: "Update product inventory", completed: false },
  { id: 4, task: "Plan marketing campaign", completed: false },
  { id: 5, task: "Analyze monthly sales data", completed: true },
];

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Your overview and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card) => (
            <div key={card.title} className="stats-card">
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-8 w-8 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                  <span className="flex items-center text-sm text-green-600">
                    {card.trend}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Revenue Chart */}
              <div className="chart-container h-[400px]">
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="chart-container h-[400px]">
                <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* User Activity Chart */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">User Activity</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={userActivityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorActive)"
                      name="Active Users"
                    />
                    <Area
                      type="monotone"
                      dataKey="new"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorNew)"
                      name="New Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", users: 1200, revenue: 9800, orders: 450 },
                      { month: "Feb", users: 1350, revenue: 10200, orders: 480 },
                      { month: "Mar", users: 1450, revenue: 11500, orders: 520 },
                      { month: "Apr", users: 1420, revenue: 10800, orders: 510 },
                      { month: "May", users: 1500, revenue: 12300, orders: 540 },
                      { month: "Jun", users: 1600, revenue: 13200, orders: 580 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      name="Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest activities in your admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'new-user' ? 'bg-blue-100 text-blue-500' :
                          activity.type === 'order' ? 'bg-green-100 text-green-500' :
                          activity.type === 'payment' ? 'bg-purple-100 text-purple-500' :
                          activity.type === 'system' ? 'bg-orange-100 text-orange-500' :
                          'bg-red-100 text-red-500'
                        }`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-primary flex items-center gap-1 text-sm font-medium">
                    View all activities
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>

              {/* Todo List */}
              <Card>
                <CardHeader>
                  <CardTitle>Todo List</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todoItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={item.completed} 
                          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                          readOnly
                        />
                        <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                          {item.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-primary flex items-center gap-1 text-sm font-medium">
                    Add new task
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
