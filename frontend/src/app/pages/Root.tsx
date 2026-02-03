import { Outlet } from "react-router";
import { Header } from "@/app/components/Header";
import { Toaster } from "sonner";

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}
