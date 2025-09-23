"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { generateInvoice } from "@/lib/generateInvoice";
import Link from "next/link";

// BillingDetails type matching your checkout page structure
interface BillingDetails {
  firstName: string;
  lastName: string;
  company?: string;
  gstin?: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  orderNotes?: string;
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
  userEmail: string; // ✅ Added missing userEmail property
  billingDetails: BillingDetails;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  transactionId: string;
  status: string;
  createdAt: Timestamp;
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
            userEmail: data.userEmail, // ✅ Include userEmail from Firestore
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center min-h-[400px] flex items-center justify-center">
          <div>
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-4">Please login to view your orders.</p>
            <a 
              href="/auth/login" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="text-center min-h-[400px] flex items-center justify-center">
          <div>
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Found</h2>
            <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/products" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-gray-900">Order #{order.id.slice(-8)}</span>
                  <span className="text-sm text-gray-500">Transaction ID: {order.transactionId}</span>
                </div>
                <div className="flex flex-col md:items-end gap-1">
                  <span className="text-sm text-gray-600">
                    {order.createdAt?.seconds
                      ? format(new Date(order.createdAt.seconds * 1000), "dd MMM yyyy, hh:mm a")
                      : "—"}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === "paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6">
              {/* Products */}
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Items Ordered</h3>
                {order.cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Unit Price: Rs. {item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Actions */}
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Billing Address */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-3">Billing Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium">{order.billingDetails.firstName} {order.billingDetails.lastName}</p>
                    {order.billingDetails.company && <p>{order.billingDetails.company}</p>}
                    <p>{order.billingDetails.address}</p>
                    <p>{order.billingDetails.city}, {order.billingDetails.state} - {order.billingDetails.zip}</p>
                    <p>{order.billingDetails.phone}</p>
                    <p>{order.billingDetails.email}</p>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="lg:w-80">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">Rs. {order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (GST 18%)</span>
                      <span className="text-gray-900">Rs. {order.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">Rs. {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="pt-4 space-y-2">
                      <button
                        onClick={() => generateInvoice(order)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}