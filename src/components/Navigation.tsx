import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  Book, 
  Music, 
  Video, 
  Download, 
  Users, 
  Settings,
  Baby,
  BookOpen,
  Headphones
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Departments', path: '/departments', icon: Users },
    { name: 'Sermons', path: '/sermons', icon: Music },
    { name: 'Bible Study', path: '/bible-study', icon: BookOpen },
    { name: 'Bible', path: '/bible', icon: Book },
    { name: 'Media', path: '/media', icon: Video },
    { name: 'Children', path: '/children', icon: Baby },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Downloads', path: '/downloads', icon: Download },
    { name: 'Admin', path: '/admin', icon: Settings }
  ];

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            IDPM
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;