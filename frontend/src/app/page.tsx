import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <Building2 className="h-16 w-16" style={{ color: "#D97706" }} />
        <h1 className="text-5xl font-extrabold tracking-tight" style={{ color: "#D97706" }}>
          DClaw Warehouse
        </h1>
        <p className="text-lg text-slate-300 max-w-md">
          Warehouse automation
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#D97706" }}
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
