import { HeroSection } from "@/components/HeroSection";
import { DepartmentsGrid } from "@/components/DepartmentsGrid";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DepartmentsGrid />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
