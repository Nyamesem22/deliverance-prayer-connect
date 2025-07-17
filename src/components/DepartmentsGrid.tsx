import { DepartmentCard } from "@/components/DepartmentCard";
import { 
  Church, 
  Camera, 
  Music, 
  Users, 
  Mic2, 
  Heart, 
  Baby, 
  Gamepad2, 
  UserCheck, 
  Briefcase, 
  Crown, 
  UserCog, 
  Shield, 
  Drama, 
  HandHeart 
} from "lucide-react";

const departments = [
  {
    name: "Main Church",
    description: "The central congregation where we gather for worship, prayer, and fellowship. Experience powerful sermons and community unity.",
    icon: Church,
    colorScheme: "main",
    members: 850
  },
  {
    name: "Media Team",
    description: "Spreading God's word through technology, live streaming, sound engineering, and digital content creation.",
    icon: Camera,
    colorScheme: "media",
    members: 45
  },
  {
    name: "Tambourine Department",
    description: "Praising God with rhythm and dance, adding joyful percussion to our worship experience.",
    icon: Music,
    colorScheme: "tambourine",
    members: 28
  },
  {
    name: "Women Fellowship",
    description: "Empowering women in faith, sisterhood, and spiritual growth through Bible study and community service.",
    icon: Users,
    colorScheme: "women",
    members: 156
  },
  {
    name: "Choir Department",
    description: "Lifting voices in harmony to glorify God through beautiful hymns and contemporary worship songs.",
    icon: Mic2,
    colorScheme: "choir",
    members: 72
  },
  {
    name: "Funeral Committee",
    description: "Providing comfort and support to families during times of loss with compassionate care and prayer.",
    icon: Heart,
    colorScheme: "funeral",
    members: 18
  },
  {
    name: "Children Department",
    description: "Nurturing young hearts and minds in the love of Jesus through engaging activities and Bible lessons.",
    icon: Baby,
    colorScheme: "children",
    members: 89
  },
  {
    name: "Junior Youth Department",
    description: "Guiding teenagers in their faith journey with fun activities, mentorship, and spiritual development.",
    icon: Gamepad2,
    colorScheme: "junior-youth",
    members: 67
  },
  {
    name: "Senior Youth Department",
    description: "Empowering young adults to become leaders in faith, service, and community engagement.",
    icon: UserCheck,
    colorScheme: "senior-youth",
    members: 54
  },
  {
    name: "Administration",
    description: "Managing church operations, coordinating events, and ensuring smooth functioning of all ministries.",
    icon: Briefcase,
    colorScheme: "admin",
    members: 23
  },
  {
    name: "Elders Department",
    description: "Providing spiritual guidance, wisdom, and leadership to the congregation through prayer and counsel.",
    icon: Crown,
    colorScheme: "elders",
    members: 12
  },
  {
    name: "Junior Pastors Department",
    description: "Supporting pastoral duties, leading small groups, and mentoring members in their spiritual growth.",
    icon: UserCog,
    colorScheme: "junior-pastors",
    members: 8
  },
  {
    name: "Senior Pastors Department",
    description: "Leading the church with vision, delivering sermons, and providing spiritual oversight to all ministries.",
    icon: Shield,
    colorScheme: "senior-pastors",
    members: 4
  },
  {
    name: "Drama Club",
    description: "Bringing Bible stories to life through creative performances, skits, and theatrical worship presentations.",
    icon: Drama,
    colorScheme: "drama",
    members: 36
  },
  {
    name: "Ushers Department",
    description: "Welcoming guests, maintaining order during services, and ensuring everyone feels at home in God's house.",
    icon: HandHeart,
    colorScheme: "ushers",
    members: 42
  }
];

export const DepartmentsGrid = () => {
  return (
    <section className="py-20 px-6 bg-gradient-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-church-navy mb-6">
            Our <span className="text-church-gold">Ministries</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the many ways to serve and grow in faith within our church community. 
            Each department offers unique opportunities for fellowship and spiritual development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => (
            <div 
              key={department.name} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DepartmentCard {...department} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};