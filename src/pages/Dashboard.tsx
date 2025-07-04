import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Filter, 
  Users, 
  TrendingUp, 
  Zap, 
  Mail,
  ArrowUpRight,
  Target,
  MessageSquare
} from "lucide-react";

const recentLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "hot",
    timeAgo: "2 min ago",
    avatar: "S"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    status: "warm",
    timeAgo: "15 min ago",
    avatar: "M"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    status: "cold",
    timeAgo: "1 hour ago",
    avatar: "E"
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "hot": return "bg-red-500/10 text-red-600 border-red-200";
    case "warm": return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "cold": return "bg-blue-500/10 text-blue-600 border-blue-200";
    default: return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your leads.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button size="sm" className="gradient-primary text-white hover:shadow-strong">
              <Plus className="w-4 h-4 mr-2" />
              New Funnel
            </Button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+23%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-foreground">18.5%</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+5.2%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Active Funnels</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+3</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft hover:shadow-strong transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Email Opens</p>
                  <p className="text-2xl font-bold text-foreground">64.3%</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+8.1%</span>
                    <span className="text-sm text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Leads</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                          {lead.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={getStatusColor(lead.status)} variant="outline">
                          {lead.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{lead.timeAgo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & AI Insights */}
          <div className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-3" />
                  Create Lead Magnet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-3" />
                  AI Quiz Builder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-3" />
                  Email Sequence
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-accent" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-1">
                    🔥 Peak engagement time detected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your leads are most active between 2-4 PM. Schedule your next campaign!
                  </p>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-foreground font-medium mb-1">
                    📈 Conversion optimization tip
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quiz funnels are performing 2.3x better than static forms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
