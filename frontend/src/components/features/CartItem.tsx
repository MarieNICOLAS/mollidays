
import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  price: number;
  dates: { start: string; end: string };
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  id,
  title,
  destination,
  image,
  price,
  dates,
  quantity,
  onQuantityChange,
  onRemove
}: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 animate-fade-in-up">
      {/* Image */}
      <div className="relative w-full sm:w-32 h-24 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Détails */}
      <div className="flex-grow space-y-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Supprimer cet article"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600">{destination}</p>
        <p className="text-sm text-gray-600">{dates.start} - {dates.end}</p>
        
        <div className="flex justify-between items-end pt-2">
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
            >
              +
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {(price * 2 * quantity).toLocaleString()} €
            </p>
            <p className="text-xs text-gray-500">
              {price.toLocaleString()} € par personne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
