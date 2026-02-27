"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import slugify from "slugify";

import type { SidebarNode, SidebarCategory } from "@/types/sidebar";
import type {
  Collection,
  TreeNode,
  Template,
  FrontmatterState,
  ImportMetadata,
  NewDocState,
  LoadingState,
  PublishState,
  PositionMode,
} from "@/types/dashboard";
import {
  primaryFields,
  defaultFrontmatter,
  toDocId,
  isSidebarCategory,
  findCategoryByPath,
} from "@/types/dashboard";

export interface DashboardState {
  // Collection & navigation
  collections: Collection[];
  selectedCollection: string | undefined;
  setSelectedCollection: (id: string) => void;
  currentCollection: Collection | undefined;
  tree: TreeNode[];
  currentDir: string;
  selectedFile: string;

  // Editor
  frontmatter: FrontmatterState;
  body: string;
  setBody: (value: string) => void;
  advancedFrontmatter: string;
  setAdvancedFrontmatter: (value: string) => void;
  advancedFrontmatterPlaceholder: string;
  formatFieldValue: (key: string) => string;
  updateFrontmatterField: (key: string, value: string) => void;

  // Document ID & publish status
  currentDocId: string;
  publishedDocs: Record<string, { id: string; label: string }[]>;
  publishedPath: { id: string; label: string }[] | undefined;
  publishedSectionLabel: string | undefined;

  // New document
  newDoc: NewDocState;
  setNewDoc: React.Dispatch<React.SetStateAction<NewDocState>>;
  templates: Template[];

  // Loading & feedback
  loadingState: LoadingState;
  notification: string;
  error: string;
  warnings: string[];
  setWarnings: (warnings: string[]) => void;

  // Sidebar management
  sidebarItems: SidebarNode[];
  moduleCategories: SidebarCategory[];
  submoduleCategories: SidebarCategory[];
  selectedModuleId: string;
  setSelectedModuleId: (id: string) => void;
  selectedSubmoduleId: string;
  setSelectedSubmoduleId: (id: string) => void;
  positionMode: PositionMode;
  setPositionMode: (mode: PositionMode) => void;
  beforeDocId: string;
  setBeforeDocId: (id: string) => void;
  targetDocOptions: string[];
  publishState: PublishState;

  // Handlers
  fetchTree: (collectionId: string, dir?: string) => Promise<void>;
  fetchDocument: (collectionId: string, filePath: string) => Promise<void>;
  handleSave: () => Promise<void>;
  handleCreate: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleFilenameChange: (value: string) => void;
  handleWordUpload: (file: File) => Promise<void>;
  handleMarkdownUpload: (file: File) => Promise<void>;
  handlePublish: () => Promise<void>;
  handleUnpublish: () => Promise<void>;
  handleCreateModule: () => Promise<void>;
  handleCreateSubmodule: (moduleId?: string) => Promise<void>;
  handleRenameCategory: (path: string[], currentLabel: string) => Promise<void>;
  handleDeleteCategory: (path: string[]) => Promise<void>;
  logout: () => Promise<void>;
}

export function useDashboard(): DashboardState {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>();
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [currentDir, setCurrentDir] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [frontmatter, setFrontmatter] = useState<FrontmatterState>(defaultFrontmatter);
  const [body, setBody] = useState("");
  const [advancedFrontmatter, setAdvancedFrontmatter] = useState("{}");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newDoc, setNewDoc] = useState<NewDocState>({
    filename: "",
    directory: "",
    title: "",
    description: "",
    sidebar_label: "",
    slug: "",
    tags: "",
    templateId: "",
  });
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [notification, setNotification] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [sidebarItems, setSidebarItems] = useState<SidebarNode[]>([]);
  const [publishedDocs, setPublishedDocs] = useState<
    Record<string, { id: string; label: string }[]>
  >({});
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");
  const [selectedSubmoduleId, setSelectedSubmoduleId] = useState<string>("");
  const [positionMode, setPositionMode] = useState<PositionMode>("end");
  const [beforeDocId, setBeforeDocId] = useState<string>("");
  const [publishState, setPublishState] = useState<PublishState>("idle");

  const currentCollection = useMemo(
    () => collections.find((collection) => collection.id === selectedCollection),
    [collections, selectedCollection],
  );
  const currentDocId = useMemo(
    () => (selectedFile ? toDocId(selectedFile) : ""),
    [selectedFile],
  );
  const moduleCategories = useMemo(
    () => sidebarItems.filter((node) => isSidebarCategory(node)) as SidebarCategory[],
    [sidebarItems],
  );
  const submoduleCategories = useMemo(() => {
    const moduleEntry = moduleCategories.find((entry) => entry.id === selectedModuleId);
    if (!moduleEntry) return [];
    return moduleEntry.items.filter(isSidebarCategory) as SidebarCategory[];
  }, [moduleCategories, selectedModuleId]);

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

  const sendCategoryRequest = useCallback(
    async (
      method: "POST" | "DELETE",
      reqBody: Record<string, unknown>,
    ): Promise<{ items?: SidebarNode[]; publishedDocs?: Record<string, { id: string; label: string }[]> } | null> => {
      if (!selectedCollection) {
        setError("Select a collection first.");
        return null;
      }
      const res = await fetch("/api/sidebars/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collectionId: selectedCollection,
          ...reqBody,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Unable to update categories.");
        return null;
      }
      setError("");
      return data;
    },
    [selectedCollection],
  );

  const fetchSidebar = useCallback(async (collectionId: string) => {
    if (!collectionId) return;
    const params = new URLSearchParams({ collectionId });
    try {
      const res = await fetch(`/api/sidebars?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSidebarItems(data.items ?? []);
        setPublishedDocs(data.publishedDocs ?? {});
      } else {
        setSidebarItems([]);
        setPublishedDocs({});
      }
    } catch {
      setSidebarItems([]);
      setPublishedDocs({});
    }
  }, []);

  const handleCreateModule = useCallback(async () => {
    const label = window.prompt("Module name");
    if (!label?.trim()) return;
    const result = await sendCategoryRequest("POST", {
      action: "create",
      parentPath: [],
      label: label.trim(),
    });
    if (result && selectedCollection) {
      setSidebarItems(result.items ?? []);
      setPublishedDocs(result.publishedDocs ?? {});
      fetchSidebar(selectedCollection);
    }
  }, [sendCategoryRequest, selectedCollection, fetchSidebar]);

  const handleCreateSubmodule = useCallback(async (moduleId?: string) => {
    const targetModuleId = moduleId ?? selectedModuleId;
    if (moduleId) {
      setSelectedModuleId(moduleId);
    }
    if (!targetModuleId) {
      setError("Choose a module before creating a submodule.");
      return;
    }
    const label = window.prompt("Submodule name");
    if (!label?.trim()) return;
    const result = await sendCategoryRequest("POST", {
      action: "create",
      parentPath: [targetModuleId],
      label: label.trim(),
    });
    if (result && selectedCollection) {
      setSidebarItems(result.items ?? []);
      setPublishedDocs(result.publishedDocs ?? {});
      fetchSidebar(selectedCollection);
    }
  }, [sendCategoryRequest, selectedCollection, selectedModuleId, fetchSidebar]);

  const handleRenameCategory = useCallback(async (path: string[], currentLabel: string) => {
    const label = window.prompt("New name", currentLabel);
    if (!label?.trim()) return;
    const result = await sendCategoryRequest("POST", {
      action: "rename",
      path,
      label: label.trim(),
    });
    if (result && selectedCollection) {
      setSidebarItems(result.items ?? []);
      setPublishedDocs(result.publishedDocs ?? {});
      fetchSidebar(selectedCollection);
    }
  }, [sendCategoryRequest, selectedCollection, fetchSidebar]);

  const handleDeleteCategory = useCallback(async (path: string[]) => {
    const confirmed = window.confirm("Remove this category? Only empty categories can be deleted.");
    if (!confirmed) return;
    const result = await sendCategoryRequest("DELETE", { path });
    if (result && selectedCollection) {
      setSidebarItems(result.items ?? []);
      setPublishedDocs(result.publishedDocs ?? {});
      fetchSidebar(selectedCollection);
    }
  }, [sendCategoryRequest, selectedCollection, fetchSidebar]);

  const formatFieldValue = useCallback(
    (key: string) => {
      if (key === "tags") {
        const tagsValue = frontmatter.tags;
        if (Array.isArray(tagsValue)) {
          return tagsValue.join(", ");
        }
        return (tagsValue as string) ?? "";
      }
      const value = frontmatter[key];
      return typeof value === "string" ? value : "";
    },
    [frontmatter],
  );

  const updateFrontmatterField = useCallback((key: string, value: string) => {
    setFrontmatter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

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
      fetchSidebar(selectedCollection);
      setNewDoc((prev) => ({
        ...prev,
        directory: "",
      }));
    } else {
      setSidebarItems([]);
      setPublishedDocs({});
    }
  }, [selectedCollection, fetchTree, fetchSidebar]);

  useEffect(() => {
    setNewDoc((prev) => ({
      ...prev,
      directory: currentDir,
    }));
  }, [currentDir]);

  useEffect(() => {
    if (!currentDocId) {
      return;
    }
    const path = publishedDocs[currentDocId];
    if (path?.length) {
      setSelectedModuleId(path[0]?.id ?? "");
      setSelectedSubmoduleId(path[1]?.id ?? "");
      if (positionMode === "before") {
        setBeforeDocId("");
        setPositionMode("end");
      }
      return;
    }
    if (!selectedModuleId && moduleCategories.length) {
      setSelectedModuleId(moduleCategories[0].id);
    }
  }, [currentDocId, publishedDocs, moduleCategories, selectedModuleId, positionMode]);

  useEffect(() => {
    if (!selectedModuleId) {
      setSelectedSubmoduleId("");
      return;
    }
    if (!submoduleCategories.length) {
      setSelectedSubmoduleId("");
      return;
    }
    if (!selectedSubmoduleId) {
      setSelectedSubmoduleId(submoduleCategories[0].id);
    }
  }, [selectedModuleId, submoduleCategories, selectedSubmoduleId]);

  const targetDocOptions = useMemo(() => {
    if (!selectedModuleId) return [];
    const path = [selectedModuleId];
    if (selectedSubmoduleId) {
      path.push(selectedSubmoduleId);
    }
    const category = findCategoryByPath(sidebarItems, path);
    if (!category) return [];
    return category.items.filter((node) => typeof node === "string") as string[];
  }, [sidebarItems, selectedModuleId, selectedSubmoduleId]);

  useEffect(() => {
    if (positionMode !== "before") {
      if (beforeDocId) {
        setBeforeDocId("");
      }
      return;
    }
    if (targetDocOptions.length && !beforeDocId) {
      setBeforeDocId(targetDocOptions[0]);
    } else if (!targetDocOptions.length) {
      setBeforeDocId("");
    }
  }, [beforeDocId, positionMode, targetDocOptions]);

  const fetchDocument = useCallback(async (collectionId: string, filePath: string) => {
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
  }, []);

  const handleSave = useCallback(async () => {
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
  }, [selectedCollection, selectedFile, advancedFrontmatter, frontmatter, body]);

  const handleCreate = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
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
      fetchSidebar(selectedCollection);
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
  }, [selectedCollection, newDoc, selectedFile, body, currentDir, fetchTree, fetchDocument, fetchSidebar]);

  const handleFilenameChange = useCallback(
    (value: string) => {
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
    },
    [normalizeSlug],
  );

  const mergeImportedMetadata = useCallback((metadata: ImportMetadata = {}) => {
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
  }, []);

  const handleWordUpload = useCallback(async (file: File) => {
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
            `Replace ${selectedFile} with the imported content? Click "Cancel" to stage it as a new unsaved document.`,
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
            "Word document converted. Review the markdown, set a filename, and click \u201cCreate document.\u201d",
          );
        }
      }
    } catch {
      setError("Unable to convert the Word document. Please try again.");
    }
    setLoadingState("idle");
  }, [selectedFile, mergeImportedMetadata, prepareMetadata]);

  const handlePublish = useCallback(async () => {
    if (!selectedCollection || !selectedFile || !currentDocId) {
      setError("Select a document and sidebar destination before publishing.");
      return;
    }
    if (!selectedModuleId) {
      setError("Choose a module before publishing.");
      return;
    }
    setPublishState("publishing");
    setNotification("");
    setError("");
    const targetPath = [selectedModuleId];
    if (selectedSubmoduleId) {
      targetPath.push(selectedSubmoduleId);
    }
    const payload: Record<string, unknown> = {
      collectionId: selectedCollection,
      docId: currentDocId,
      targetPath,
      relativePath: selectedFile,
    };
    if (positionMode === "top") {
      payload.position = "top";
    } else if (positionMode === "before" && beforeDocId) {
      payload.position = { type: "before", docId: beforeDocId };
    } else {
      payload.position = "end";
    }
    try {
      const res = await fetch("/api/sidebars/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setPublishedDocs(data.publishedDocs ?? {});
        const moduleLabel =
          moduleCategories.find((module) => module.id === selectedModuleId)?.label ??
          selectedModuleId;
        const subLabel =
          submoduleCategories.find((sub) => sub.id === selectedSubmoduleId)?.label ??
          selectedSubmoduleId;
        const placementLabel = subLabel ? `${moduleLabel} \u2192 ${subLabel}` : moduleLabel;
        setNotification(`Published under ${placementLabel}.`);
        fetchSidebar(selectedCollection);
      } else {
        setError(data.error ?? "Unable to publish document.");
      }
    } catch {
      setError("Unable to publish document.");
    }
    setPublishState("idle");
  }, [
    selectedCollection, selectedFile, currentDocId, selectedModuleId, selectedSubmoduleId,
    positionMode, beforeDocId, moduleCategories, submoduleCategories, fetchSidebar,
  ]);

  const handleUnpublish = useCallback(async () => {
    if (!selectedCollection || !currentDocId) return;
    setPublishState("unpublishing");
    setNotification("");
    setError("");
    try {
      const res = await fetch("/api/sidebars/publish", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collectionId: selectedCollection,
          docId: currentDocId,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setPublishedDocs(data.publishedDocs ?? {});
        setNotification("Document removed from sidebar.");
        fetchSidebar(selectedCollection);
      } else {
        setError(data.error ?? "Unable to unpublish document.");
      }
    } catch {
      setError("Unable to unpublish document.");
    }
    setPublishState("idle");
  }, [selectedCollection, currentDocId, fetchSidebar]);

  const handleMarkdownUpload = useCallback(async (file: File) => {
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
            `Replace ${selectedFile} with the imported content? Click "Cancel" to stage it as a new unsaved document.`,
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
            "Markdown file imported. Review the content, set a filename, and click \u201cCreate document.\u201d",
          );
        }
      }
    } catch {
      setError("Unable to import the markdown file. Please try again.");
    }
    setLoadingState("idle");
  }, [selectedFile, currentCollection?.product, prepareMetadata, mergeImportedMetadata]);

  const advancedFrontmatterPlaceholder = useMemo(
    () => JSON.stringify({ hide_table_of_contents: false }, null, 2),
    [],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }, []);

  const publishedPath = currentDocId ? publishedDocs[currentDocId] : undefined;
  const publishedSectionLabel = publishedPath?.map((entry) => entry.label).join(" \u2192 ");

  return {
    collections,
    selectedCollection,
    setSelectedCollection,
    currentCollection,
    tree,
    currentDir,
    selectedFile,
    frontmatter,
    body,
    setBody,
    advancedFrontmatter,
    setAdvancedFrontmatter,
    advancedFrontmatterPlaceholder,
    formatFieldValue,
    updateFrontmatterField,
    currentDocId,
    publishedDocs,
    publishedPath,
    publishedSectionLabel,
    newDoc,
    setNewDoc,
    templates,
    loadingState,
    notification,
    error,
    warnings,
    setWarnings,
    sidebarItems,
    moduleCategories,
    submoduleCategories,
    selectedModuleId,
    setSelectedModuleId,
    selectedSubmoduleId,
    setSelectedSubmoduleId,
    positionMode,
    setPositionMode,
    beforeDocId,
    setBeforeDocId,
    targetDocOptions,
    publishState,
    fetchTree,
    fetchDocument,
    handleSave,
    handleCreate,
    handleFilenameChange,
    handleWordUpload,
    handleMarkdownUpload,
    handlePublish,
    handleUnpublish,
    handleCreateModule,
    handleCreateSubmodule,
    handleRenameCategory,
    handleDeleteCategory,
    logout,
  };
}
