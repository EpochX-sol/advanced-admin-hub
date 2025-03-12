
import { useState } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from "recharts";
import { Calendar, Download, Filter, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data
const monthlyData = [
  { name: "Jan", revenue: 10800, expenses: 7200, profit: 3600 },
  { name: "Feb", revenue: 12500, expenses: 8300, profit: 4200 },
  { name: "Mar", revenue: 14200, expenses: 9100, profit: 5100 },
  { name: "Apr", revenue: 13100, expenses: 8700, profit: 4400 },
  { name: "May", revenue: 15800, expenses: 9800, profit: 6000 },
  { name: "Jun", revenue: 16700, expenses: 10200, profit: 6500 },
  { name: "Jul", revenue: 18500, expenses: 11500, profit: 7000 },
  { name: "Aug", revenue: 17300, expenses: 10800, profit: 6500 },
  { name: "Sep", revenue: 19200, expenses: 11900, profit: 7300 },
  { name: "Oct", revenue: 20100, expenses: 12400, profit: 7700 },
  { name: "Nov", revenue: 21500, expenses: 13200, profit: 8300 },
  { name: "Dec", revenue: 23000, expenses: 14100, profit: 8900 },
];

const weeklyData = [
  { name: "Week 1", visits: 4200, orders: 380, conversion: 9.05 },
  { name: "Week 2", visits: 4800, orders: 450, conversion: 9.37 },
  { name: "Week 3", visits: 5100, orders: 490, conversion: 9.61 },
  { name: "Week 4", visits: 5300, orders: 520, conversion: 9.81 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 20 },
  { name: "Books", value: 15 },
  { name: "Others", value: 5 },
];

const trafficSourceData = [
  { name: "Direct", value: 30 },
  { name: "Organic Search", value: 25 },
  { name: "Paid Search", value: 15 },
  { name: "Social Media", value: 20 },
  { name: "Referral", value: 10 },
];

const comparisonData = [
  { name: "Jan", current: 4000, previous: 3000 },
  { name: "Feb", current: 4500, previous: 3200 },
  { name: "Mar", current: 5100, previous: 4100 },
  { name: "Apr", current: 4800, previous: 3800 },
  { name: "May", current: 5500, previous: 4300 },
  { name: "Jun", current: 6000, previous: 4600 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

// KPI cards data
const kpiCards = [
  { 
    title: "Total Revenue", 
    value: "$186,300", 
    trend: "+12.3%", 
    trendType: "up",
    icon: DollarSign,
    color: "text-blue-500"
  },
  { 
    title: "Total Orders", 
    value: "4,350", 
    trend: "+8.2%", 
    trendType: "up",
    icon: ShoppingCart,
    color: "text-purple-500"
  },
  { 
    title: "Conversion Rate", 
    value: "9.42%", 
    trend: "+3.1%", 
    trendType: "up",
    icon: CreditCard,
    color: "text-green-500"
  },
  { 
    title: "Active Users", 
    value: "8,294", 
    trend: "-1.5%", 
    trendType: "down",
    icon: Users,
    color: "text-orange-500"
  },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <p className="text-muted-foreground">Comprehensive performance metrics and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="year" onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((card, index) => (
            <div key={index} className="stats-card">
              <div className={`p-3 rounded-full ${card.color.replace('text-', 'bg-').replace('500', '100')}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                  <span className={`flex items-center text-sm ${card.trendType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend}
                    {card.trendType === 'up' ? (
                      <TrendingUp className="h-4 w-4 ml-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 ml-1" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main analytics tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Revenue & Expense Chart */}
            <div className="chart-container">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Revenue & Expenses</h3>
                <Select defaultValue="bar">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                    <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                    <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Secondary Charts Row */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Traffic Sources */}
              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                <div className="h-[300px] flex justify-center">
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Year-over-Year Comparison */}
              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">Year-over-Year Comparison</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={comparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="This Year"
                      />
                      <Line type="monotone" dataKey="previous" stroke="#82ca9d" name="Last Year" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Weekly Performance */}
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="visits"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                      name="Website Visits"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                      name="Orders"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Revenue"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#82ca9d"
                      name="Expenses"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#ffc658"
                      name="Profit"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container">
                <h3 className="text-lg font-semibold mb-4">Top Products</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: "Product A", sales: 124 },
                        { name: "Product B", sales: 108 },
                        { name: "Product C", sales: 95 },
                        { name: "Product D", sales: 78 },
                        { name: "Product E", sales: 65 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="chart-container">
              <h3 className="text-lg font-semibold mb-4">Customer Growth</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: "Jan", customers: 1200 },
                      { month: "Feb", customers: 1350 },
                      { month: "Mar", customers: 1450 },
                      { month: "Apr", customers: 1420 },
                      { month: "May", customers: 1500 },
                      { month: "Jun", customers: 1580 },
                      { month: "Jul", customers: 1650 },
                      { month: "Aug", customers: 1700 },
                      { month: "Sep", customers: 1750 },
                      { month: "Oct", customers: 1830 },
                      { month: "Nov", customers: 1950 },
                      { month: "Dec", customers: 2050 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="customers"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorCustomers)"
                      name="Total Customers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
