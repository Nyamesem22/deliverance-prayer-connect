import { Users, Calendar, Heart, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "1,500+",
    label: "Church Members",
    description: "Growing community of believers"
  },
  {
    icon: Calendar,
    number: "15",
    label: "Active Departments",
    description: "Diverse ministries serving together"
  },
  {
    icon: Heart,
    number: "25+",
    label: "Years of Service",
    description: "Faithful ministry to the community"
  },
  {
    icon: Globe,
    number: "12",
    label: "Countries Reached",
    description: "International prayer network"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-church">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            God's <span className="text-church-gold">Blessings</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Witness the impact of our ministry and the growth of our spiritual family
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center text-white animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-white/20">
                <stat.icon size={32} className="text-church-gold" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-church-gold">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-white/80 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};