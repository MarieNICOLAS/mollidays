
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/5feffde5-f78a-4a65-8594-686085a232c1.png" 
                  alt="Mo'lidays Logo" 
                  className="h-14 w-auto" 
                />
                <span className="text-2xl font-bold text-white">Mo'lidays</span>
              </div>
            </Link>
            <p className="text-blue-100 text-sm max-w-xs">
              Des séjours immersifs et authentiques pour duos parents-enfants adultes,
              avec un focus sur les rencontres locales et le tourisme responsable.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-blue-100 hover:text-white transition-colors">
                  Nos Circuits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-blue-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/trips/bali" className="text-blue-100 hover:text-white transition-colors">
                  Bali
                </Link>
              </li>
              <li className="text-blue-300">
                Thaïlande <span className="text-xs">(Bientôt)</span>
              </li>
              <li className="text-blue-300">
                Vietnam <span className="text-xs">(Bientôt)</span>
              </li>
              <li className="text-blue-300">
                Japon <span className="text-xs">(Bientôt)</span>
              </li>
              <li className="text-blue-300">
                Costa Rica <span className="text-xs">(Bientôt)</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-blue-200" />
                <span className="text-blue-100">
                  123 Avenue du Voyage<br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0 text-blue-200" />
                <a href="tel:+33123456789" className="text-blue-100 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0 text-blue-200" />
                <a href="mailto:contact@mollidays.com" className="text-blue-100 hover:text-white transition-colors">
                  contact@mollidays.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-6 text-center text-blue-200 text-sm">
          <p>© {currentYear} Mo'lidays. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
