"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const next = params.get("next") ?? "/";
      router.push(next);
      router.refresh();
    } else {
      setStatus("error");
      const data = await res.json().catch(() => ({}));
      setMessage(data.error ?? "Unable to sign in");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="glass-panel w-full max-w-md space-y-6 p-10"
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-500">
            GetRightData Docs
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Admin Console
          </h1>
          <p className="muted mt-2">
            Enter the admin passphrase to manage documentation content.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Admin Passphrase
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        {status === "error" && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
