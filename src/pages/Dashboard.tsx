import { motion } from "framer-motion";
import { FileText, Package, Download, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      icon: FileText,
      title: "TMA Files Purchased",
      value: "12",
      trend: "+2 this month",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Package,
      title: "Project Orders",
      value: "3",
      trend: "1 in transit",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Download,
      title: "Total Downloads",
      value: "28",
      trend: "+5 this week",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Clock,
      title: "Pending Deliveries",
      value: "1",
      trend: "Expected in 2 days",
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      type: "TMA",
      name: "Mathematics Class 12 TMA",
      status: "Completed",
      date: "Jan 10, 2024",
    },
    {
      id: "ORD-2024-002",
      type: "Project",
      name: "Science Project Class 10",
      status: "In Transit",
      date: "Jan 8, 2024",
    },
    {
      id: "ORD-2024-003",
      type: "TMA",
      name: "English Class 12 TMA",
      status: "Completed",
      date: "Jan 5, 2024",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground"
      >
        <h2 className="font-heading text-2xl font-bold mb-2">
          Welcome back, Student! 👋
        </h2>
        <p className="text-primary-foreground/80 mb-4">
          You have 1 pending delivery and 3 new files ready for download.
        </p>
        <div className="flex gap-3">
          <Link to="/dashboard/downloads">
            <Button variant="heroOutline" size="sm">
              <Download className="w-4 h-4" />
              View Downloads
            </Button>
          </Link>
          <Link to="/dashboard/orders">
            <Button variant="heroOutline" size="sm">
              <Package className="w-4 h-4" />
              Track Orders
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-heading">Recent Orders</CardTitle>
              <Link to="/dashboard/orders">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        order.type === "TMA" ? "bg-primary/10" : "bg-secondary/10"
                      }`}>
                        {order.type === "TMA" ? (
                          <FileText className={`w-5 h-5 ${order.type === "TMA" ? "text-primary" : "text-secondary"}`} />
                        ) : (
                          <Package className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{order.name}</div>
                        <div className="text-sm text-muted-foreground">{order.id} • {order.date}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Completed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/tma" className="block">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <FileText className="w-5 h-5 mr-3 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Buy TMA Files</div>
                    <div className="text-xs text-muted-foreground">Instant digital download</div>
                  </div>
                </Button>
              </Link>
              <Link to="/dashboard/projects" className="block">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Package className="w-5 h-5 mr-3 text-secondary" />
                  <div className="text-left">
                    <div className="font-medium">Order Project Files</div>
                    <div className="text-xs text-muted-foreground">Home delivery available</div>
                  </div>
                </Button>
              </Link>
              <Link to="/dashboard/downloads" className="block">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Download className="w-5 h-5 mr-3 text-accent" />
                  <div className="text-left">
                    <div className="font-medium">My Downloads</div>
                    <div className="text-xs text-muted-foreground">Access your files</div>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
