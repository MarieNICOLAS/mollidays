
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  MapPin, 
  Heart, 
  Check, 
  ChevronRight, 
  Info, 
  Shield,
  Star,
  Globe,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  image?: string;
}

interface TripDetailsProps {
  id: string;
  title: string;
  destination: string;
  images: string[];
  description: string;
  duration: number;
  price: number;
  dates: { start: string; end: string };
  spots: number;
  activities: string[];
  itinerary: DayItinerary[];
}

const TripDetails = ({
  id,
  title,
  destination,
  images,
  description,
  duration,
  price,
  dates,
  spots,
  activities,
  itinerary
}: TripDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("itinerary");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuantityChange = (newValue: number) => {
    if (newValue >= 1 && newValue <= spots) {
      setQuantity(newValue);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Voyage ajouté au panier",
      description: `${quantity} place(s) pour "${title}"`,
      duration: 3000,
    });
    
    navigate("/cart");
  };

  const handleShareTrip = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié !",
      description: "Le lien du circuit a été copié dans votre presse-papiers",
      duration: 3000,
    });
  };

  const MotionImage = motion.img;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête du circuit avec title et actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <div className="flex items-center text-gray-600 gap-4">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-blue-500" />
              {destination}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
              {duration} jours
            </span>
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1.5 text-amber-500" />
              4.9/5 (46 avis)
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-coral-500 text-coral-500" : "text-gray-600"}`} />
            {isFavorite ? "Sauvegardé" : "Sauvegarder"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={handleShareTrip}
          >
            <Share className="h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Galerie d'images et détails */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galerie */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
              <MotionImage
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={images[activeImageIndex]}
                alt={`${title} - Photo ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-sm hover:shadow"
                aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-coral-500 text-coral-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-24 md:w-28 h-16 rounded-lg overflow-hidden transition-all ${
                    activeImageIndex === index
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} - Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Onglets de détails du voyage */}
          <div className="border rounded-lg overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-3 bg-gray-50">
                <TabsTrigger value="itinerary">Itinéraire</TabsTrigger>
                <TabsTrigger value="info">Points forts</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              
              {/* Onglet Itinéraire */}
              <TabsContent value="itinerary" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Votre itinéraire jour par jour</h3>
                
                <Accordion type="single" collapsible className="border rounded-lg">
                  {itinerary.map((day) => (
                    <AccordionItem key={day.day} value={`day-${day.day}`}>
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center">
                          <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">
                            {day.day}
                          </span>
                          <span className="font-medium">{day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-gray-700 mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {day.activities.map((activity, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="font-normal text-xs bg-gray-50"
                                >
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {day.image && (
                            <div className="md:col-span-1">
                              <img 
                                src={day.image} 
                                alt={day.title} 
                                className="w-full h-24 md:h-36 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              {/* Onglet Points forts */}
              <TabsContent value="info" className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-600" />
                  Points forts du voyage
                </h3>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Groupes limités à 6 duos (12 personnes maximum)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Rencontres authentiques avec les locaux</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Hébergements écoresponsables sélectionnés</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Équilibre entre activités organisées et temps libre</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Guide local francophone passionné</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Support 24/7 avant et pendant le voyage</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              {/* Onglet Détails */}
              <TabsContent value="details" className="p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Activités</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activities.map((activity, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="font-normal bg-blue-50 text-blue-600 border-blue-100"
                        >
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ce qui est inclus</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Hébergements en chambre double (hôtels, lodges ou chez l'habitant)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Tous les petits-déjeuners et certains repas selon l'itinéraire</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Tous les transferts internes mentionnés dans le programme</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Guide francophone pendant toute la durée du séjour</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Toutes les activités et visites mentionnées</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Réservation */}
        <div className="lg:col-span-1">
          <div className="glass-card sticky top-24 p-6 rounded-xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Réserver ce voyage</h3>
            
            <div className="flex justify-between items-center mb-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-lg font-semibold text-blue-900">
                {price.toLocaleString()} €
              </span>
              <span className="text-sm text-gray-600">par personne</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-700">Dates du voyage</span>
                </div>
                <span className="font-medium">{dates.start} - {dates.end}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-700">Places disponibles</span>
                </div>
                <span className="font-medium">{spots} places</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Nombre de duos</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-1 border-r hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-1 border-l hover:bg-gray-50"
                    disabled={quantity >= spots}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 py-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>Prix ({quantity} {quantity > 1 ? "duos" : "duo"})</span>
                <span>{(price * 2 * quantity).toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Frais de service</span>
                <span>{(price * 2 * quantity * 0.05).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg mt-4">
                <span>Total</span>
                <span>{(price * 2 * quantity * 1.05).toLocaleString()} €</span>
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="w-full mb-4"
              size="lg"
            >
              Réserver maintenant
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            
            <div className="flex flex-col gap-2 text-xs text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1.5 text-blue-500" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-1.5 text-blue-500" />
                <span>Annulation gratuite jusqu'à 30 jours avant le départ</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-1.5 text-blue-500" />
                <span>Tourisme responsable et durable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
