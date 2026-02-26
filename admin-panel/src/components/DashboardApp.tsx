"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import slugify from "slugify";

type Collection = {
  id: string;
  label: string;
  version: string;
  product: string;
  relativePath: string;
  slugPrefix?: string;
};

type TreeNode = {
  name: string;
  path: string;
  type: "file" | "directory";
};

type Template = {
  id: string;
  name: string;
};

type FrontmatterState = {
  title: string;
  description: string;
  sidebar_label: string;
  slug: string;
  tags: string[] | string;
  [key: string]: unknown;
};

type ImportMetadata = {
  title?: string;
  description?: string;
  sidebar_label?: string;
  slug?: string;
  filename?: string;
  tags?: string[] | string;
};

const primaryFields: { key: string; label: string; multiline?: boolean }[] = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", multiline: true },
  { key: "sidebar_label", label: "Sidebar Label" },
  { key: "slug", label: "Slug" },
  { key: "tags", label: "Tags (comma separated)" },
];

const defaultFrontmatter: FrontmatterState = {
  title: "",
  description: "",
  sidebar_label: "",
  slug: "",
  tags: [],
};

const DashboardApp = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>();
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [currentDir, setCurrentDir] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [frontmatter, setFrontmatter] = useState<FrontmatterState>(defaultFrontmatter);
  const [body, setBody] = useState("");
  const [advancedFrontmatter, setAdvancedFrontmatter] = useState("{}");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newDoc, setNewDoc] = useState({
    filename: "",
    directory: "",
    title: "",
    description: "",
    sidebar_label: "",
    slug: "",
    tags: "",
    templateId: "",
  });
  const [loadingState, setLoadingState] = useState<
    "idle" | "loading" | "saving" | "creating" | "importing"
  >("idle");
  const [notification, setNotification] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const currentCollection = useMemo(
    () => collections.find((collection) => collection.id === selectedCollection),
    [collections, selectedCollection],
  );

  const buildSlugSegment = useCallback((value?: string) => {
    if (!value) return "";
    return value
      .split("/")
      .filter(Boolean)
      .map((segment) =>
        slugify(segment.replace(/\.mdx?$/, ""), {
          lower: true,
          strict: true,
        }),
      )
      .filter(Boolean)
      .join("/");
  }, []);

  const normalizeSlug = useCallback(
    (incoming?: string, fallback?: string) => {
      const prefix = (currentCollection?.slugPrefix ?? "").replace(/\/$/, "");
      const fallbackSegment = buildSlugSegment(fallback) || `doc-${Date.now()}`;

      if (incoming && incoming.trim()) {
        const normalized = incoming.startsWith("/") ? incoming : `/${incoming}`;
        if (prefix && normalized.startsWith(prefix)) {
          return normalized;
        }
        const trimmed = normalized.replace(/^\//, "") || fallbackSegment;
        return prefix ? `${prefix}/${trimmed}` : `/${trimmed}`;
      }

      return prefix ? `${prefix}/${fallbackSegment}` : `/${fallbackSegment}`;
    },
    [buildSlugSegment, currentCollection?.slugPrefix],
  );

  const prepareMetadata = useCallback(
    (metadata: ImportMetadata = {}) => {
      const fallback = metadata.slug || metadata.filename || metadata.title;
      return {
        ...metadata,
        slug: normalizeSlug(metadata.slug, fallback),
      };
    },
    [normalizeSlug],
  );

  const formatFieldValue = (key: string) => {
    if (key === "tags") {
      const tagsValue = frontmatter.tags;
      if (Array.isArray(tagsValue)) {
        return tagsValue.join(", ");
      }
      return (tagsValue as string) ?? "";
    }
    const value = frontmatter[key];
    return typeof value === "string" ? value : "";
  };

  const updateFrontmatterField = (key: string, value: string) => {
    setFrontmatter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchCollections = useCallback(async () => {
    const res = await fetch("/api/collections");
    if (res.ok) {
      const data = await res.json();
      setCollections(data.collections);
      if (!selectedCollection && data.collections.length) {
        setSelectedCollection(data.collections[0].id);
      }
    }
  }, [selectedCollection]);

  useEffect(() => {
    fetchCollections();
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.templates ?? []))
      .catch(() => setTemplates([]));
  }, [fetchCollections]);

  const fetchTree = useCallback(
    async (collectionId: string, dir = "") => {
      setLoadingState("loading");
      setError("");
      const params = new URLSearchParams({
        collectionId,
        path: dir,
      });
      const res = await fetch(`/api/tree?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTree(data.nodes);
        setCurrentDir(dir);
        setSelectedFile("");
      } else {
        setError("Unable to load directory");
      }
      setLoadingState("idle");
    },
    [],
  );

  useEffect(() => {
    if (selectedCollection) {
      fetchTree(selectedCollection, "");
      setNewDoc((prev) => ({
        ...prev,
        directory: "",
      }));
    }
  }, [selectedCollection, fetchTree]);

  useEffect(() => {
    setNewDoc((prev) => ({
      ...prev,
      directory: currentDir,
    }));
  }, [currentDir]);

  const fetchDocument = async (collectionId: string, filePath: string) => {
    setLoadingState("loading");
    const params = new URLSearchParams({
      collectionId,
      path: filePath,
    });
    const res = await fetch(`/api/content?${params.toString()}`);
    if (res.ok) {
      const data = (await res.json()) as {
        frontmatter: Record<string, unknown>;
        content: string;
      };
      const incoming = data.frontmatter as Partial<FrontmatterState>;
      setFrontmatter({
        ...defaultFrontmatter,
        ...incoming,
      });
      const advancedEntries = Object.entries(data.frontmatter).filter(
          ([key]) => !primaryFields.find((field) => field.key === key),
      );
      const advanced = Object.fromEntries(advancedEntries);
      setAdvancedFrontmatter(
        advancedEntries.length ? JSON.stringify(advanced, null, 2) : "{}",
      );
      setBody(data.content ?? "");
      setSelectedFile(filePath);
    } else {
      setError("Unable to load document");
    }
    setLoadingState("idle");
  };

  const handleSave = async () => {
    if (!selectedCollection || !selectedFile) return;
    setLoadingState("saving");
    setNotification("");
    setError("");

    let advanced: Record<string, unknown> = {};
    if (advancedFrontmatter.trim()) {
      try {
        advanced = JSON.parse(advancedFrontmatter);
      } catch {
        setLoadingState("idle");
        setError("Advanced frontmatter must be valid JSON");
        return;
      }
    }
    const tagsValue = frontmatter.tags;
    const normalizedTags = Array.isArray(tagsValue)
      ? tagsValue
      : tagsValue
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    const frontmatterPayload: Record<string, unknown> = {
      ...frontmatter,
      tags: normalizedTags,
    };

    const payload = {
      collectionId: selectedCollection,
      path: selectedFile,
      frontmatter: {
        ...advanced,
        ...frontmatterPayload,
      },
      content: body,
    };

    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setNotification("Document saved successfully");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save document");
    }
    setLoadingState("idle");
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCollection) return;
    setLoadingState("creating");
    setNotification("");
    setError("");

    const directory = newDoc.directory ? `${newDoc.directory}/` : "";
    const filename = newDoc.filename.endsWith(".md")
      ? newDoc.filename
      : `${newDoc.filename}.md`;
    const fullPath = `${directory}${filename}`;

    const payload = {
      collectionId: selectedCollection,
      path: fullPath,
      templateId: newDoc.templateId || undefined,
      frontmatter: {
        title: newDoc.title,
        description: newDoc.description,
        sidebar_label: newDoc.sidebar_label,
        slug: newDoc.slug,
        tags: newDoc.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      },
      content: !selectedFile && body.trim() ? body : undefined,
      overwrite: false,
    };

    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setNotification("Document created");
      fetchTree(selectedCollection, currentDir);
      fetchDocument(selectedCollection, fullPath);
      setNewDoc({
        filename: "",
        directory: currentDir,
        title: "",
        description: "",
        sidebar_label: "",
        slug: "",
        tags: "",
        templateId: newDoc.templateId,
      });
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to create document");
    }
    setLoadingState("idle");
  };

  const handleFilenameChange = (value: string) => {
    const sanitized = value.replace(/\.mdx?$/, "");
    setNewDoc((prev) => {
      const fallbackPath = [prev.directory, sanitized].filter(Boolean).join("/");
      const computedSlug = sanitized ? normalizeSlug(undefined, fallbackPath) : "";
      return {
        ...prev,
        filename: value,
        slug: prev.slug || computedSlug,
      };
    });
  };

const mergeImportedMetadata = (metadata: ImportMetadata = {}) => {
  setFrontmatter((prev) => ({
    ...prev,
    title: prev.title || metadata.title || "",
    description: prev.description || metadata.description || "",
    sidebar_label: prev.sidebar_label || metadata.sidebar_label || metadata.title || "",
    slug: prev.slug || metadata.slug || "",
    tags:
      prev.tags && prev.tags.length
        ? prev.tags
        : Array.isArray(metadata.tags)
          ? metadata.tags
          : metadata.tags || [],
  }));
  setNewDoc((prev) => ({
    ...prev,
    title: prev.title || metadata.title || "",
    description: prev.description || metadata.description || "",
    sidebar_label: prev.sidebar_label || metadata.sidebar_label || metadata.title || "",
    slug: prev.slug || metadata.slug || "",
    filename: prev.filename || metadata.filename || prev.filename,
    tags:
      prev.tags ||
      (Array.isArray(metadata.tags) ? metadata.tags.join(", ") : (metadata.tags as string) || ""),
  }));
};

  const handleWordUpload = async (file: File) => {
    setLoadingState("importing");
    setNotification("");
    setError("");
    setWarnings([]);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/import-docx", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Unable to convert the Word document.");
      } else {
        const payload: { markdown?: string; metadata?: ImportMetadata } = await res.json();
        if (payload.markdown) {
          setBody(payload.markdown);
        }
        mergeImportedMetadata(prepareMetadata(payload.metadata ?? {}));
        setWarnings([]);
        let targetPath = selectedFile;
        if (selectedFile) {
          const replace = window.confirm(
            `Replace ${selectedFile} with the imported content? Click “Cancel” to stage it as a new unsaved document.`,
          );
          if (!replace) {
            setSelectedFile("");
            targetPath = "";
          }
        }
        if (targetPath) {
          setNotification(
            `Imported content loaded into ${targetPath}. Save to overwrite or create a new file below.`,
          );
        } else {
          setNotification(
            "Word document converted. Review the markdown, set a filename, and click “Create document.”",
          );
        }
      }
    } catch {
      setError("Unable to convert the Word document. Please try again.");
    }
    setLoadingState("idle");
  };

  const handleMarkdownUpload = async (file: File) => {
    setLoadingState("importing");
    setNotification("");
    setError("");
    setWarnings([]);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/import-markdown", {
        method: "POST",
        body: formData,
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload.error ?? "Unable to import the markdown file.");
      } else {
        if (typeof payload.body === "string") {
          setBody(payload.body);
        }
        const normalizedMetadata = prepareMetadata({
          ...(payload.frontmatter ?? {}),
          filename: payload.filename ?? payload.frontmatter?.filename,
        });
        mergeImportedMetadata(normalizedMetadata);
        const baseWarnings = Array.isArray(payload.warnings) ? payload.warnings : [];
        const slugWarning =
          payload.frontmatter?.slug && payload.frontmatter.slug !== normalizedMetadata.slug
            ? [
                `Slug updated to ${normalizedMetadata.slug} to match the ${currentCollection?.product ?? "current"} collection.`,
              ]
            : [];
        setWarnings([...baseWarnings, ...slugWarning]);
        let targetPath = selectedFile;
        if (selectedFile) {
          const replace = window.confirm(
            `Replace ${selectedFile} with the imported content? Click “Cancel” to stage it as a new unsaved document.`,
          );
          if (!replace) {
            setSelectedFile("");
            targetPath = "";
          }
        }
        if (targetPath) {
          setNotification(
            `Imported markdown loaded into ${targetPath}. Save to overwrite or create a new file below.`,
          );
        } else {
          setNotification(
            "Markdown file imported. Review the content, set a filename, and click “Create document.”",
          );
        }
      }
    } catch {
      setError("Unable to import the markdown file. Please try again.");
    }
    setLoadingState("idle");
  };

  const advancedFrontmatterPlaceholder = useMemo(
    () => JSON.stringify({ hide_table_of_contents: false }, null, 2),
    [],
  );

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
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
            onClick={logout}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <section className="glass-panel h-fit p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Collections
          </h2>
          <div className="mt-4 space-y-2">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition hover:border-indigo-200 ${
                  selectedCollection === collection.id
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <p className="font-medium">{collection.product}</p>
                <p className="text-xs text-slate-500">{collection.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Directory
            </p>
            <p className="mt-2 break-all text-sm text-slate-500">
              {currentDir || "root"}
            </p>
            {currentDir && (
              <button
                onClick={() => {
                  const parent = currentDir.split("/").slice(0, -1).join("/");
                  fetchTree(selectedCollection!, parent);
                }}
                className="mt-3 text-xs font-semibold text-indigo-600"
              >
                ← Back one level
              </button>
            )}
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-slate-600">Files</h3>
            <div className="mt-3 space-y-1">
              {tree.map((node) => (
                <button
                  key={node.path}
                  onClick={() => {
                    if (node.type === "directory") {
                      fetchTree(selectedCollection!, node.path);
                    } else {
                      fetchDocument(selectedCollection!, node.path);
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    selectedFile === node.path && node.type === "file"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{node.name}</span>
                  <span className="text-xs text-slate-400">
                    {node.type === "directory" ? "DIR" : "MD"}
                  </span>
                </button>
              ))}
              {!tree.length && (
                <p className="muted">No files in this directory.</p>
              )}
            </div>
          </div>
        </section>

        <section className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Editor
              </p>
              <h2 className="text-xl font-semibold text-slate-900">
                {selectedFile || "Select a document"}
              </h2>
            </div>
            <button
              onClick={handleSave}
              disabled={
                !selectedFile ||
                loadingState === "saving" ||
                loadingState === "loading" ||
                loadingState === "importing"
              }
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingState === "saving" ? "Saving…" : "Save changes"}
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
                  onClick={() => setWarnings([])}
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
                      onChange={(e) => updateFrontmatterField(field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-50"
                      value={formatFieldValue(field.key)}
                      onChange={(e) => updateFrontmatterField(field.key, e.target.value)}
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
                onChange={(e) => setAdvancedFrontmatter(e.target.value)}
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
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </section>

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
          <form className="mt-5 space-y-4" onSubmit={handleCreate}>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Directory
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={newDoc.directory}
                onChange={(e) =>
                  setNewDoc((prev) => ({ ...prev, directory: e.target.value }))
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
                onChange={(e) => handleFilenameChange(e.target.value)}
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
                  setNewDoc((prev) => ({ ...prev, templateId: e.target.value }))
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
                  setNewDoc((prev) => ({ ...prev, title: e.target.value }))
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
                  setNewDoc((prev) => ({ ...prev, description: e.target.value }))
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
                  setNewDoc((prev) => ({ ...prev, sidebar_label: e.target.value }))
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
                  setNewDoc((prev) => ({ ...prev, slug: e.target.value }))
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
                  setNewDoc((prev) => ({ ...prev, tags: e.target.value }))
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
            Files are written directly into the Git workspace under
            <br />
            <span className="font-mono text-xs text-slate-500">
              documentation/docs-platform
            </span>
          </p>
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4">
            <h3 className="text-sm font-semibold text-slate-700">Import from Word</h3>
            <p className="mt-1 text-sm text-slate-500">
              Upload a .docx file and we&apos;ll convert it to Markdown, preserving headings,
              tables, lists, and styling. The converted content will appear in the editor so you can review it before saving.
            </p>
            <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-white">
              {loadingState === "importing" ? "Converting…" : "Choose .docx file"}
              <input
                type="file"
                accept=".docx"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handleWordUpload(file);
                  }
                  event.target.value = "";
                }}
              />
            </label>
            <p className="muted mt-3 text-xs">
              Tip: Fill in the directory + filename above, then import your Word document and click
              “Create document.” You can also overwrite an open doc by importing and clicking “Save changes.”
            </p>
          </div>
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
              {loadingState === "importing" ? "Uploading…" : "Choose .md or .mdx file"}
              <input
                type="file"
                accept=".md,.mdx"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handleMarkdownUpload(file);
                  }
                  event.target.value = "";
                }}
              />
            </label>
            <p className="muted mt-3 text-xs">
              Tip: Share the template with AI tools to draft content, then upload here to merge it into the Git workspace.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardApp;
