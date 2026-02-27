"use client";

import type { FrontmatterState, LoadingState, Collection } from "@/types/dashboard";
import { primaryFields } from "@/types/dashboard";

interface EditorPanelProps {
  selectedFile: string;
  currentCollection: Collection | undefined;
  currentDocId: string;
  publishedPath: { id: string; label: string }[] | undefined;
  publishedSectionLabel: string | undefined;
  frontmatter: FrontmatterState;
  body: string;
  onBodyChange: (value: string) => void;
  advancedFrontmatter: string;
  onAdvancedFrontmatterChange: (value: string) => void;
  advancedFrontmatterPlaceholder: string;
  formatFieldValue: (key: string) => string;
  onFrontmatterFieldChange: (key: string, value: string) => void;
  loadingState: LoadingState;
  error: string;
  notification: string;
  warnings: string[];
  onDismissWarnings: () => void;
  onSave: () => void;
}

export function EditorPanel({
  selectedFile,
  currentCollection,
  currentDocId,
  publishedPath,
  publishedSectionLabel,
  body,
  onBodyChange,
  advancedFrontmatter,
  onAdvancedFrontmatterChange,
  advancedFrontmatterPlaceholder,
  formatFieldValue,
  onFrontmatterFieldChange,
  loadingState,
  error,
  notification,
  warnings,
  onDismissWarnings,
  onSave,
}: EditorPanelProps) {
  return (
    <section className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Editor
          </p>
          <h2 className="text-xl font-semibold text-slate-900">
            {selectedFile || "Select a document"}
          </h2>
          {currentCollection && (
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {currentCollection.orgSlug?.toUpperCase() ?? "ORG"} &bull; {currentCollection.product} &bull;{" "}
              {currentCollection.version}
            </p>
          )}
          {currentDocId && (
            <span
              className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                publishedPath?.length
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {publishedPath?.length
                ? `Published in ${publishedSectionLabel ?? ""}`
                : "Draft"}
            </span>
          )}
        </div>
        <button
          onClick={onSave}
          disabled={
            !selectedFile ||
            loadingState === "saving" ||
            loadingState === "loading" ||
            loadingState === "importing"
          }
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingState === "saving" ? "Saving\u2026" : "Save changes"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {notification && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notification}
        </div>
      )}
      {!!warnings.length && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Import warnings</p>
            <button
              className="text-xs font-semibold uppercase text-amber-700"
              onClick={onDismissWarnings}
            >
              Dismiss
            </button>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {primaryFields.map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-slate-600">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                  rows={4}
                  value={formatFieldValue(field.key)}
                  onChange={(e) => onFrontmatterFieldChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                  value={formatFieldValue(field.key)}
                  onChange={(e) => onFrontmatterFieldChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">
            Advanced Frontmatter (JSON)
          </label>
          <textarea
            className="mt-2 h-64 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700"
            placeholder={advancedFrontmatterPlaceholder}
            value={advancedFrontmatter}
            onChange={(e) => onAdvancedFrontmatterChange(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-slate-600">
          Markdown Body
        </label>
        <textarea
          className="mt-2 h-[360px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-800 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
        />
      </div>
    </section>
  );
}
