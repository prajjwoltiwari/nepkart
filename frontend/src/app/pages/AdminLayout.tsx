import { Outlet } from "react-router";
import { AdminHeader } from "@/app/components/AdminHeader";
import { Toaster } from "sonner";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}
