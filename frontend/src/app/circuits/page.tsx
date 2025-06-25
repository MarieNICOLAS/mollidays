import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Calendar, 
  Filter, 
  Map, 
  Sliders, 
  Users, 
  Clock, 
  Tag, 
  RotateCcw,
  Search,
  ArrowUpDown,
  ChevronDown 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

import TripCard from "@/components/TripCard";
import { cn } from "@/lib/utils";

const mockTrips = [
  {
    id: "bali-adventure",
    title: "L'aventure balinaise",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 12,
    price: 1890,
    date: "10 mars 2024",
    originalDate: new Date(2024, 2, 10),
    spots: 4,
    activities: ["Culture", "Nature", "Aventure"],
    themes: ["Nature", "Découverte"],
    accommodation: "Hôtel local"
  },
  {
    id: "bali-wellness",
    title: "Bien-être à Bali",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 10,
    price: 2190,
    date: "15 avril 2024",
    originalDate: new Date(2024, 3, 15),
    spots: 6,
    activities: ["Bien-être", "Culture", "Relaxation"],
    themes: ["Bien-être", "Détente"],
    accommodation: "Villa privée"
  },
  {
    id: "bali-cuisine",
    title: "Délices culinaires balinais",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1581719608267-0921cf352842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 9,
    price: 1790,
    date: "5 mai 2024",
    originalDate: new Date(2024, 4, 5),
    spots: 5,
    activities: ["Cuisine", "Culture", "Artisanat"],
    themes: ["Gastronomie", "Culturel"],
    accommodation: "Chez l'habitant"
  },
  {
    id: "bali-beach",
    title: "Plages paradisiaques de Bali",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 8,
    price: 1590,
    date: "20 juin 2024",
    originalDate: new Date(2024, 5, 20),
    spots: 4,
    activities: ["Plage", "Relaxation", "Sports nautiques"],
    themes: ["Balnéaire", "Détente"],
    accommodation: "Resort côtier"
  },
  {
    id: "bali-culture",
    title: "Immersion culturelle à Bali",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 14,
    price: 2290,
    date: "3 juillet 2024",
    originalDate: new Date(2024, 6, 3),
    spots: 5,
    activities: ["Culture", "Religion", "Artisanat", "Histoire"],
    themes: ["Culturel", "Historique"],
    accommodation: "Hôtel traditionnel"
  },
  {
    id: "bali-family",
    title: "Bali en famille",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    duration: 10,
    price: 1990,
    date: "15 août 2024",
    originalDate: new Date(2024, 7, 15),
    spots: 6,
    activities: ["Plage", "Nature", "Parcs d'attractions", "Loisirs"],
    themes: ["Famille", "Découverte"],
    accommodation: "Villa familiale"
  }
];

const activities = ["Culture", "Nature", "Aventure", "Bien-être", "Cuisine", "Plage", "Religion", "Artisanat", "Histoire", "Sports nautiques", "Relaxation", "Loisirs"];
const themes = ["Nature", "Découverte", "Bien-être", "Détente", "Gastronomie", "Culturel", "Balnéaire", "Historique", "Famille"];
const accommodations = ["Hôtel local", "Villa privée", "Chez l'habitant", "Resort côtier", "Hôtel traditionnel", "Villa familiale"];

const Trips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trips, setTrips] = useState(mockTrips);
  const [filteredTrips, setFilteredTrips] = useState(mockTrips);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [sort, setSort] = useState("date-asc");
  
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date") as string) : undefined
  );
  const [priceRange, setPriceRange] = useState<number[]>([1500, 2500]);
  const [durationRange, setDurationRange] = useState<number[]>([7, 14]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    let filtered = [...trips];
    
    if (destination) {
      filtered = filtered.filter(trip => trip.destination.toLowerCase() === destination.toLowerCase());
    }
    
    if (date) {
      filtered = filtered.filter(trip => {
        const tripDate = trip.originalDate;
        return tripDate.getMonth() === date.getMonth() && tripDate.getFullYear() === date.getFullYear();
      });
    }
    
    filtered = filtered.filter(trip => trip.price >= priceRange[0] && trip.price <= priceRange[1]);
    
    filtered = filtered.filter(trip => trip.duration >= durationRange[0] && trip.duration <= durationRange[1]);
    
    if (selectedActivities.length > 0) {
      filtered = filtered.filter(trip => 
        selectedActivities.some(activity => trip.activities.includes(activity))
      );
    }
    
    if (selectedThemes.length > 0) {
      filtered = filtered.filter(trip => 
        selectedThemes.some(theme => trip.themes.includes(theme))
      );
    }
    
    if (selectedAccommodations.length > 0) {
      filtered = filtered.filter(trip => 
        selectedAccommodations.includes(trip.accommodation)
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(trip => 
        trip.title.toLowerCase().includes(term) || 
        trip.destination.toLowerCase().includes(term) ||
        trip.activities.some(act => act.toLowerCase().includes(term))
      );
    }
    
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "duration-asc":
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case "duration-desc":
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      case "date-asc":
        filtered.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());
        break;
      case "date-desc":
        filtered.sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime());
        break;
      default:
        break;
    }
    
    setFilteredTrips(filtered);
  }, [destination, date, priceRange, durationRange, selectedActivities, selectedThemes, selectedAccommodations, searchTerm, sort, trips]);
  
  const resetFilters = () => {
    setDestination("");
    setDate(undefined);
    setPriceRange([1500, 2500]);
    setDurationRange([7, 14]);
    setSelectedActivities([]);
    setSelectedThemes([]);
    setSelectedAccommodations([]);
    setSearchTerm("");
    setSort("date-asc");
    setSearchParams({});
  };
  
  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(item => item !== activity)
        : [...prev, activity]
    );
  };
  
  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme)
        ? prev.filter(item => item !== theme)
        : [...prev, theme]
    );
  };
  
  const toggleAccommodation = (accommodation: string) => {
    setSelectedAccommodations(prev => 
      prev.includes(accommodation)
        ? prev.filter(item => item !== accommodation)
        : [...prev, accommodation]
    );
  };

  return (
    <div className="bg-cream-light min-h-screen">
      <section className="bg-sky-light pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-dark"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Trouvez votre voyage
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-500 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Découvrez nos séjours immersifs pour parents et enfants adultes
            </motion.p>
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <Input
                className="pl-10 py-6 text-lg rounded-full shadow-lg border-none"
                placeholder="Recherchez par destination, activité ou type de voyage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-sky-dark" />
                  Filtres
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-sm flex items-center text-gray"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Réinitialiser
                </Button>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <Map className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                  Destination
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes destinations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes destinations</SelectItem>
                    <SelectItem value="bali">Bali</SelectItem>
                    <SelectItem value="thailand" disabled>Thaïlande (Bientôt)</SelectItem>
                    <SelectItem value="vietnam" disabled>Vietnam (Bientôt)</SelectItem>
                    <SelectItem value="japon" disabled>Japon (Bientôt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                  Date de départ
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, 'MMMM yyyy', { locale: fr })
                      ) : (
                        <span>Sélectionner un mois</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      captionLayout="dropdown-buttons"
                      fromYear={2024}
                      toYear={2026}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <Tag className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                  Budget par personne
                </label>
                <div className="mt-2">
                  <Slider
                    defaultValue={priceRange}
                    min={1000}
                    max={3000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray">
                  <span>{priceRange[0]}€</span>
                  <span>{priceRange[1]}€</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                  Durée (jours)
                </label>
                <div className="mt-2">
                  <Slider
                    defaultValue={durationRange}
                    min={5}
                    max={20}
                    step={1}
                    value={durationRange}
                    onValueChange={setDurationRange}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray">
                  <span>{durationRange[0]} jours</span>
                  <span>{durationRange[1]} jours</span>
                </div>
              </div>
              
              <div className="mb-6">
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                      Activités
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {activities.map(activity => (
                        <div key={activity} className="flex items-center">
                          <Checkbox 
                            id={`activity-${activity}`} 
                            checked={selectedActivities.includes(activity)}
                            onCheckedChange={() => toggleActivity(activity)}
                            className="mr-2"
                          />
                          <label htmlFor={`activity-${activity}`} className="text-sm cursor-pointer">
                            {activity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              <div className="mb-6">
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                      Thèmes
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {themes.map(theme => (
                        <div key={theme} className="flex items-center">
                          <Checkbox 
                            id={`theme-${theme}`} 
                            checked={selectedThemes.includes(theme)}
                            onCheckedChange={() => toggleTheme(theme)}
                            className="mr-2"
                          />
                          <label htmlFor={`theme-${theme}`} className="text-sm cursor-pointer">
                            {theme}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              <div className="mb-6">
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      <Map className="w-4 h-4 mr-2 text-sky-DEFAULT" />
                      Hébergement
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {accommodations.map(accommodation => (
                        <div key={accommodation} className="flex items-center">
                          <Checkbox 
                            id={`accommodation-${accommodation}`} 
                            checked={selectedAccommodations.includes(accommodation)}
                            onCheckedChange={() => toggleAccommodation(accommodation)}
                            className="mr-2"
                          />
                          <label htmlFor={`accommodation-${accommodation}`} className="text-sm cursor-pointer">
                            {accommodation}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Résultats de recherche</h2>
                <p className="text-gray text-sm">{filteredTrips.length} séjours trouvés</p>
              </div>
              
              <div className="flex items-center mt-4 sm:mt-0">
                <span className="text-sm text-gray mr-2 whitespace-nowrap">Trier par :</span>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-asc">Date (croissant)</SelectItem>
                    <SelectItem value="date-desc">Date (décroissant)</SelectItem>
                    <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                    <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                    <SelectItem value="duration-asc">Durée (croissant)</SelectItem>
                    <SelectItem value="duration-desc">Durée (décroissant)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(destination || date || selectedActivities.length > 0 || selectedThemes.length > 0 || selectedAccommodations.length > 0 || searchTerm) && (
              <div className="mb-6">
                <div className="text-sm text-gray mb-2">Filtres actifs:</div>
                <div className="flex flex-wrap gap-2">
                  {destination && (
                    <Badge className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      Destination: {destination}
                      <button className="ml-1" onClick={() => setDestination("")}>×</button>
                    </Badge>
                  )}
                  
                  {date && (
                    <Badge className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      Date: {format(date, 'MMMM yyyy', { locale: fr })}
                      <button className="ml-1" onClick={() => setDate(undefined)}>×</button>
                    </Badge>
                  )}
                  
                  {searchTerm && (
                    <Badge className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      Recherche: {searchTerm}
                      <button className="ml-1" onClick={() => setSearchTerm("")}>×</button>
                    </Badge>
                  )}
                  
                  {selectedActivities.map(activity => (
                    <Badge key={activity} className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      {activity}
                      <button className="ml-1" onClick={() => toggleActivity(activity)}>×</button>
                    </Badge>
                  ))}
                  
                  {selectedThemes.map(theme => (
                    <Badge key={theme} className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      {theme}
                      <button className="ml-1" onClick={() => toggleTheme(theme)}>×</button>
                    </Badge>
                  ))}
                  
                  {selectedAccommodations.map(accommodation => (
                    <Badge key={accommodation} className="bg-sky-light text-gray-dark hover:bg-sky border-sky">
                      {accommodation}
                      <button className="ml-1" onClick={() => toggleAccommodation(accommodation)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTrips.map((trip, index) => (
                  <TripCard 
                    key={trip.id} 
                    {...trip} 
                    delay={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="h-16 w-16 mx-auto text-gray-light mb-4" />
                  <h3 className="text-xl font-bold mb-2">Aucun résultat trouvé</h3>
                  <p className="text-gray-500 mb-6">
                    Essayez de modifier vos critères de recherche pour trouver plus de résultats.
                  </p>
                  <Button onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Trips;
