import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";

const FEATURES = [
  { icon: Truck, title: "Complimentary shipping", copy: "Free on orders over $1,500." },
  { icon: ShieldCheck, title: "Two-year coverage", copy: "Hardware support, no fine print." },
  { icon: Zap, title: "Same-day calibration", copy: "Ready before it leaves the lab." },
];

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              New season · Limited drops
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Quiet luxury for the next interface.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500 dark:text-slate-400">
              Wearables and pocket hardware designed with studio restraint — light surfaces, precise
              materials, and tools that disappear into daily ritual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
              >
                Shop the collection
                <ArrowRight size={16} />
              </a>
              <a
                href="#features"
                className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                Why Nexpro
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] bg-slate-50 dark:bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Precision electronics on a light studio surface"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/85">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Featured
              </p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">Helix Pocket Core</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Desktop power. Palm form.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="mt-6 grid gap-4 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, copy }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <Icon size={18} className="text-emerald-600 dark:text-emerald-400" />
            <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
