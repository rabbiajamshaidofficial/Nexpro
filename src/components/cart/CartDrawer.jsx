import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/format";

function CartDrawer({ open, onClose, onCheckout }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingProgress,
    remainingForFreeShipping,
  } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/70"
            aria-label="Close cart"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-slate-200/80 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your bag</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{cartItems.length} unique items</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-slate-200/80 px-5 py-4 dark:border-slate-800">
              <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <span>Free shipping</span>
                <span>
                  {remainingForFreeShipping === 0
                    ? "Unlocked"
                    : `${formatCurrency(remainingForFreeShipping)} away`}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-accent-emerald transition-all duration-300"
                  style={{ width: `${shippingProgress * 100}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <div className="mt-16 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your bag is empty. Add a wearable or gadget to begin.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-slate-100 p-2.5 transition dark:border-slate-800/80 dark:bg-slate-800/40"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{item.name}</p>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{formatCurrency(item.price)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-slate-400 transition hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-2.5 inline-flex items-center rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800">
                          <button
                            type="button"
                            className="px-2.5 py-1 text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-6 text-center text-xs font-semibold text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-2.5 py-1 text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-slate-200/80 p-5 dark:border-slate-800">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <button
                type="button"
                disabled={cartItems.length === 0}
                onClick={onCheckout}
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
              >
                Proceed to Checkout
              </button>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-2 w-full py-2 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Clear bag
                </button>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
