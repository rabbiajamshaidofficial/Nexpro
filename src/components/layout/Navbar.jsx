import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Hexagon,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
  { label: "Shop", href: "#shop", filter: "All" },
  { label: "Wearables", href: "#shop", filter: "Wearables" },
  { label: "Gadgets", href: "#shop", filter: "Gadgets" },
  { label: "Drops", href: "#shop", filter: "Drops" },
];

function Navbar({
  onOpenAuth,
  onOpenCart,
  onSearch,
  searchQuery,
  onFilterChange,
  onOpenOrders,
}) {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery || "");
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const profileRef = useRef(null);

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setQuery(searchQuery || "");
  }

  // Sync isDark → <html class="dark"> + localStorage whenever it changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const onClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  const initials = currentUser?.email?.slice(0, 1).toUpperCase() || "N";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-accent-lime transition-colors dark:bg-slate-800">
            <Hexagon size={18} className="text-[#d4ff00]" />
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-slate-900 dark:text-white">
            NEXPRO
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => onFilterChange?.(link.filter)}
                className="text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="rounded-xl border border-slate-200/80 p-2 text-slate-700 transition hover:bg-slate-100 hover:shadow-md dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {isDark ? (
              <Sun size={18} className="text-accent-lime transition-transform hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-label="Toggle search"
            className="rounded-xl border border-slate-200/80 p-2 text-slate-700 transition hover:bg-slate-100 hover:shadow-md dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <Search size={18} />
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Cart, ${itemCount} items`}
            className="relative rounded-xl border border-slate-200/80 p-2 text-slate-700 transition hover:bg-slate-100 hover:shadow-md dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-emerald px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl border border-slate-200/80 py-1.5 pl-1.5 pr-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:shadow-md dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-accent-lime dark:bg-slate-800">
                  {initials}
                </span>
                <span className="max-w-[140px] truncate font-medium">{currentUser.email}</span>
                <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="border-b border-slate-100 px-3 py-2 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                      <p className="font-semibold text-slate-900 dark:text-white">Logged In</p>
                      <p className="truncate font-mono">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          onOpenOrders?.();
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Package size={15} className="text-emerald-500" />
                        <span>My Orders</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={async () => {
                          setProfileOpen(false);
                          await logout();
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        <LogOut size={15} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="hidden items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300 sm:inline-flex"
            >
              <User size={15} />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-xl border border-slate-200/80 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
          >
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6"
            >
              <Search size={16} className="shrink-0 text-slate-400 dark:text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  onSearch?.(event.target.value);
                }}
                placeholder="Search visors, decks, drones..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <div className="p-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    onFilterChange?.(link.filter);
                  }}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

              <div className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">Theme</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {isDark ? (
                    <>
                      <Sun size={15} className="text-accent-lime" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={15} className="text-slate-700 dark:text-slate-200" />
                      <span>Light Mode</span>
                    </>
                  )}
                </button>
              </div>

              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

              {currentUser ? (
                <>
                  <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white">Account: </span>
                    <span className="truncate">{currentUser.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenOrders?.();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                  >
                    <Package size={16} className="text-emerald-500" />
                    <span>My Orders</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setMobileOpen(false);
                      await logout();
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenAuth();
                  }}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950"
                >
                  <User size={16} />
                  <span>Login / Sign Up</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;