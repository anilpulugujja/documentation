"use client";

import type { Collection, TreeNode } from "@/types/dashboard";
import type { SidebarNode, SidebarCategory } from "@/types/sidebar";
import { toDocId, isSidebarCategory } from "@/types/dashboard";

interface CollectionsSidebarProps {
  collections: Collection[];
  selectedCollection: string | undefined;
  onSelectCollection: (id: string) => void;
  currentCollection: Collection | undefined;
  tree: TreeNode[];
  currentDir: string;
  selectedFile: string;
  publishedDocs: Record<string, { id: string; label: string }[]>;
  sidebarItems: SidebarNode[];
  onNavigateDir: (collectionId: string, dir: string) => void;
  onSelectFile: (collectionId: string, filePath: string) => void;
  onCreateModule: () => void;
  onRenameCategory: (path: string[], currentLabel: string) => void;
  onDeleteCategory: (path: string[]) => void;
}

function NavigationNodes({
  nodes,
  parentPath = [],
  onRenameCategory,
  onDeleteCategory,
}: {
  nodes: SidebarNode[];
  parentPath?: string[];
  onRenameCategory: (path: string[], currentLabel: string) => void;
  onDeleteCategory: (path: string[]) => void;
}) {
  if (!nodes.length) return null;
  return (
    <ul className="mt-2 space-y-1">
      {nodes.map((node) => {
        if (isSidebarCategory(node)) {
          const path = [...parentPath, node.id];
          const isModule = parentPath.length === 0;
          return (
            <li key={path.join("/")}>
              <div className="flex items-center justify-between rounded-lg px-2 py-1 text-sm font-semibold text-slate-600">
                <span>
                  {node.label}
                  {isModule && <span className="ml-2 text-[10px] uppercase text-slate-400">Module</span>}
                </span>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => onRenameCategory(path, node.label)}
                    className="text-indigo-600 hover:underline"
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteCategory(path)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="pl-3 border-l border-slate-100">
                <NavigationNodes
                  nodes={(node as SidebarCategory).items}
                  parentPath={path}
                  onRenameCategory={onRenameCategory}
                  onDeleteCategory={onDeleteCategory}
                />
              </div>
            </li>
          );
        }
        return (
          <li key={`${parentPath.join("/")}/${node}`} className="pl-4 text-xs text-slate-500">
            {node}
          </li>
        );
      })}
    </ul>
  );
}

export function CollectionsSidebar({
  collections,
  selectedCollection,
  onSelectCollection,
  currentCollection,
  tree,
  currentDir,
  selectedFile,
  publishedDocs,
  sidebarItems,
  onNavigateDir,
  onSelectFile,
  onCreateModule,
  onRenameCategory,
  onDeleteCategory,
}: CollectionsSidebarProps) {
  return (
    <section className="glass-panel h-fit p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Collections
      </h2>
      <div className="mt-4 space-y-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => onSelectCollection(collection.id)}
            className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition hover:border-indigo-200 ${
              selectedCollection === collection.id
                ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <p className="font-medium">{collection.product}</p>
            <p className="text-xs text-slate-500">{collection.label}</p>
            {collection.orgSlug && (
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                {collection.orgSlug}
              </p>
            )}
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
              onNavigateDir(selectedCollection!, parent);
            }}
            className="mt-3 text-xs font-semibold text-indigo-600"
          >
            &larr; Back one level
          </button>
        )}
        {currentCollection?.slugPrefix && (
          <p className="mt-4 text-xs text-slate-500">
            Base slug prefix:{" "}
            <code className="rounded bg-slate-100 px-2 py-0.5 text-[11px]">
              {currentCollection.slugPrefix}
            </code>
          </p>
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
                  onNavigateDir(selectedCollection!, node.path);
                } else {
                  onSelectFile(selectedCollection!, node.path);
                }
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
                selectedFile === node.path && node.type === "file"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex flex-col text-left">
                <span className="truncate">{node.name}</span>
                {node.type === "file" && publishedDocs[toDocId(node.path)] && (
                  <span className="text-[11px] text-slate-400">
                    {publishedDocs[toDocId(node.path)]
                      ?.map((entry) => entry.label)
                      .join(" \u2192 ")}
                  </span>
                )}
              </span>
              <span
                className={`text-xs ${
                  node.type === "directory"
                    ? "text-slate-400"
                    : publishedDocs[toDocId(node.path)]
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {node.type === "directory"
                  ? "DIR"
                  : publishedDocs[toDocId(node.path)]
                  ? "LIVE"
                  : "DRAFT"}
              </span>
            </button>
          ))}
          {!tree.length && (
            <p className="muted">No files in this directory.</p>
          )}
        </div>
      </div>
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-600">Navigation</h3>
            <p className="text-xs text-slate-500">Modules and submodules</p>
          </div>
          <button
            type="button"
            onClick={onCreateModule}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
          >
            New module
          </button>
        </div>
        <div className="mt-3 max-h-64 overflow-y-auto">
          {sidebarItems.length ? (
            <NavigationNodes
              nodes={sidebarItems}
              onRenameCategory={onRenameCategory}
              onDeleteCategory={onDeleteCategory}
            />
          ) : (
            <p className="text-xs text-slate-500">No modules yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
