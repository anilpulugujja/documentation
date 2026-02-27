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
import type { Dispatch, SetStateAction, FormEvent, ReactNode } from "react";

const FormLabel = ({ children }: { children: ReactNode }) => (
  <label className="text-xs font-semibold uppercase text-slate-500">{children}</label>
);

type SidebarPlacementProps = {
  currentCollection: Collection | undefined;
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
  currentSlug: string;
  onCreateModule: () => void;
  onCreateSubmodule: (moduleId?: string) => void;
};

const SidebarPlacementCard = ({
  currentCollection,
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
  currentSlug,
  onCreateModule,
  onCreateSubmodule,
}: SidebarPlacementProps) => {
  const publishedTrail =
    publishedPath?.map((entry) => entry.label).join(" › ") ?? publishedSectionLabel;
  const slugPreview =
    currentSlug && currentSlug.startsWith("http")
      ? currentSlug
      : currentSlug
        ? `${currentSlug}`
        : "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Sidebar placement
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            {publishedTrail ? "Live in documentation" : "Not yet published"}
          </h3>
          <p className="text-xs text-slate-500">
            {publishedTrail ? publishedTrail : "Select a module + submodule to publish."}
          </p>
        </div>
        <span className={`status-pill ${publishedTrail ? "published" : "draft"}`}>
          {publishedTrail ? "Published" : "Draft"}
        </span>
      </div>
      {slugPreview && (
        <a
          href={slugPreview}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 hover:underline"
        >
          Preview page ↗
        </a>
      )}

      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FormLabel>Module</FormLabel>
            <div className="mt-1 flex gap-2">
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={selectedModuleId}
                onChange={(event) => {
                  onModuleChange(event.target.value);
                  onSubmoduleChange("");
                }}
                title="Modules appear as first-level headings"
              >
                <option value="">Select module</option>
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
                title="Create a new module from the navigation panel"
              >
                New
              </button>
            </div>
          </div>
          <div>
            <FormLabel>Submodule</FormLabel>
            <div className="mt-1 flex gap-2">
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={selectedSubmoduleId}
                onChange={(event) => onSubmoduleChange(event.target.value)}
                disabled={!selectedModuleId}
                title="Optional grouping nested inside module"
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
                disabled={!selectedModuleId}
                onClick={() =>
                  selectedModuleId ? onCreateSubmodule(selectedModuleId) : onCreateSubmodule()
                }
                className="rounded-xl border border-slate-300 px-3 text-xs font-semibold text-slate-600 disabled:opacity-60"
              >
                New
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FormLabel>Position</FormLabel>
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
              <FormLabel>Before doc</FormLabel>
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
          Save changes before publishing. Placement updates write to the {currentCollection?.product ?? "docs"} sidebar JSON.
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
              ? "Publishing…"
              : publishedTrail
                ? "Update placement"
                : "Publish"}
          </button>
          {publishedTrail && (
            <button
              type="button"
              onClick={onUnpublish}
              disabled={publishState !== "idle"}
              className="flex-1 rounded-xl border border-slate-300 py-2 text-sm font-semibold text-slate-600 disabled:opacity-60"
            >
              {publishState === "unpublishing" ? "Removing…" : "Unpublish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

type NewDocFormProps = {
  newDoc: NewDocState;
  onNewDocChange: Dispatch<SetStateAction<NewDocState>>;
  onFilenameChange: (value: string) => void;
  templates: Template[];
  currentCollection: Collection | undefined;
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
  loadingState: LoadingState;
};

const NewDocumentForm = ({
  newDoc,
  onNewDocChange,
  onFilenameChange,
  templates,
  currentCollection,
  onCreate,
  loadingState,
}: NewDocFormProps) => (
  <div className="rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm space-y-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Create
        </p>
        <h3 className="text-lg font-semibold text-slate-900">New document</h3>
      </div>
      {currentCollection?.slugPrefix && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          {currentCollection.slugPrefix}
        </span>
      )}
    </div>
    <form className="space-y-5" onSubmit={onCreate}>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <FormLabel>Directory</FormLabel>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.directory}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, directory: e.target.value }))
            }
            placeholder="observability/alerts"
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave blank to create at the product root. Nested folders allowed.
          </p>
        </div>
        <div>
          <FormLabel>Filename</FormLabel>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            placeholder="getting-started.md"
            required
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <FormLabel>Template</FormLabel>
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
          <FormLabel>Title</FormLabel>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.title}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>
      </div>

      <div>
        <FormLabel>Description</FormLabel>
        <textarea
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          rows={2}
          value={newDoc.description}
          onChange={(e) =>
            onNewDocChange((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <FormLabel>Sidebar label</FormLabel>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.sidebar_label}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, sidebar_label: e.target.value }))
            }
          />
        </div>
        <div>
          <FormLabel>Slug</FormLabel>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={newDoc.slug}
            onChange={(e) =>
              onNewDocChange((prev) => ({ ...prev, slug: e.target.value }))
            }
            placeholder="/datatrust/7.6/new-page"
          />
        </div>
      </div>

      <div>
        <FormLabel>Tags</FormLabel>
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
        {loadingState === "creating" ? "Creating…" : "Create document"}
      </button>
    </form>
    <p className="muted mt-4">
      Files are written to{" "}
      <span className="font-mono text-xs text-slate-500">documentation/docs-platform</span>
    </p>
  </div>
);

type ImportCardsProps = {
  onWordUpload: (file: File) => void;
  onMarkdownUpload: (file: File) => void;
  loadingState: LoadingState;
};

const ImportCards = ({ onWordUpload, onMarkdownUpload, loadingState }: ImportCardsProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="action-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Import from Word</h3>
          <p className="text-xs text-slate-500">Upload .docx and auto-convert to Markdown.</p>
        </div>
        <span className="nav-icon">W</span>
      </div>
      <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-white">
        {loadingState === "importing" ? "Converting…" : "Choose .docx file"}
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
        Fill directory + filename first, then import and click “Create document.”
      </p>
    </div>

    <div className="action-card secondary p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Import Markdown</h3>
          <p className="text-xs text-slate-500">Upload ready-to-publish .md or .mdx.</p>
        </div>
        <a
          href="/templates/markdown-upload-template.md"
          download
          className="rounded-full border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          Template
        </a>
      </div>
      <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-slate-600">
        <li>Duplicate template + update frontmatter.</li>
        <li>Keep slugs kebab-case and scoped to product.</li>
        <li>Paste screenshots into <code>static/img</code>.</li>
      </ol>
      <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white">
        {loadingState === "importing" ? "Uploading…" : "Choose .md or .mdx file"}
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
        Tip: Ask Cursor/AI to fill the template, then upload and proofread.
      </p>
    </div>
  </div>
);

interface ActionsPanelProps {
  newDoc: NewDocState;
  onNewDocChange: Dispatch<SetStateAction<NewDocState>>;
  onFilenameChange: (value: string) => void;
  templates: Template[];
  currentCollection: Collection | undefined;
  onWordUpload: (file: File) => void;
  onMarkdownUpload: (file: File) => void;
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
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
  onCreateSubmodule: (moduleId?: string) => void;
  currentSlug: string;
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
  currentSlug,
  onCreateModule,
  onCreateSubmodule,
}: ActionsPanelProps) {
  return (
    <section className="glass-panel tight h-fit space-y-6 p-0 lg:sticky lg:top-8">
      <SidebarPlacementCard
        currentCollection={currentCollection}
        currentDocId={currentDocId}
        publishedSectionLabel={publishedSectionLabel}
        moduleCategories={moduleCategories}
        submoduleCategories={submoduleCategories}
        selectedModuleId={selectedModuleId}
        onModuleChange={onModuleChange}
        selectedSubmoduleId={selectedSubmoduleId}
        onSubmoduleChange={onSubmoduleChange}
        positionMode={positionMode}
        onPositionModeChange={onPositionModeChange}
        beforeDocId={beforeDocId}
        onBeforeDocChange={onBeforeDocChange}
        targetDocOptions={targetDocOptions}
        publishState={publishState}
        publishedPath={publishedPath}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        currentSlug={currentSlug}
        onCreateModule={onCreateModule}
        onCreateSubmodule={onCreateSubmodule}
      />
      <NewDocumentForm
        newDoc={newDoc}
        onNewDocChange={onNewDocChange}
        onFilenameChange={onFilenameChange}
        templates={templates}
        currentCollection={currentCollection}
        onCreate={onCreate}
        loadingState={loadingState}
      />
      <div className="px-5 pb-5">
        <ImportCards
          onWordUpload={onWordUpload}
          onMarkdownUpload={onMarkdownUpload}
          loadingState={loadingState}
        />
      </div>
    </section>
  );
}
