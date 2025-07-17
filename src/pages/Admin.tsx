import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  Upload, 
  Database, 
  BarChart3,
  Shield,
  Calendar,
  FileText,
  Video,
  Music,
  UserPlus,
  Trash2,
  Edit
} from 'lucide-react';

const Admin = () => {
  const adminStats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { label: 'Content Items', value: '856', icon: Database, color: 'bg-green-500' },
    { label: 'Downloads Today', value: '43', icon: Upload, color: 'bg-purple-500' },
    { label: 'Active Sessions', value: '28', icon: BarChart3, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { action: 'New sermon uploaded', user: 'Pastor Johnson', time: '2 hours ago' },
    { action: 'User registered', user: 'Sarah Williams', time: '4 hours ago' },
    { action: 'Bible study material added', user: 'Elder Thompson', time: '6 hours ago' },
    { action: 'Event scheduled', user: 'Admin User', time: '1 day ago' }
  ];

  const contentManagement = [
    { type: 'Sermons', count: 124, icon: Music },
    { type: 'Videos', count: 67, icon: Video },
    { type: 'Documents', count: 198, icon: FileText },
    { type: 'Events', count: 45, icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Administration Panel
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your church platform and content
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.color}/10`}>
                      <Icon className={`h-6 w-6 text-white`} style={{ color: stat.color.replace('bg-', '') }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Content</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Add User</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Schedule Event</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">System Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Content Management */}
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Overview of your platform content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentManagement.map((content, index) => {
                    const Icon = content.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{content.type}</p>
                            <p className="text-sm text-muted-foreground">{content.count} items</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Platform health overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-green-500">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage</span>
                    <Badge variant="outline">78% Used</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup</span>
                    <Badge className="bg-green-500">Current</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    User Management
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Content Moderation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    System Logs
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Backup & Restore
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;