import { useMemo, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { products } from "./data/products";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/hero/Hero";
import ProductGrid from "./components/products/ProductGrid";
import QuickViewModal from "./components/products/QuickViewModal";
import CartDrawer from "./components/cart/CartDrawer";
import AuthModal from "./components/auth/AuthModal";
import CheckoutModal from "./components/checkout/CheckoutModal";
import OrderConfirmationModal from "./components/checkout/OrderConfirmationModal";
import OrdersModal from "./components/orders/OrdersModal";

function Storefront() {
  const { currentUser, loading } = useAuth();
  const { addToCart } = useCart();
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickView, setQuickView] = useState(null);

  const catalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      [product.name, product.tagline, product.category, product.type]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [searchQuery]);

  const handleCheckout = () => {
    if (!currentUser) {
      setCartOpen(false);
      setAuthOpen(true);
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleShopNow = () => {
    const shopEl = document.getElementById("shop");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-accent-lime" />
      </div>
    );
  }

  return (
    <div
      id="home"
      className="flex min-h-screen flex-col justify-between bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100"
    >
      <div>
        <Navbar
          onOpenAuth={() => setAuthOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          onFilterChange={setFilter}
          onOpenOrders={() => setOrdersOpen(true)}
        />
        <main>
          <Hero />
          <ProductGrid
            products={catalog}
            filter={filter}
            onFilterChange={setFilter}
            onQuickView={setQuickView}
            onAddToCart={(product) => {
              addToCart(product);
              setCartOpen(true);
            }}
          />
        </main>
      </div>

      <Footer />

      <QuickViewModal
        product={quickView}
        onClose={() => setQuickView(null)}
        onAddToCart={addToCart}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={(placedOrder) => {
          setConfirmedOrder(placedOrder);
        }}
      />
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onViewOrders={() => {
          setConfirmedOrder(null);
          setOrdersOpen(true);
        }}
      />
      <OrdersModal
        open={ordersOpen}
        onClose={() => setOrdersOpen(false)}
        onShopNow={handleShopNow}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Storefront />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;