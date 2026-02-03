import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { CartProvider } from "@/app/context/CartContext";
import { AuthProvider } from "@/app/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
