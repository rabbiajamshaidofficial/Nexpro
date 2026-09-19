import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Package, X } from "lucide-react";
import { formatCurrency } from "../../utils/format";

function OrderConfirmationModal({ order, onClose, onViewOrders }) {
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/80"
          aria-label="Close order confirmation"
          onClick={onClose}
        />

        {/* Modal Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmed-title"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Icon Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-accent-emerald ring-8 ring-emerald-50/50 dark:bg-emerald-950/60 dark:ring-emerald-950/40">
              <CheckCircle2 size={36} />
            </div>
            <h2
              id="confirmed-title"
              className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Order Placed Successfully
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your hardware is being calibrated in the lab.
            </p>
          </div>

          {/* Details Card */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-700/60">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Order ID
                </span>
                <p className="font-mono text-sm font-bold text-slate-900 dark:text-accent-lime">
                  {order.id}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Paid
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>

            <div className="pt-3">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Purchased Items ({order.items?.length || 0})
              </span>
              <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-white p-2 text-xs shadow-sm dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt=""
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400">
                      Qty: {item.quantity} · {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-slate-200/60 pt-3 text-xs text-slate-600 dark:border-slate-700/60 dark:text-slate-400">
              <p>
                <strong className="text-slate-900 dark:text-white">Delivery to:</strong>{" "}
                {order.shippingDetails?.fullName} — {order.shippingDetails?.address},{" "}
                {order.shippingDetails?.city} {order.shippingDetails?.zipCode}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewOrders?.();
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
            >
              <Package size={16} />
              <span>View My Orders</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OrderConfirmationModal;
