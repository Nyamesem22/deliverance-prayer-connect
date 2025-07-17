import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DepartmentCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  colorScheme: string;
  members: number;
  image?: string;
}

export const DepartmentCard = ({ 
  name, 
  description, 
  icon: Icon, 
  colorScheme, 
  members, 
  image 
}: DepartmentCardProps) => {
  const getCardStyle = () => {
    const colorMap: Record<string, string> = {
      media: "border-departments-media/30 hover:border-departments-media bg-gradient-to-br from-departments-media/5 to-departments-media/10",
      tambourine: "border-departments-tambourine/30 hover:border-departments-tambourine bg-gradient-to-br from-departments-tambourine/5 to-departments-tambourine/10",
      women: "border-departments-women/30 hover:border-departments-women bg-gradient-to-br from-departments-women/5 to-departments-women/10",
      choir: "border-departments-choir/30 hover:border-departments-choir bg-gradient-to-br from-departments-choir/5 to-departments-choir/10",
      funeral: "border-departments-funeral/30 hover:border-departments-funeral bg-gradient-to-br from-departments-funeral/5 to-departments-funeral/10",
      children: "border-departments-children/30 hover:border-departments-children bg-gradient-to-br from-departments-children/5 to-departments-children/10",
      'junior-youth': "border-departments-junior-youth/30 hover:border-departments-junior-youth bg-gradient-to-br from-departments-junior-youth/5 to-departments-junior-youth/10",
      'senior-youth': "border-departments-senior-youth/30 hover:border-departments-senior-youth bg-gradient-to-br from-departments-senior-youth/5 to-departments-senior-youth/10",
      admin: "border-departments-admin/30 hover:border-departments-admin bg-gradient-to-br from-departments-admin/5 to-departments-admin/10",
      elders: "border-departments-elders/30 hover:border-departments-elders bg-gradient-to-br from-departments-elders/5 to-departments-elders/10",
      'junior-pastors': "border-departments-junior-pastors/30 hover:border-departments-junior-pastors bg-gradient-to-br from-departments-junior-pastors/5 to-departments-junior-pastors/10",
      'senior-pastors': "border-departments-senior-pastors/30 hover:border-departments-senior-pastors bg-gradient-to-br from-departments-senior-pastors/5 to-departments-senior-pastors/10",
      drama: "border-departments-drama/30 hover:border-departments-drama bg-gradient-to-br from-departments-drama/5 to-departments-drama/10",
      ushers: "border-departments-ushers/30 hover:border-departments-ushers bg-gradient-to-br from-departments-ushers/5 to-departments-ushers/10",
      main: "border-church-gold/30 hover:border-church-gold bg-gradient-to-br from-church-gold/5 to-church-gold/10"
    };
    
    return colorMap[colorScheme] || colorMap.main;
  };

  const getIconColor = () => {
    const colorMap: Record<string, string> = {
      media: "text-departments-media",
      tambourine: "text-departments-tambourine",
      women: "text-departments-women",
      choir: "text-departments-choir",
      funeral: "text-departments-funeral",
      children: "text-departments-children",
      'junior-youth': "text-departments-junior-youth",
      'senior-youth': "text-departments-senior-youth",
      admin: "text-departments-admin",
      elders: "text-departments-elders",
      'junior-pastors': "text-departments-junior-pastors",
      'senior-pastors': "text-departments-senior-pastors",
      drama: "text-departments-drama",
      ushers: "text-departments-ushers",
      main: "text-church-gold"
    };
    
    return colorMap[colorScheme] || colorMap.main;
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-elegant cursor-pointer transform hover:-translate-y-1 border-2 ${getCardStyle()}`}>
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-white/50 ${getIconColor()}`}>
          <Icon size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-church-navy mb-2">{name}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {members} members
            </span>
            <Button 
              variant="department" 
              size="sm"
              className="text-xs"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};