import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/nepkart-logo.png"
              alt="Nepkart logo"
              className="h-14 w-auto"
            />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
