import { Church, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-church-navy text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Church Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Church className="text-church-gold h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">
                International Deliverance & Prayer Ministries
              </h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              A place where hearts are transformed, lives are restored, and God's love shines through our community. 
              Join us in worship, fellowship, and service to the Lord.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="border-church-gold text-church-gold hover:bg-church-gold hover:text-church-navy">
                <Facebook size={20} />
              </Button>
              <Button variant="outline" size="icon" className="border-church-gold text-church-gold hover:bg-church-gold hover:text-church-navy">
                <Instagram size={20} />
              </Button>
              <Button variant="outline" size="icon" className="border-church-gold text-church-gold hover:bg-church-gold hover:text-church-navy">
                <Youtube size={20} />
              </Button>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-church-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-church-gold h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/90">123 Faith Avenue</p>
                  <p className="text-white/90">Divine City, DC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-church-gold h-5 w-5 flex-shrink-0" />
                <p className="text-white/90">+1 (555) 123-PRAY</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-church-gold h-5 w-5 flex-shrink-0" />
                <p className="text-white/90">info@idpministries.org</p>
              </div>
            </div>
          </div>
          
          {/* Service Times */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-church-gold">Service Times</h4>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Sunday Worship</p>
                <p className="text-white/80">9:00 AM & 11:30 AM</p>
              </div>
              <div>
                <p className="font-medium">Wednesday Prayer</p>
                <p className="text-white/80">7:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Friday Deliverance</p>
                <p className="text-white/80">6:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Youth Meeting</p>
                <p className="text-white/80">Saturday 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70">
            © 2024 International Deliverance & Prayer Ministries. All rights reserved. 
            Built with love and faith.
          </p>
        </div>
      </div>
    </footer>
  );
};