"use client";

interface DashboardHeaderProps {
  onLogout: () => void;
}

export function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">
            GetRightData
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            Documentation Admin Panel
          </h1>
        </div>
        <button
          onClick={onLogout}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
