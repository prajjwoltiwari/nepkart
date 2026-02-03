import { useEffect, useState } from "react";
import { api } from "@/app/services/api";

type OrderItem = {
  id: number;
  product: {
    id: number;
    name: string;
    sku: string;
  };
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orderItems: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  orderDate: string;
  status: "RECEIVED" | "IN_PROGRESS" | "SHIPPED";
};

const STATUS_OPTIONS = [
  { value: "RECEIVED", label: "Received" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "SHIPPED", label: "Shipped" },
] as const;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.orders.list();
      // Sort by order date (newest first)
      const sorted = (data as any[]).sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return dateB - dateA;
      });
      setOrders(sorted as Order[]);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await api.orders.updateStatus(orderId, newStatus);
      await loadOrders(); // Reload to get updated data
    } catch (e: any) {
      alert(`Failed to update status: ${e?.message || "Unknown error"}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId: number, orderNumber: string) => {
    if (!confirm(`Are you sure you want to delete Order #${orderNumber}? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(orderId);
    try {
      await api.orders.delete(orderId);
      await loadOrders(); // Reload to get updated data
    } catch (e: any) {
      alert(`Failed to delete order: ${e?.message || "Unknown error"}`);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECEIVED":
        return "bg-blue-100 text-blue-700";
      case "IN_PROGRESS":
        return "bg-orange-100 text-orange-700";
      case "SHIPPED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Received</h1>
      <p className="text-gray-600 mb-8">Manage customer orders and update shipping status.</p>

      {loading ? (
        <div className="py-16 text-center text-gray-600">Loading orders…</div>
      ) : error ? (
        <div className="py-16 text-center text-red-600">{error}</div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg">No orders yet.</p>
          <p className="text-sm mt-2">Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Order #{order.orderId}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                    >
                      {STATUS_OPTIONS.find((s) => s.value === order.status)?.label || order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    disabled={updatingId === order.id || deletingId === order.id}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-semibold disabled:opacity-50"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {updatingId === order.id && (
                    <span className="text-sm text-gray-500">Updating...</span>
                  )}
                  <button
                    onClick={() => deleteOrder(order.id, order.orderId)}
                    disabled={deletingId === order.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    title="Delete order"
                  >
                    {deletingId === order.id ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <span>🗑️</span>
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-semibold">Name:</span> {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {order.customer.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {order.customer.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> {order.customer.address}
                    </p>
                    <p>
                      {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm border-b border-gray-100 pb-2"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{item.product.name}</p>
                          <p className="text-gray-600 text-xs">
                            SKU: {item.product.sku} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="text-right space-y-1">
                    <div className="flex justify-between gap-8 text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">${Number(order.subtotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between gap-8 text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold">
                        ${Number(order.shippingCost).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-8 text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-semibold">${Number(order.tax).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between gap-8 text-lg font-bold text-gray-900 border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>${Number(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
