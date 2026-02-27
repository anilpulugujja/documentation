"use client";

import { useState, type ReactNode } from "react";

import type { FrontmatterState, LoadingState, Collection } from "@/types/dashboard";
import { primaryFields } from "@/types/dashboard";

type AccordionProps = {
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

const Accordion = ({ title, description, open, onToggle, children }: AccordionProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white/80">
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      onClick={onToggle}
      aria-expanded={open}
    >
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <span className="text-slate-400">{open ? "–" : "+"}</span>
    </button>
    {open && <div className="border-t border-slate-100 px-4 py-4">{children}</div>}
  </div>
);

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
  frontmatter,
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
  const [metadataOpen, setMetadataOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <section className="glass-panel tight p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
            {currentCollection?.orgSlug && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                {currentCollection.orgSlug}
              </span>
            )}
            {currentCollection?.product && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                {currentCollection.product}
              </span>
            )}
            {currentCollection?.version && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                v{currentCollection.version}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {frontmatter.title || selectedFile || "Select a document"}
          </h2>
          {frontmatter.description && (
            <p className="text-sm text-slate-500">{frontmatter.description as string}</p>
          )}
          {currentDocId ? (
            <span className={`status-pill ${publishedPath?.length ? "published" : "draft"}`}>
              {publishedPath?.length
                ? `Published · ${publishedSectionLabel ?? "Sidebar"}`
                : "Draft · Not in sidebar"}
            </span>
          ) : (
            <span className="status-pill draft">Select a file to begin</span>
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
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loadingState === "saving" ? "Saving…" : "Save changes"}
        </button>
      </div>

      {(error || notification || warnings.length) && (
        <div className="toast-stack mt-4" role="status" aria-live="polite">
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700">
              <span className="nav-icon">!</span>
              <p>{error}</p>
            </div>
          )}
          {notification && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <span className="nav-icon">✓</span>
              <p>{notification}</p>
            </div>
          )}
          {!!warnings.length && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="nav-icon">⚠</span>
                  <p className="font-semibold">Import warnings</p>
                </div>
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
        </div>
      )}

      <div className="mt-6 space-y-4">
        <Accordion
          title="Metadata"
          description="Title, description, sidebar label, slug, and tags."
          open={metadataOpen}
          onToggle={() => setMetadataOpen((prev) => !prev)}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {primaryFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs font-semibold uppercase text-slate-500">
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                    rows={4}
                    value={formatFieldValue(field.key)}
                    onChange={(e) => onFrontmatterFieldChange(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                    value={formatFieldValue(field.key)}
                    onChange={(e) => onFrontmatterFieldChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion
          title="Advanced frontmatter"
          description="Inject raw JSON for custom props, required flags, and SEO overrides."
          open={advancedOpen}
          onToggle={() => setAdvancedOpen((prev) => !prev)}
        >
          <textarea
            className="h-64 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700"
            placeholder={advancedFrontmatterPlaceholder}
            value={advancedFrontmatter}
            onChange={(e) => onAdvancedFrontmatterChange(e.target.value)}
          />
        </Accordion>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-slate-600">Markdown body</label>
        <textarea
          className="editor-body mt-2 min-h-[360px] w-full px-4 py-4 text-sm text-slate-800"
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
        />
        <p className="char-count">{body.length.toLocaleString()} characters</p>
      </div>
    </section>
  );
}
