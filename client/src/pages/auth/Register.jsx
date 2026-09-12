import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register, requestOtp, verifyOtp } from "../../api/auth";
import AuthShell from "../../components/auth/AuthShell";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const location = useLocation();
  const verificationEmail = location.state?.verifyEmail || "";
  const [step, setStep] = useState(verificationEmail ? "otp" : "register");
  const [formData, setFormData] = useState({
    name: "",
    email: verificationEmail,
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const updateField = (field, value) =>
    setFormData({ ...formData, [field]: value });

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    if (digit && index < otp.length - 1)
      document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleOtpPaste = (index, event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otp.length - index);
    if (!pastedDigits) return;

    const nextOtp = [...otp];
    pastedDigits.split("").forEach((digit, offset) => {
      nextOtp[index + offset] = digit;
    });
    setOtp(nextOtp);
    document
      .getElementById(`otp-${Math.min(index + pastedDigits.length, otp.length - 1)}`)
      ?.focus();
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await verifyOtp(formData.email, otp.join(""));
      setSession(response.data);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "That OTP is invalid or expired.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setIsResending(true);
    try {
      await requestOtp(formData.email);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend the code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthShell
      title={step === "otp" ? "Verify your email" : "Create your account"}
      description={
        step === "otp"
          ? "One last step and you’re ready to start yapping."
          : "Join a more open, friendly community built around real conversations."
      }
    >
      {step === "register" ? (
        <>
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-indigo-600">
              You belong here
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#11133b]">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start sharing your yaps with the community.
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <FormInput
              icon={<UserRound />}
              label="Your name"
              type="text"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Your name"
            />
            <FormInput
              icon={<Mail />}
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              placeholder="you@example.com"
            />
            <PasswordInput
              label="Password"
              value={formData.password}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onChange={(value) => updateField("password", value)}
            />
            <PasswordInput
              label="Confirm password"
              value={formData.confirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onChange={(value) => updateField("confirmPassword", value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setStep("register")}
            className="mb-7 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to registration
          </button>
          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#11133b]">
              Verify your email
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We sent a 4-digit code to{" "}
              <span className="font-semibold text-slate-700">
                {formData.email}
              </span>
              .
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  onPaste={(event) => handleOtpPaste(index, event)}
                  className="h-14 w-full rounded-xl border border-slate-200 text-center text-xl font-bold text-[#11133b] outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || otp.some((digit) => !digit)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-bold text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </p>
        </>
      )}
    </AuthShell>
  );
}

function FormInput({ icon, label, type, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold capitalize text-slate-700">
        {label}
      </span>
      <span className="relative block">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />
      </span>
    </label>
  );
}

function PasswordInput({
  label,
  value,
  showPassword,
  setShowPassword,
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold capitalize text-slate-700">
        {label}
      </span>
      <span className="relative block">
        <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type={showPassword ? "text" : "password"}
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="At least 8 characters"
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
  );
}
