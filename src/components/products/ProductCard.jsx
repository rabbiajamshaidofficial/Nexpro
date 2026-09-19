import { Eye, Plus, Star } from "lucide-react";
import { formatCurrency } from "../../utils/format";

function ProductCard({ product, onQuickView, onAddToCart }) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-3 transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-accent-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-900">
          {product.featured ? "Drop" : product.category}
        </span>
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/95 px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition hover:bg-white dark:bg-slate-800/95 dark:text-white dark:hover:bg-slate-700"
          >
            <Eye size={14} />
            Quick View
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
          >
            <Plus size={14} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="px-1 pb-2 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {product.type}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Star size={12} className="fill-accent-emerald text-accent-emerald" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{product.tagline}</p>
        <p className="mt-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          {formatCurrency(product.price)}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
