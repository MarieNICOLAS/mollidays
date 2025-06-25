
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: number;
  price: number;
  date: string;
  spots: number;
  activities: string[];
  delay?: number;
}

const TripCard = ({
  id,
  title,
  destination,
  image,
  duration,
  price,
  date,
  spots,
  activities,
  delay = 0
}: TripCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1, 
        ease: [0.6, 0.05, 0.01, 0.99] 
      }}
    >
      <Card 
        className="overflow-hidden h-full transition-all duration-300 border border-gray-100 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm transition-all hover:scale-110 z-10"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-coral-500 text-coral-500" : "text-gray-600"
              }`}
            />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="flex justify-between items-center p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
              <span className="flex items-center text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {destination}
              </span>
              <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-500 text-white">
                {`${price.toLocaleString()} €`}/pers
              </Badge>
            </div>
          </div>
        </div>
        
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            Un voyage immersif et authentique pour découvrir les merveilles de {destination}.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 pb-3">
          <div className="flex flex-wrap gap-2 mb-4">
            {activities.slice(0, 3).map((activity, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="font-normal bg-blue-50 text-blue-600 border-blue-100"
              >
                {activity}
              </Badge>
            ))}
            {activities.length > 3 && (
              <Badge variant="outline" className="font-normal bg-gray-50 text-gray-500 border-gray-100">
                +{activities.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-blue-500" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
              <span>{duration} jours</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1.5 text-blue-500" />
              <span>{spots} places</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 flex justify-between items-center">
          <Button variant="ghost" className="hover:bg-gray-50 p-0">
            Détails
          </Button>
          <Button asChild>
            <Link to={`/trips/${id}`}>
              Réserver
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TripCard;
