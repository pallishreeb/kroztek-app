"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // 🔑 auth context
import { useCart } from "../context/CartContext"; // 🔑 cart context
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); // 🔑 get cart from context
  const { user } = useAuth(); // 🔑 logged-in user info
  const router = useRouter();

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    company: "",
    gstin: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const [taxRate] = useState(0.18);
  const [shippingCost, setShippingCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Load billing email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setBilling((prev) => ({ ...prev, email: user.email || "" })); // Fix: Handle null case
    }
  }, [user]);

  const handleBillingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.product.price), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

const handleConfirmPayment = async () => {
  if (!transactionId) {
    alert("Please enter your Transaction ID to confirm payment.");
    return;
  }

  if (!cart || cart.length === 0) {
    alert("Your cart is empty. Cannot confirm payment.");
    return;
  }

  // Optional: require login before checkout
  if (!user) {
    alert("Please login first to place an order!");
    return;
  }

  const orderData = {
    userId: user?.uid || "guest",
    userEmail: user?.email || billing.email,
    billingDetails: billing,
    cart: cart.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price),
      quantity: item.quantity,
      image: item.product.image,
    })),
    subtotal,
    tax,
    total,
    transactionId,
    status: "paid",
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, "orders"), orderData);

    // ✅ SEND EMAIL via Resend API after saving order
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: [billing.email, "kroztekintegratedsolution@gmail.com"], // customer + admin
        subject: "Order Confirmation - Kroztek",
        message: `
          <h2>Thank you for your order, ${billing.firstName}!</h2>
          <p>We've received your order and will start processing soon.</p>
          
          <h3>Order Summary</h3>
          <table border="1" cellspacing="0" cellpadding="6">
            <tr><th>Product</th><th>Qty</th><th>Price</th></tr>
            ${cart
              .map(
                (item) =>
                  `<tr>
                     <td>${item.product.name}</td>
                     <td>${item.quantity}</td>
                     <td>₹${item.product.price}</td>
                   </tr>`
              )
              .join("")}
          </table>
          
          <p><b>Subtotal:</b> ₹${subtotal.toFixed(2)}</p>
          <p><b>Tax:</b> ₹${tax.toFixed(2)}</p>
          <p><b>Total:</b> ₹${total.toFixed(2)}</p>
          <p><b>Transaction ID:</b> ${transactionId}</p>
          
          <p>You can view your orders anytime in your account.</p>
          <p>— Team Kroztek</p>
        `,
      }),
    });

    alert(`Payment recorded!\nTransaction ID: ${transactionId}`);

    // Clear cart
    clearCart();
    setShowModal(false);

    // Redirect to Orders page
    router.push("/orders");
  } catch (error) {
    console.error("Error saving order: ", error);
    alert("Something went wrong. Please try again!");
  }
};


  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Left: Billing Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={billing.firstName}
            onChange={handleBillingChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={billing.lastName}
            onChange={handleBillingChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>
        <input
          type="text"
          name="company"
          placeholder="Company Name (optional)"
          value={billing.company}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          name="gstin"
          placeholder="GSTIN (optional)"
          value={billing.gstin}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          name="country"
          value={billing.country}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        >
          <option value="">Select a country / region *</option>
          <option value="India">India</option>
        </select>
        <input
          type="text"
          name="address"
          placeholder="Street Address *"
          value={billing.address}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Town / City *"
          value={billing.city}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State / County *"
          value={billing.state}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="Postcode / ZIP *"
          value={billing.zip}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          value={billing.phone}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address *"
          value={billing.email}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <textarea
          name="orderNotes"
          placeholder="Order notes (optional)"
          value={billing.orderNotes}
          onChange={handleBillingChange}
          className="border px-3 py-2 rounded w-full"
          rows={4}
        />
      </div>

      {/* Right: Order Summary + Payment */}
      <div className="border p-4 rounded space-y-4 h-fit">
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <div className="space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{(item.quantity * parseFloat(item.product.price)).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Enter your address to view shipping options.</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (GST 18%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        {/* Payment Instructions */}
        <div className="mt-4 space-y-2 bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-800">Payment Details</h3>
          <div className="text-sm space-y-1">
            <p><strong>Bank:</strong> STATE BANK OF INDIA</p>
            <p><strong>Name:</strong> KROZTEK INTEGRATED SOLUTION</p>
            <p><strong>IFSC:</strong> SBIN0000068</p>
            <p><strong>Account No:</strong> 41936176103</p>
          </div>
          <p className="text-sm text-blue-700">Scan this QR code using any UPI app:</p>
          <img src="/img/upi-qr-sample.png" alt="UPI QR Code" className="w-32 h-32 border rounded mx-auto" />
          <p className="text-center text-sm">OR pay using UPI ID: <strong>kroztek@upi</strong></p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          disabled={cart.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          I Have Paid - Confirm Order
        </button>
      </div>

      {/* Modal for Transaction ID */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold">Enter Transaction Details</h3>
            <p className="text-sm text-gray-600">Please enter your UPI transaction ID to confirm your payment</p>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Transaction ID (e.g., 123456789012)"
              required
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!transactionId.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}