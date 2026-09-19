import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { formatCurrency } from "../../utils/format";

function QuickViewModal({ product, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[65] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/70"
            aria-label="Close quick view"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-slate-500 transition hover:bg-white hover:text-slate-900 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <img src={product.image} alt={product.name} className="h-64 w-full object-cover md:h-full" />
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {product.category} · {product.type}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{product.name}</h3>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                <Star size={14} className="fill-accent-emerald text-accent-emerald" />
                {product.rating.toFixed(1)} · {product.stock} in stock
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{product.description}</p>
              <p className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">{formatCurrency(product.price)}</p>
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuickViewModal;
