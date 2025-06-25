import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Tag, 
  Check, 
  ChevronRight,
  Heart,
  Share,
  Utensils,
  Hotel,
  Mountain,
  Ship,
  Map,
  Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import TripDetails from "@/components/features/TripDetails";

const tripData = {
  "bali-adventure": {
    id: "bali-adventure",
    title: "L'aventure balinaise",
    destination: "Bali",
    images: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1604827346896-5c411642d9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    ],
    description: "Un voyage immersif au cœur de Bali, conçu pour les duos parents-enfants adultes. Cette aventure de 12 jours vous permettra de découvrir les paysages époustouflants, les traditions ancestrales et la culture vibrante de l'île des dieux. Entre rizières en terrasses, temples sacrés et plages paradisiaques, vous vivrez des moments authentiques en petit groupe. Une expérience idéale pour renouer et créer des souvenirs inoubliables entre parent et enfant adulte.",
    duration: 12,
    price: 1890,
    dates: { start: "10 mars 2024", end: "21 mars 2024" },
    spots: 4,
    activities: ["Culture", "Nature", "Aventure", "Cuisine", "Artisanat", "Rencontres locales"],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Denpasar et accueil traditionnel",
        description: "Arrivée à l'aéroport international de Denpasar où notre guide local vous accueillera. Transfert vers votre hébergement à Ubud et cérémonie d'accueil traditionnelle balinaise pour débuter ce voyage sous le signe du partage.",
        activities: ["Accueil traditionnel", "Installation", "Dîner de bienvenue"],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 2,
        title: "Ubud: cœur culturel de Bali",
        description: "Journée dédiée à l'exploration d'Ubud, centre artistique et culturel de l'île. Visite du palais royal, balade dans la forêt des singes, et participation à un atelier d'art traditionnel où parents et enfants créeront ensemble.",
        activities: ["Palais royal", "Forêt des singes", "Atelier d'art"],
        image: "https://images.unsplash.com/photo-1517401360673-dd9fc1be1c65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 3,
        title: "Rizières en terrasses et vie rurale",
        description: "Immersion dans la campagne balinaise avec une randonnée à travers les célèbres rizières en terrasses de Tegalalang. Rencontre avec une famille d'agriculteurs pour comprendre leurs méthodes traditionnelles et partager un repas authentique.",
        activities: ["Randonnée", "Rencontre locale", "Cuisine traditionnelle"],
        image: "https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 4,
        title: "Temples sacrés et spiritualité balinaise",
        description: "Découverte des temples emblématiques de Bali, y compris le majestueux Temple de l'eau de Tirta Empul. Participation à une cérémonie de purification et échange avec un prêtre local sur la spiritualité hindoue-balinaise.",
        activities: ["Visite de temples", "Cérémonie traditionnelle", "Échange culturel"],
        image: "https://images.unsplash.com/photo-1604561228220-eefa3fcdfe92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 5,
        title: "Aventure au Mont Batur",
        description: "Réveil matinal pour une randonnée jusqu'au sommet du Mont Batur, un volcan actif offrant une vue spectaculaire sur le lac et les montagnes environnantes. Petit-déjeuner au sommet face au lever du soleil, moment privilégié de partage entre parent et enfant.",
        activities: ["Randonnée volcanique", "Lever de soleil", "Pause bien-être"],
        image: "https://images.unsplash.com/photo-1531113435353-741db5ed5ef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 6,
        title: "Atelier culinaire balinais",
        description: "Journée dédiée à la gastronomie balinaise. Visite d'un marché local pour choisir les ingrédients frais, puis cours de cuisine en duo où vous apprendrez à préparer des plats traditionnels. Une expérience savoureuse qui renforce les liens familiaux.",
        activities: ["Marché local", "Cours de cuisine", "Dégustation"],
        image: "https://images.unsplash.com/photo-1581719608267-0921cf352842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 7,
        title: "Transfert vers la côte Est",
        description: "Départ d'Ubud vers la côte Est de Bali. En chemin, visite du temple de Besakih, le plus grand et le plus vénéré de l'île. Installation dans votre hébergement en bord de mer et temps libre pour profiter de la plage.",
        activities: ["Temple de Besakih", "Transport scénique", "Détente balnéaire"],
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 8,
        title: "Découverte des fonds marins",
        description: "Journée d'exploration marine à Amed ou Tulamben. Initiation au snorkeling ou à la plongée sous-marine pour découvrir la richesse des récifs coralliens et l'épave du Liberty. Une aventure partagée qui crée des souvenirs communs.",
        activities: ["Snorkeling/Plongée", "Biodiversité marine", "Conservation"],
        image: "https://images.unsplash.com/photo-1544551763-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 9,
        title: "Village traditionnel et artisanat",
        description: "Visite d'un village traditionnel balinais pour découvrir l'organisation sociale unique de l'île. Rencontre avec des artisans et participation à un atelier de fabrication de batik ou de sculpture sur bois. Une occasion d'échanger sur les différences culturelles.",
        activities: ["Village traditionnel", "Artisanat local", "Échanges culturels"],
        image: "https://images.unsplash.com/photo-1604827346896-5c411642d9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 10,
        title: "Transfert vers le Sud et découverte d'Uluwatu",
        description: "Déplacement vers la péninsule sud de Bali. Visite du Temple d'Uluwatu perché sur une falaise avec une vue imprenable sur l'océan Indien. En soirée, spectacle de danse Kecak au coucher du soleil, une expérience culturelle forte.",
        activities: ["Temple sur falaise", "Danse Kecak", "Coucher de soleil"],
        image: "https://images.unsplash.com/photo-1577717908646-6ada9598932c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 11,
        title: "Journée détente et réflexion",
        description: "Journée libre pour profiter des magnifiques plages du sud ou se relaxer au spa. Séance de yoga en duo parent-enfant suivie d'un temps d'échange et de réflexion sur le voyage vécu ensemble. Dîner d'adieu sur la plage.",
        activities: ["Yoga en duo", "Temps libre", "Dîner sur la plage"],
        image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 12,
        title: "Départ et au revoir",
        description: "Selon l'heure de votre vol, temps libre pour les derniers achats ou moments de détente. Transfert à l'aéroport de Denpasar pour votre vol retour, enrichis de cette expérience partagée qui aura renforcé vos liens.",
        activities: ["Temps libre", "Souvenirs", "Transfert aéroport"],
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      }
    ]
  },
  "bali-wellness": {
    id: "bali-wellness",
    title: "Bien-être à Bali",
    destination: "Bali",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1504345962847-65c42aa21e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    ],
    description: "Un voyage axé sur le bien-être et la reconnexion entre parent et enfant adulte au cœur de l'île des dieux. Pendant 10 jours, vous explorerez les meilleures pratiques de bien-être balinaises tout en découvrant la culture locale. Entre séances de yoga, méditation, massages traditionnels et immersion dans la nature luxuriante, ce séjour vous permettra de vous ressourcer tout en tissant des liens plus profonds. Un équilibre parfait entre détente et découverte culturelle.",
    duration: 10,
    price: 2190,
    dates: { start: "15 avril 2024", end: "24 avril 2024" },
    spots: 6,
    activities: ["Bien-être", "Yoga", "Méditation", "Culture", "Nature", "Cuisine locale"],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Denpasar et accueil bienveillant",
        description: "Accueil à l'aéroport et transfert vers votre retraite de bien-être près d'Ubud. Installation et cérémonie d'accueil avec rituel de purification traditionnelle balinaise. Premier dîner sain et léger �� base de produits locaux.",
        activities: ["Accueil personalisé", "Cérémonie de purification", "Dîner holistique"],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 2,
        title: "Éveil au yoga et méditation",
        description: "Début en douceur avec une séance de yoga à l'aube face aux rizières. Introduction aux principes de la méditation pleine conscience que vous pratiquerez ensemble. L'après-midi, visite du temple de Tirta Empul pour participer au rituel de purification par l'eau.",
        activities: ["Yoga matinal", "Méditation guidée", "Purification à Tirta Empul"],
        image: "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 3,
        title: "Immersion dans la nature et nutrition",
        description: "Randonnée méditative dans la jungle balinaise et découverte des plantes médicinales locales. Visite d'une ferme biologique suivie d'un atelier de cuisine saine où vous apprendrez à préparer des plats nutritifs ensemble. Soirée de relaxation avec un bain de sons.",
        activities: ["Randonnée botanique", "Atelier cuisine bio", "Bain de sons"],
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 4,
        title: "Journée de soins traditionnels",
        description: "Initiation aux pratiques de guérison traditionnelles balinaises avec un guérisseur local. Séance de massage balinais en duo pour parent et enfant. L'après-midi, atelier de fabrication de produits cosmétiques naturels à partir d'ingrédients locaux.",
        activities: ["Médecine traditionnelle", "Massage en duo", "Cosmétiques naturels"],
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 5,
        title: "Exploration personnelle et créative",
        description: "Matinée de yoga puis temps de journaling guidé pour explorer votre relation parent-enfant. Atelier créatif d'expression artistique en duo. Fin de journée dans un sanctuaire de papillons, symbolisant la transformation personnelle.",
        activities: ["Journaling en duo", "Expression artistique", "Observation des papillons"],
        image: "https://images.unsplash.com/photo-1623334631934-1b2fa11aac4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 6,
        title: "Transfert vers la côte et reconnexion à l'eau",
        description: "Départ vers la côte Est de Bali. En route, visite d'un temple d'eau et participation à une cérémonie de bénédiction. Installation dans votre retraite en bord de mer et séance de méditation face à l'océan au coucher du soleil.",
        activities: ["Cérémonie de l'eau", "Transfert scénique", "Méditation au coucher du soleil"],
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 7,
        title: "Bien-être aquatique",
        description: "Séance de yoga sur paddle au lever du soleil, une pratique qui renforce l'équilibre et la concentration. Initiation au snorkeling pour découvrir les récifs coralliens, suivie d'un pique-nique sain sur une plage isolée. En soirée, réflexion guidée sur votre expérience partagée.",
        activities: ["Yoga sur paddle", "Snorkeling", "Réflexion guidée"],
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 8,
        title: "Traditions et pratiques spirituelles",
        description: "Participation à une cérémonie de nouvelle lune avec la communauté locale. Atelier sur la philosophie balinaise du Tri Hita Karana (l'harmonie entre l'homme, la nature et le spirituel). L'après-midi, création d'offrandes florales traditionnelles.",
        activities: ["Cérémonie lunaire", "Philosophie balinaise", "Art des offrandes"],
        image: "https://images.unsplash.com/photo-1604827346896-5c411642d9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 9,
        title: "Intégration et célébration",
        description: "Dernière séance de yoga et méditation suivie d'un atelier sur comment intégrer les pratiques apprises dans votre vie quotidienne. L'après-midi, massage balinais complet et temps libre pour réfléchir. Dîner de célébration sur la plage avec spectacle de danse traditionnelle.",
        activities: ["Atelier d'intégration", "Massage complet", "Dîner de célébration"],
        image: "https://images.unsplash.com/photo-1504345962847-65c42aa21e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      },
      {
        day: 10,
        title: "Adieu et retour",
        description: "Dernière séance de méditation au lever du soleil et cérémonie d'adieu avec échange de vœux entre parent et enfant. Temps libre pour les derniers achats ou moments de détente avant le transfert à l'aéroport de Denpasar pour votre vol retour.",
        activities: ["Méditation finale", "Cérémonie d'adieu", "Retour enrichi"],
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      }
    ]
  },
  "bali-cuisine": {
    id: "bali-cuisine",
    title: "Délices culinaires balinais",
    destination: "Bali",
    images: [
      "https://images.unsplash.com/photo-1581719608267-0921cf352842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
    ],
    description: "Un voyage savoureux à travers les traditions culinaires balinaises, spécialement conçu pour les duos parents-enfants adultes. Ce circuit de 9 jours vous emmènera à la découverte des saveurs, des techniques et des secrets de la cuisine de l'île des dieux. Des marchés colorés aux rizières, en passant par les villages traditionnels, vous apprendrez à cuisiner ensemble les plats emblématiques tout en explorant la culture et l'histoire de cette cuisine unique. Une expérience qui nourrira aussi bien vos papilles que votre relation.",
    duration: 9,
    price: 1790,
    dates: { start: "5 mai 2024", end: "13 mai 2024" },
    spots: 5,
    activities: ["Cuisine", "Culture", "Marchés", "Dégustation", "Agriculture"],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Denpasar et premier goût de Bali",
        description: "Accueil à l'aéroport international de Denpasar et transfert vers votre hébergement à Seminyak. Dîner de bienvenue dans un restaurant local renommé pour vous initier aux premières saveurs balinaises.",
        activities: ["Accueil", "Premier dîner", "Introduction culinaire"],
        image: "https://images.unsplash.com/photo-1581719608267-0921cf352842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      }
    ]
  }
};

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const trip = tripData[id as keyof typeof tripData];

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Circuit non trouvé</h1>
          <p className="mb-6">Désolé, nous n'avons pas pu trouver le circuit demandé.</p>
          <Button asChild>
            <Link to="/trips">Voir tous les circuits</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TripDetails {...trip} />
      </motion.div>
    </div>
  );
};

export default TripDetail;
