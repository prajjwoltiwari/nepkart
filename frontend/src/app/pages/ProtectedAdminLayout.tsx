import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import AdminLayout from "./AdminLayout";

export default function ProtectedAdminLayout() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}
