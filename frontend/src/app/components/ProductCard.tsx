import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || "/placeholder-product.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-product.svg";
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-orange-600 font-semibold uppercase mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
