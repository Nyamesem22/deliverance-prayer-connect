import React from 'react';
import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { DepartmentsGrid } from '@/components/DepartmentsGrid';
import { StatsSection } from '@/components/StatsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Ministry Departments
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the various ways you can serve and grow in your faith through our different ministry departments
          </p>
        </div>
        <DepartmentsGrid />
      </div>
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
