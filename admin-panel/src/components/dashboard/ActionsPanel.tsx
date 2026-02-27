"use client";

import type {
  NewDocState,
  Template,
  LoadingState,
  PublishState,
  PositionMode,
  Collection,
} from "@/types/dashboard";
import type { SidebarCategory } from "@/types/sidebar";

interface ActionsPanelProps {
  newDoc: NewDocState;
  onNewDocChange: React.Dispatch<React.SetStateAction<NewDocState>>;
  onFilenameChange: (value: string) => void;
  templates: Template[];
  currentCollection: Collection | undefined;
  currentDir: string;
  onWordUpload: (file: File) => void;
  onMarkdownUpload: (file: File) => void;
  onCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  loadingState: LoadingState;
  currentDocId: string;
  publishedSectionLabel: string | undefined;
  moduleCategories: SidebarCategory[];
  submoduleCategories: SidebarCategory[];
  selectedModuleId: string;
  onModuleChange: (id: string) => void;
  selectedSubmoduleId: string;
  onSubmoduleChange: (id: string) => void;
  positionMode: PositionMode;
  onPositionModeChange: (mode: PositionMode) => void;
  beforeDocId: string;
  onBeforeDocChange: (id: string) => void;
  targetDocOptions: string[];
  publishState: PublishState;
  publishedPath: { id: string; label: string }[] | undefined;
  onPublish: () => void;
  onUnpublish: () => void;
  onCreateModule: () => void;
  onCreateSubmodule: () => void;
}

export function ActionsPanel({
  newDoc,
  onNewDocChange,
  onFilenameChange,
  templates,
  currentCollection,
  onWordUpload,
  onMarkdownUpload,
  onCreate,
  loadingState,
  currentDocId,
  publishedSectionLabel,
  moduleCategories,
  submoduleCategories,
  selectedModuleId,
  onModuleChange,
  selectedSubmoduleId,
  onSubmoduleChange,
  positionMode,
  onPositionModeChange,
  beforeDocId,
  onBeforeDocChange,
  targetDocOptions,
  publishState,
  publishedPath,
  onPublish,
  onUnpublish,
  onCreateModule,
  onCreateSubmodule,
}: ActionsPanelProps) {
  return (
    <section className="glass-panel h-fit p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Create
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            New document
          </h2>
        </div>
      </div>
      <form className="mt-5 space-y-4" onSubmit={onCreate}>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Directory
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.directory}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, directory: e.target.value }))
            }
            placeholder="e.g. observability"
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave blank to create at the {currentCollection?.product ?? "collection"} root.
            Only add nested folders like <code>observability/alerts</code>.
          </p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Filename
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            placeholder="getting-started.md"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Template
          </label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.templateId}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, templateId: e.target.value }))
            }
          >
            <option value="">Start blank</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Title
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.title}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Description
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            rows={2}
            value={newDoc.description}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Sidebar Label
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.sidebar_label}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, sidebar_label: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Slug
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.slug}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, slug: e.target.value }))
            }
            placeholder="/datatrust/7.6/new-page"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">
            Tags
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.tags}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, tags: e.target.value }))
            }
            placeholder="datatrust,onboarding"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 disabled:opacity-70"
          disabled={loadingState === "creating" || loadingState === "importing"}
        >
          {loadingState === "creating" ? "Creating\u2026" : "Create document"}
        </button>
      </form>
      <p className="muted mt-4">
        Files are written directly into the Git workspace under
        <br />
        <span className="font-mono text-xs text-slate-500">
          documentation/docs-platform
        </span>
      </p>

      {/* Word import */}
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4">
        <h3 className="text-sm font-semibold text-slate-700">Import from Word</h3>
        <p className="mt-1 text-sm text-slate-500">
          Upload a .docx file and we&apos;ll convert it to Markdown, preserving headings,
          tables, lists, and styling. The converted content will appear in the editor so you can review it before saving.
        </p>
        <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-white">
          {loadingState === "importing" ? "Converting\u2026" : "Choose .docx file"}
          <input
            type="file"
            accept=".docx"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onWordUpload(file);
              }
              event.target.value = "";
            }}
          />
        </label>
        <p className="muted mt-3 text-xs">
          Tip: Fill in the directory + filename above, then import your Word document and click
          &ldquo;Create document.&rdquo; You can also overwrite an open doc by importing and clicking &ldquo;Save changes.&rdquo;
        </p>
      </div>

      {/* Markdown import */}
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Import Markdown</h3>
            <p className="mt-1 text-sm text-slate-500">
              Skip conversion by uploading a ready-to-publish .md or .mdx file. We&apos;ll merge the
              frontmatter and body directly into the editor.
            </p>
          </div>
          <a
            href="/templates/markdown-upload-template.md"
            download
            className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            Download template
          </a>
        </div>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-slate-600">
          <li>Duplicate the template file and update the frontmatter fields.</li>
          <li>Keep slugs kebab-case (e.g., /datatrust/7.6/metadata-sync).</li>
          <li>Paste screenshots into <code>static/img</code> and reference as <code>![alt](/img/...)</code>.</li>
          <li>Ask Cursor/AI to fill each section, then proofread before upload.</li>
        </ol>
        <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white">
          {loadingState === "importing" ? "Uploading\u2026" : "Choose .md or .mdx file"}
          <input
            type="file"
            accept=".md,.mdx"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onMarkdownUpload(file);
              }
              event.target.value = "";
            }}
          />
        </label>
        <p className="muted mt-3 text-xs">
          Tip: Share the template with AI tools to draft content, then upload here to merge it into the Git workspace.
        </p>
      </div>

      {/* Sidebar placement */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Sidebar placement</h3>
            <p className="text-xs text-slate-500">
              Choose where this document appears in the Docs navigation.
            </p>
          </div>
          {currentDocId && publishedSectionLabel && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              Live in {publishedSectionLabel}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Module
              </label>
              <div className="mt-1 flex gap-2">
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={selectedModuleId}
                  onChange={(event) => {
                    onModuleChange(event.target.value);
                    onSubmoduleChange("");
                  }}
                >
                  <option value="">Select a module</option>
                  {moduleCategories.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onCreateModule}
                  className="rounded-xl border border-slate-300 px-3 text-xs font-semibold text-slate-600"
                >
                  New
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Submodule
              </label>
              <div className="mt-1 flex gap-2">
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={selectedSubmoduleId}
                  onChange={(event) => onSubmoduleChange(event.target.value)}
                  disabled={!selectedModuleId}
                >
                  <option value="">(None)</option>
                  {submoduleCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={onCreateSubmodule}
                  disabled={!selectedModuleId}
                  className="rounded-xl border border-slate-300 px-3 text-xs font-semibold text-slate-600 disabled:opacity-60"
                >
                  New
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Position
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={positionMode}
                onChange={(event) => onPositionModeChange(event.target.value as PositionMode)}
              >
                <option value="end">Bottom of section</option>
                <option value="top">Top of section</option>
                <option value="before">Before another doc</option>
              </select>
            </div>
            {positionMode === "before" && (
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Before doc
                </label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={beforeDocId}
                  onChange={(event) => onBeforeDocChange(event.target.value)}
                  disabled={!targetDocOptions.length}
                >
                  <option value="">Select reference doc</option>
                  {targetDocOptions.map((docId) => (
                    <option key={docId} value={docId}>
                      {docId}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Make sure you click &ldquo;Save changes&rdquo; above before publishing so the latest content is on disk.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onPublish}
              disabled={
                !currentDocId ||
                !selectedModuleId ||
                publishState !== "idle" ||
                !currentCollection
              }
              className="flex-1 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 disabled:opacity-60"
            >
              {publishState === "publishing"
                ? "Publishing\u2026"
                : publishedPath?.length
                  ? "Update placement"
                  : "Publish"}
            </button>
            {publishedPath?.length && (
              <button
                type="button"
                onClick={onUnpublish}
                disabled={publishState !== "idle"}
                className="flex-1 rounded-xl border border-slate-300 py-2 text-sm font-semibold text-slate-600 disabled:opacity-60"
              >
                {publishState === "unpublishing" ? "Removing\u2026" : "Unpublish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
