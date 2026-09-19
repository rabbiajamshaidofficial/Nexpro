import ProductCard from "./ProductCard";

const FILTERS = ["All", "Wearables", "Gadgets", "Drops"];

function matchesFilter(product, filter) {
  if (filter === "Wearables") return product.category === "Wearable";
  if (filter === "Gadgets") return product.category === "Gadget";
  if (filter === "Drops") return product.featured;
  return true;
}

function ProductGrid({ products, filter, onFilterChange, onQuickView, onAddToCart }) {
  const visible = products.filter((product) => matchesFilter(product, filter));

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">The collection</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Precision hardware.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onFilterChange(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === item
                  ? "bg-slate-900 text-white shadow-sm dark:bg-accent-lime dark:text-slate-950"
                  : "border border-slate-200/80 bg-white text-slate-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No products match this search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
