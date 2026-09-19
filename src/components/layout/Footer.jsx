import { Hexagon, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white pb-12 pt-16 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-100 pb-12 dark:border-slate-800 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-xl bg-slate-900 p-2 text-white dark:bg-slate-800">
                <Hexagon className="h-5 w-5 text-[#d4ff00]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                NEXPRO
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Precision-engineered wearable tech and minimal hardware designed for modern daily rituals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Twitter / X */}
              <a
                href="#"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="#"
                className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#shop" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Wearables
                </a>
              </li>
              <li>
                <a href="#shop" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Gadgets
                </a>
              </li>
              <li>
                <a href="#shop" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Limited Drops
                </a>
              </li>
              <li>
                <a href="#shop" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Stay Updated
            </h4>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              Subscribe to get notified about secret drops and hardware restocks.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="enter your email..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 transition-all placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-accent-lime"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute bottom-1 right-1 top-1 flex items-center justify-center rounded-md bg-slate-900 px-2.5 text-white transition-colors hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-400 dark:text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} NEXPRO Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}