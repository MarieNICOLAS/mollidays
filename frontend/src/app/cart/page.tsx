
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, ArrowLeft, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des circuits à votre panier avant de continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simuler une requête de paiement
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Réservation confirmée !",
        description: "Votre voyage a été réservé avec succès.",
      });

      clearCart();
      navigate("/confirmation");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Votre panier</h1>
            <p className="text-gray-600">
              {isEmpty
                ? "Votre panier est vide."
                : `Vous avez ${items.length} circuit(s) dans votre panier.`}
            </p>
          </motion.div>

          {isEmpty ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-16 bg-gray-50 rounded-xl"
            >
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Votre panier est vide</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Vous n'avez pas encore ajouté de circuits à votre panier.
                Découvrez nos voyages immersifs et commencez l'aventure !
              </p>
              <Button asChild>
                <Link to="/trips">
                  Découvrir nos circuits
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{getTotal().toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frais de service (5%)</span>
                      <span>{(getTotal() * 0.05).toFixed(2)} €</span>
                    </div>
                    {getTotal() > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes</span>
                        <span>Incluses</span>
                      </div>
                    )}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{(getTotal() * 1.05).toLocaleString()} €</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mb-4"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Traitement en cours..."
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Procéder au paiement
                      </>
                    )}
                  </Button>
                  
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Paiement sécurisé</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Annulation gratuite jusqu'à 30 jours avant le départ</span>
                    </div>
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Un acompte de 30% sera débité immédiatement</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          <motion.div variants={itemVariants} className="mt-8">
            <Button variant="ghost" asChild>
              <Link to="/trips" className="flex items-center text-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuer votre recherche
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
