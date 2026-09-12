import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestOtp } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import AuthShell from "../../components/auth/AuthShell";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [canVerifyAccount, setCanVerifyAccount] = useState(false);
  const [isRequestingVerification, setIsRequestingVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleVerifyAccount = async () => {
    setError("");
    setIsRequestingVerification(true);
    try {
      await requestOtp(formData.email);
      navigate("/register", { state: { verifyEmail: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not send a verification code.");
    } finally {
      setIsRequestingVerification(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setCanVerifyAccount(false);
    setIsSubmitting(true);
    try {
      await login(formData);
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to sign in. Please try again.";
      setCanVerifyAccount(message.toLowerCase().includes("verify your account"));
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Real conversations, brighter tomorrows. Pick up where you left off on Yappa Yappa."
    >
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold text-indigo-600">
          Good to see you
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-[#11133b]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Join the conversation in a few seconds.
        </p>
      </div>
      {location.state?.message && (
        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {location.state.message}
        </div>
      )}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
          {canVerifyAccount && (
            <button
              type="button"
              onClick={handleVerifyAccount}
              disabled={isRequestingVerification}
              className="ml-1 font-bold underline underline-offset-2 hover:text-red-800"
            >
              {isRequestingVerification ? "Sending code..." : "Verify your account"}
            </button>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-700">
            Email
          </span>
          <span className="relative block">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold text-slate-700">
            Password
          </span>
          <span className="relative block">
            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3.5 pr-12 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-indigo-600 hover:text-indigo-500"
        >
          Register
        </Link>
      </p>
    </AuthShell>
  );
}
