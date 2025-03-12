
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const mockData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
];

const statsCards = [
  { title: "Total Users", value: "2,543", icon: Users, trend: "+12.5%" },
  { title: "Revenue", value: "$45,233", icon: DollarSign, trend: "+8.2%" },
  { title: "Orders", value: "1,232", icon: ShoppingCart, trend: "+15.3%" },
  { title: "Growth", value: "+23.5%", icon: TrendingUp, trend: "+4.1%" },
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card) => (
            <div key={card.title} className="stats-card">
              <card.icon className="h-8 w-8 text-primary" />
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

        <div className="chart-container">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
