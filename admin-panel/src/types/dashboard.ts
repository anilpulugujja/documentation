import type { SidebarNode, SidebarCategory } from "./sidebar";

export type Collection = {
  id: string;
  label: string;
  version: string;
  product: string;
  orgId?: string;
  orgSlug?: string;
  productId?: string;
  productSlug?: string;
  relativePath: string;
  slugPrefix?: string;
};

export type TreeNode = {
  name: string;
  path: string;
  type: "file" | "directory";
};

export type Template = {
  id: string;
  name: string;
};

export type FrontmatterState = {
  title: string;
  description: string;
  sidebar_label: string;
  slug: string;
  tags: string[] | string;
  [key: string]: unknown;
};

export type ImportMetadata = {
  title?: string;
  description?: string;
  sidebar_label?: string;
  slug?: string;
  filename?: string;
  tags?: string[] | string;
};

export type LoadingState = "idle" | "loading" | "saving" | "creating" | "importing";

export type PublishState = "idle" | "publishing" | "unpublishing";

export type PositionMode = "end" | "top" | "before";

export type NewDocState = {
  filename: string;
  directory: string;
  title: string;
  description: string;
  sidebar_label: string;
  slug: string;
  tags: string;
  templateId: string;
};

export const primaryFields: { key: string; label: string; multiline?: boolean }[] = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", multiline: true },
  { key: "sidebar_label", label: "Sidebar Label" },
  { key: "slug", label: "Slug" },
  { key: "tags", label: "Tags (comma separated)" },
];

export const defaultFrontmatter: FrontmatterState = {
  title: "",
  description: "",
  sidebar_label: "",
  slug: "",
  tags: [],
};

export const toDocId = (value: string) =>
  value
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "")
    .replace(/^\/+/, "");

export const isSidebarCategory = (node: SidebarNode): node is SidebarCategory =>
  typeof node === "object" && node !== null && (node as SidebarCategory).type === "category";

export const findCategoryByPath = (nodes: SidebarNode[], path: string[]): SidebarCategory | null => {
  if (!path.length) {
    return null;
  }
  let currentNodes = nodes;
  let target: SidebarCategory | null = null;
  for (const id of path) {
    const match = currentNodes.find((node) => isSidebarCategory(node) && node.id === id);
    if (!match) {
      return null;
    }
    target = match as SidebarCategory;
    currentNodes = target.items;
  }
  return target;
};
