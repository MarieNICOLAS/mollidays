
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Calendar, Search, Heart, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";

const Index = () => {
  const [destination, setDestination] = useState("");
  const [featuredTrips, setFeaturedTrips] = useState([
    {
      id: "bali-adventure",
      title: "L'aventure balinaise",
      destination: "Bali",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      duration: 12,
      price: 1890,
      date: "10 mars 2024",
      spots: 4,
      activities: ["Culture", "Nature", "Aventure"]
    },
    {
      id: "bali-wellness",
      title: "Bien-être à Bali",
      destination: "Bali",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      duration: 10,
      price: 2190,
      date: "15 avril 2024",
      spots: 6,
      activities: ["Bien-être", "Culture", "Relaxation"]
    },
    {
      id: "bali-cuisine",
      title: "Délices culinaires balinais",
      destination: "Bali",
      image: "https://images.unsplash.com/photo-1581719608267-0921cf352842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      duration: 9,
      price: 1790,
      date: "5 mai 2024",
      spots: 5,
      activities: ["Cuisine", "Culture", "Artisanat"]
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", destination);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Search Section */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Trouvez votre prochaine aventure avec Mo'lidays</h2>
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-coral" />
                  Destination
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bali">Bali</SelectItem>
                    <SelectItem value="thailand" disabled>Thaïlande (Bientôt)</SelectItem>
                    <SelectItem value="vietnam" disabled>Vietnam (Bientôt)</SelectItem>
                    <SelectItem value="japon" disabled>Japon (Bientôt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-coral" />
                  Dates
                </label>
                <Input type="month" min={new Date().toISOString().slice(0, 7)} />
              </div>
              
              <Button type="submit" className="self-end" variant="coral">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Mo'lidays Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Mo'lidays ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mo'lidays révolutionne les voyages en famille en créant des expériences uniques 
            pour parents et enfants adultes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6"
          >
            <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-coral" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expériences authentiques</h3>
            <p className="text-gray-600">
              Des voyages immersifs qui privilégient les rencontres locales et les moments de partage
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6"
          >
            <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-coral" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Petits groupes</h3>
            <p className="text-gray-600">
              Maximum 6 duos parents-enfants pour garantir une ambiance familiale et des liens durables
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6"
          >
            <div className="bg-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-coral" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tourisme responsable</h3>
            <p className="text-gray-600">
              Engagement éthique envers les communautés locales et respect de l'environnement
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Trips Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-2"
            >
              Nos circuits à la une
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600"
            >
              Voyages immersifs parents-enfants adultes avec Mo'lidays
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button variant="outline" className="mt-4 sm:mt-0" asChild>
              <Link to="/trips">
                Voir tous les circuits
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip, index) => (
            <TripCard key={trip.id} {...trip} delay={index} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-coral to-coral-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt pour votre prochaine aventure Mo'lidays ?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Des souvenirs inoubliables vous attendent entre parents et enfants adultes.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-coral hover:bg-cream"
              asChild
            >
              <Link to="/trips">
                Découvrir nos circuits
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
