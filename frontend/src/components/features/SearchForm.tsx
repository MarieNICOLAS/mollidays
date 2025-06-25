
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchForm = () => {
  const [date, setDate] = useState<Date>();
  const [destination, setDestination] = useState<string>("all");
  const [budget, setBudget] = useState<string>("all");
  const [activity, setActivity] = useState<string>("all");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (destination !== "all") params.append("destination", destination);
    if (budget !== "all") params.append("budget", budget);
    if (activity !== "all") params.append("activity", activity);
    if (date) params.append("date", format(date, "yyyy-MM-dd"));
    
    navigate(`/trips?${params.toString()}`);
  };

  return (
    <div className="glass-card p-6 md:p-8 w-full max-w-5xl mx-auto -mt-20 z-10 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Recherchez votre prochain voyage
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Toutes destinations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes destinations</SelectItem>
              <SelectItem value="bali">Bali</SelectItem>
              <SelectItem value="thailand" disabled>Thaïlande (Bientôt)</SelectItem>
              <SelectItem value="vietnam" disabled>Vietnam (Bientôt)</SelectItem>
              <SelectItem value="japan" disabled>Japon (Bientôt)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date de départ
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-gray-200"
                id="date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "d MMMM yyyy", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-gray-700">
            Budget
          </label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger id="budget">
              <SelectValue placeholder="Tous budgets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous budgets</SelectItem>
              <SelectItem value="economic">Économique (- 1500€)</SelectItem>
              <SelectItem value="standard">Standard (1500€ - 2500€)</SelectItem>
              <SelectItem value="premium">Premium (2500€ +)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="activity" className="text-sm font-medium text-gray-700">
            Activités
          </label>
          <Select value={activity} onValueChange={setActivity}>
            <SelectTrigger id="activity">
              <SelectValue placeholder="Toutes activités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes activités</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="wellness">Bien-être</SelectItem>
              <SelectItem value="cuisine">Cuisine</SelectItem>
              <SelectItem value="adventure">Aventure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="bg-sky-DEFAULT hover:bg-sky-dark text-gray-dark">
          <Search className="mr-2 h-4 w-4" />
          Rechercher
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
