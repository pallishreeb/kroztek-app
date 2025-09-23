"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { generateInvoice } from "@/lib/generateInvoice";

// BillingDetails type (adjust fields if needed)
interface BillingDetails {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  [key: string]: string | undefined; // allows extra fields if present
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  billingDetails: BillingDetails;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  transactionId: string;
  status: string;
  createdAt: Timestamp; // ✅ Firestore timestamp type
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const ordersData: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            billingDetails: data.billingDetails as BillingDetails,
            cart: data.cart as CartItem[],
            subtotal: data.subtotal,
            tax: data.tax,
            total: data.total,
            transactionId: data.transactionId,
            status: data.status,
            createdAt: data.createdAt as Timestamp,
          };
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (!user) return <p className="text-center py-10">Please login to view your orders.</p>;
  if (orders.length === 0) return <p className="text-center py-10">No orders found!</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-6 shadow-sm">
          {/* Order Header */}
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID: {order.id}</span>
            <span className="text-gray-500">
              {order.createdAt?.seconds
                ? format(new Date(order.createdAt.seconds * 1000), "dd MMM yyyy, hh:mm a")
                : "—"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Transaction ID: {order.transactionId}</span>
            <span>
              Status:{" "}
              <strong className={order.status === "paid" ? "text-green-600" : "text-red-600"}>
                {order.status}
              </strong>
            </span>
          </div>

          {/* Products */}
          <div className="border-t pt-2 mt-2">
            {order.cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p>{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-2 mt-2 flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => generateInvoice(order)}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
