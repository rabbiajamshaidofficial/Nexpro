import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getErrorMessage = (error) => {
  return error?.message || "Authentication failed. Please try again.";
};

function AuthModal({ open, onClose, initialTab = "login" }) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const [prevOpen, setPrevOpen] = useState(open);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setTab(initialTab);
      setError("");
    }
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (tab === "login") {
        await login(trimmedEmail, password);
      } else {
        await signup(trimmedEmail, password);
      }
      handleClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/70"
            aria-label="Close authentication"
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="relative w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h2 id="auth-title" className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Access saved carts, drops, orders, and member pricing.
            </p>

            <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              {["login", "signup"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleTabChange(value)}
                  className={`rounded-lg py-2 text-sm font-medium transition ${
                    tab === value
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {value === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none ring-emerald-500/30 transition focus:border-emerald-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="you@studio.com"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
                <input
                  type="password"
                  autoComplete={tab === "login" ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 outline-none ring-emerald-500/30 transition focus:border-emerald-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="At least 6 characters"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-accent-lime dark:text-slate-950 dark:hover:bg-lime-300"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {tab === "login" ? "Continue" : "Create account"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
