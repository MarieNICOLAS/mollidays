
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white bg-opacity-95 shadow-sm backdrop-blur-md py-3" 
          : "bg-black/50 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <img 
              src="/lovable-uploads/5feffde5-f78a-4a65-8594-686085a232c1.png" 
              alt="Mo'lidays Logo" 
              className="h-12 w-auto" 
            />
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}>
              Mo'lidays
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link 
                to="/" 
                className={`text-base font-medium ${
                  location.pathname === "/" ? "text-coral" : ""
                }`}
              >
                Accueil
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link 
                to="/trips" 
                className={`text-base font-medium ${
                  location.pathname === "/trips" ? "text-coral" : ""
                }`}
              >
                Circuits
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link 
                to="/about" 
                className={`text-base font-medium ${
                  location.pathname === "/about" ? "text-coral" : ""
                }`}
              >
                À propos
              </Link>
            </Button>
            <Button variant="ghost" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link 
                to="/contact" 
                className={`text-base font-medium ${
                  location.pathname === "/contact" ? "text-coral" : ""
                }`}
              >
                Contact
              </Link>
            </Button>
          </div>

          {/* User Menu & Cart */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link to="/cart" aria-label="Panier">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link to="/signin" aria-label="Se connecter">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="coral" asChild>
              <Link to="/signup">S'inscrire</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" asChild className={`transition-colors ${
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}>
              <Link to="/cart" aria-label="Panier">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={`transition-colors ${
                isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md absolute top-full left-0 w-full shadow-md animate-slide-in-right">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <Link 
              to="/" 
              className={`py-2 text-lg ${
                location.pathname === "/" ? "text-coral font-medium" : "text-white"
              }`}
            >
              Accueil
            </Link>
            <Link 
              to="/trips" 
              className={`py-2 text-lg ${
                location.pathname === "/trips" ? "text-coral font-medium" : "text-white"
              }`}
            >
              Circuits
            </Link>
            <Link 
              to="/about" 
              className={`py-2 text-lg ${
                location.pathname === "/about" ? "text-coral font-medium" : "text-white"
              }`}
            >
              À propos
            </Link>
            <Link 
              to="/contact" 
              className={`py-2 text-lg ${
                location.pathname === "/contact" ? "text-coral font-medium" : "text-white"
              }`}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-700">
              <Link 
                to="/signin" 
                className="py-2 text-lg text-white block"
              >
                Se connecter
              </Link>
              <Button className="w-full mt-3" variant="coral" asChild>
                <Link to="/signup">S'inscrire</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
