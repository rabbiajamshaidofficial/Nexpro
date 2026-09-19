import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  Loader2,
  Lock,
  ShieldCheck,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { formatCurrency } from "../../utils/format";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "crypto", label: "Cyber Mesh / Crypto", icon: Wallet },
  { id: "mesh_pay", label: "Direct Mesh / COD", icon: DollarSign },
];

function CheckoutModal({ open, onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const { cartItems, subtotal, clearCart, freeShippingThreshold } = useCart();
  const { createOrder } = useOrders();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card",
    cardNumber: "•••• •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "888",
  });

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 50;
  const orderTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter a contact phone number.");
      return;
    }
    if (!formData.address.trim() || !formData.city.trim() || !formData.zipCode.trim()) {
      setError("Please fill in complete shipping address details.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Simulate fast secure payment encryption handshake
      await new Promise((resolve) => setTimeout(resolve, 800));

      const selectedMethodObj = PAYMENT_METHODS.find(
        (m) => m.id === formData.paymentMethod
      );

      const placedOrder = createOrder({
        items: cartItems,
        subtotal,
        shippingFee,
        total: orderTotal,
        shippingDetails: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim() || currentUser?.email,
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode.trim(),
        },
        paymentMethod: selectedMethodObj?.label || "Credit Card",
      });

      clearCart();
      onClose();
      onSuccess?.(placedOrder);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to process order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/75"
            aria-label="Close checkout"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Lock size={16} />
                </div>
                <div>
                  <h2 id="checkout-title" className="text-base font-semibold text-slate-900 dark:text-white">
                    Secure Checkout
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Encrypted neural transaction
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {error && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
                  {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Details */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <Truck size={16} className="text-emerald-500" />
                    Shipping & Delivery Information
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Full Name *
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Deckard Shaw"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Email Address
                      </span>
                      <input
                        type="email"
                        name="email"
                        readOnly
                        value={formData.email}
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Phone Number *
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Street Address *
                      </span>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="742 Evergreen Sector, Level 04"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        City *
                      </span>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Neo District"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                      />
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                          State / Region
                        </span>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="CA"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                          ZIP / Postal *
                        </span>
                        <input
                          type="text"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="90210"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    Payment Method
                  </h3>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, paymentMethod: id }))
                        }
                        className={`flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition ${
                          formData.paymentMethod === id
                            ? "border-emerald-500 bg-emerald-50/40 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-300"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <Icon size={18} className="text-emerald-500" />
                          {formData.paymentMethod === id && (
                            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                          )}
                        </div>
                        <span className="text-xs font-semibold">{label}</span>
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                      <div className="grid gap-2 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            Simulated Card Number
                          </span>
                          <input
                            type="text"
                            readOnly
                            value={formData.cardNumber}
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          />
                        </div>
                        <div>
                          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            Expires / CVC
                          </span>
                          <input
                            type="text"
                            readOnly
                            value={`${formData.cardExp} • ${formData.cardCvc}`}
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items in this order */}
                <div>
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Order Items ({cartItems.length})
                  </h3>
                  <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/30">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt=""
                            className="h-9 w-9 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                            <p className="text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Summary & Action */}
            <div className="border-t border-slate-200/80 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/90">
              <div className="mb-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:text-white">
                  <span>Total Amount</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
                >
                  Back to Bag
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={submitting || cartItems.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <span>Place Order · {formatCurrency(orderTotal)}</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CheckoutModal;

