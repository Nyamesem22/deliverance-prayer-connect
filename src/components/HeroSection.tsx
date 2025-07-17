import { Button } from "@/components/ui/button";
import { Church, Heart, Users } from "lucide-react";
import heroImage from "@/assets/church-hero.jpg";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-church-navy/90 via-church-navy/70 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Church className="text-church-gold h-16 w-16 mr-4" />
            <div className="h-12 w-px bg-church-gold/50 mx-4"></div>
            <Heart className="text-church-gold h-12 w-12" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            INTERNATIONAL
            <span className="block text-church-gold">DELIVERANCE</span>
            <span className="block text-3xl md:text-5xl font-normal">
              & Prayer Ministries
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            A place of worship, fellowship, and spiritual growth. 
            Join our community as we serve God together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="gold" size="xl" className="min-w-48">
              <Users className="mr-2 h-5 w-5" />
              Explore Departments
            </Button>
            <Button variant="outline" size="xl" className="min-w-48 text-white border-white/30 hover:bg-white/10">
              Join Us Today
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};