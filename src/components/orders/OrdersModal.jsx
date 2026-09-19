import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import { formatCurrency } from "../../utils/format";

function OrdersModal({ open, onClose, onShopNow }) {
  const { orders } = useOrders();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/80"
            aria-label="Close orders"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="orders-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-accent-lime dark:bg-slate-800">
                  <Package size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="orders-title" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      My Orders
                    </h2>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {orders.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Track your calibrated devices and drop dispatches
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800/80 dark:text-slate-500">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    No orders placed yet
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    You haven't ordered any hardware or limited drops yet. Start exploring the collection.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onShopNow?.();
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
                  >
                    Explore Hardware
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 dark:border-slate-800/80 dark:bg-slate-850/60">
                        <div className="flex flex-wrap items-center gap-3">
                          <div>
                            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Order ID
                            </span>
                            <p className="font-mono text-sm font-bold text-slate-900 dark:text-accent-lime">
                              {order.id}
                            </p>
                          </div>
                          <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
                          <div>
                            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Date Placed
                            </span>
                            <p className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                              <Calendar size={12} className="text-slate-400" />
                              {order.formattedDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Status Badge */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {order.status || "Order Placed"}
                          </span>

                          {/* Total Paid */}
                          <div className="text-right">
                            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Total
                            </span>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-slate-100 px-5 py-3 dark:divide-slate-800">
                        {order.items?.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200/60 dark:ring-slate-700"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Category: {item.category} · Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                {item.quantity} × {formatCurrency(item.price)}
                              </span>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/40 px-5 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-400" />
                          <span>
                            Ship to:{" "}
                            <strong className="text-slate-700 dark:text-slate-300">
                              {order.shippingDetails?.fullName}
                            </strong>{" "}
                            ({order.shippingDetails?.city}, {order.shippingDetails?.zipCode})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Truck size={13} className="text-slate-400" />
                          <span>Est: {order.estimatedDelivery || "2–3 Business Days"}</span>
                          <span className="mx-1.5 text-slate-300 dark:text-slate-600">|</span>
                          <span>Method: {order.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200/80 px-6 py-4 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-750"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrdersModal;
