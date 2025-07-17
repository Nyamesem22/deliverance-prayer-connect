import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { DepartmentsGrid } from '@/components/DepartmentsGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Users, Calendar, FileText } from 'lucide-react';

const Departments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Church Departments
              </h1>
              <p className="text-muted-foreground text-lg">
                Explore our various ministry departments and get involved
              </p>
            </div>
            <Button className="bg-gradient-secondary hover:opacity-90">
              <Edit className="mr-2 h-4 w-4" />
              Manage Departments
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Total Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
                <p className="text-primary-foreground/80">Active ministries</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-accent text-primary-foreground">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Active Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-primary-foreground/80">This month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-primary-foreground">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">124</div>
                <p className="text-primary-foreground/80">Available downloads</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Departments Grid */}
        <DepartmentsGrid />

        {/* Department Management Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Department Management</CardTitle>
            <CardDescription>
              Access administrative tools for managing department content and members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Add Content</div>
                  <div className="text-sm text-muted-foreground">Upload sermons, documents</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Manage Members</div>
                  <div className="text-sm text-muted-foreground">Department membership</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Schedule Events</div>
                  <div className="text-sm text-muted-foreground">Calendar management</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">View Reports</div>
                  <div className="text-sm text-muted-foreground">Department analytics</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Departments;