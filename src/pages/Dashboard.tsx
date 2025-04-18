
import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { LuggageChart } from "@/components/dashboard/luggage-chart";
import { LuggageCard } from "@/components/luggage/luggage-card";
import { getDashboardStats, mockLuggage } from "@/utils/mock-data";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, CheckCheck, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const stats = getDashboardStats();
  const recentLuggage = mockLuggage.slice(0, 3);

  // Chart data
  const chartData = [
    { name: "Active", value: stats.active, color: "#3b82f6" }, // Blue
    { name: "Lost", value: stats.lost, color: "#ef4444" }, // Red
    { name: "Recovered", value: stats.recovered, color: "#8b5cf6" }, // Purple
    { 
      name: "Delivered", 
      value: stats.total - stats.active - stats.lost - stats.recovered, 
      color: "#22c55e" // Green
    },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Luggage"
            value={stats.total}
            icon={<Package />}
            description="Total items in system"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Luggage"
            value={stats.active}
            icon={<Loader2 />}
            description="Items in transit"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Lost Items"
            value={stats.lost}
            icon={<AlertTriangle />}
            description="Items reported lost"
            trend={{ value: 2, isPositive: false }}
          />
          <StatCard
            title="Recovered Items"
            value={stats.recovered}
            icon={<CheckCheck />}
            description="Items found"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Chart and Recent Luggage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Overview Chart */}
          <LuggageChart data={chartData} />
          
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Luggage</CardTitle>
                  <CardDescription>Latest updates to luggage items</CardDescription>
                </div>
                <Badge variant="secondary" className="font-normal">
                  Last 24 hours
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLuggage.map((luggage) => (
                <div key={luggage.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold">{luggage.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      Owner: {luggage.ownerName}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        luggage.status === "lost" ? "text-red-500 border-red-200" :
                        luggage.status === "recovered" ? "text-purple-500 border-purple-200" :
                        luggage.status === "delivered" ? "text-green-500 border-green-200" :
                        "text-blue-500 border-blue-200"
                      }
                    >
                      {luggage.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Luggage Cards for Mobile View */}
        <div className="lg:hidden mt-4">
          <h2 className="text-xl font-semibold mb-4">Recent Luggage</h2>
          <div className="grid gap-4">
            {recentLuggage.map((luggage) => (
              <LuggageCard key={luggage.id} luggage={luggage} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
