import { MessageCircle } from "lucide-react";

export default function AuthShell({ children, title, description }) {
  return (
    <main className="min-h-screen bg-[#090a1d] p-0 font-sans text-[#11133b] sm:p-6 lg:p-10">
      <div className="mx-auto flex min-h-screen max-w-6xl overflow-hidden bg-white shadow-2xl shadow-indigo-950/40 sm:min-h-[calc(100vh-3rem)] sm:rounded-3xl lg:min-h-[calc(100vh-5rem)]">
        <section className="relative hidden w-[43%] overflow-hidden bg-[#171947] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.75),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(124,58,237,0.7),transparent_40%)]" />
          <img src="/auth-community.png" alt="People connecting through conversation" className="absolute inset-0 h-full w-full object-cover object-center opacity-75 mix-blend-screen" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur-md"><MessageCircle className="h-5 w-5" /></div>
            <span className="text-xl font-bold tracking-tight">Yappa Yappa</span>
          </div>
          <div className="relative z-10 max-w-sm pb-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight">{title}</h1>
            <p className="mt-4 text-sm leading-6 text-indigo-100/80">{description}</p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-indigo-50/90 backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />A kinder internet starts with people like you.</div>
          </div>
        </section>
        <section className="flex w-full items-center justify-center bg-white px-6 py-10 sm:px-12 lg:w-[57%] lg:px-20"><div className="w-full max-w-md">{children}</div></section>
      </div>
    </main>
  );
}
