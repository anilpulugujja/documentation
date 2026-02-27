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
  currentDocId: string;
  publishedDocs: Record<string, { id: string; label: string }[]>;
  sidebarItems: SidebarNode[];
  onNavigateDir: (collectionId: string, dir: string) => void;
  onSelectFile: (collectionId: string, filePath: string) => void;
  onCreateModule: () => void;
  onCreateSubmodule: (moduleId: string) => void;
  onRenameCategory: (path: string[], currentLabel: string) => void;
  onDeleteCategory: (path: string[]) => void;
}

function NavigationNodes({
  nodes,
  parentPath = [],
  activeDocId,
  onRenameCategory,
  onDeleteCategory,
  onCreateSubmodule,
}: {
  nodes: SidebarNode[];
  parentPath?: string[];
  activeDocId: string;
  onRenameCategory: (path: string[], currentLabel: string) => void;
  onDeleteCategory: (path: string[]) => void;
  onCreateSubmodule: (moduleId: string) => void;
}) {
  if (!nodes.length) return null;
  return (
    <ul className="space-y-2">
      {nodes.map((node) => {
        if (isSidebarCategory(node)) {
          const path = [...parentPath, node.id];
          const isModule = parentPath.length === 0;
          return (
            <li key={path.join("/")}>
              <div className="tree-node text-slate-600">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-slate-400">
                    ▸
                  </span>
                  <span
                    className={`truncate ${isModule ? "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" : "font-semibold"}`}
                  >
                    {node.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-semibold">
                  {isModule && (
                    <button
                      type="button"
                      onClick={() => onCreateSubmodule(node.id)}
                      className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                    >
                      + Submodule
                    </button>
                  )}
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
              <div className="tree-branch">
                <NavigationNodes
                  nodes={(node as SidebarCategory).items}
                  parentPath={path}
                  activeDocId={activeDocId}
                  onRenameCategory={onRenameCategory}
                  onDeleteCategory={onDeleteCategory}
                  onCreateSubmodule={onCreateSubmodule}
                />
              </div>
            </li>
          );
        }
        return (
          <li key={`${parentPath.join("/")}/${node}`} className="pl-4 text-xs">
            <div
              className={`flex items-center gap-2 ${activeDocId === node ? "text-indigo-600 font-semibold" : "text-slate-500"}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span className="truncate">{node}</span>
            </div>
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
  currentDocId,
  publishedDocs,
  sidebarItems,
  onNavigateDir,
  onSelectFile,
  onCreateModule,
  onCreateSubmodule,
  onRenameCategory,
  onDeleteCategory,
}: CollectionsSidebarProps) {
  const renderIcon = (type: "file" | "directory") =>
    type === "directory" ? (
      <span className="nav-icon" aria-hidden>
        ⌂
      </span>
    ) : (
      <span className="nav-icon" aria-hidden>
        ⌘
      </span>
    );

  return (
    <section className="glass-panel tight h-fit lg:sticky lg:top-8">
      <div className="border-b border-slate-100 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
          Scope
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <div className="context-chip flex-1 min-w-[120px]">
            <span>Organization</span>
            <strong>{currentCollection?.orgSlug ?? "Select"}</strong>
          </div>
          <div className="context-chip flex-1 min-w-[120px]">
            <span>Product</span>
            <strong>{currentCollection?.product ?? "—"}</strong>
          </div>
          <div className="context-chip flex-1 min-w-[120px]">
            <span>Version</span>
            <strong>{currentCollection?.version ?? "—"}</strong>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase text-slate-500">
            Active collection
          </label>
          <select
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={selectedCollection ?? ""}
            onChange={(event) => onSelectCollection(event.target.value)}
          >
            <option value="">Choose collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.orgSlug ?? "org"} · {collection.product} · {collection.version}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-5 py-5 space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
            <span>Directory</span>
            {currentDir && (
              <button
                onClick={() => {
                  const parent = currentDir.split("/").slice(0, -1).join("/");
                  onNavigateDir(selectedCollection!, parent);
                }}
                className="text-[10px] font-semibold text-indigo-600"
              >
                Back
              </button>
            )}
          </div>
          <p className="mt-2 break-all text-sm text-slate-600">{currentDir || "root"}</p>
          {currentCollection?.slugPrefix && (
            <p className="mt-2 text-xs text-slate-500">
              Base slug prefix:{" "}
              <code className="rounded bg-slate-100 px-2 py-0.5 text-[11px]">
                {currentCollection.slugPrefix}
              </code>
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-600">Files</h3>
              <p className="text-xs text-slate-500">Browse workspace hierarchy</p>
            </div>
          </div>
          <div className="nav-list mt-3">
            <div className="nav-scroll">
              {tree.length ? (
                tree.map((node) => {
                  const docId = toDocId(node.path);
                  const isFile = node.type === "file";
                  const isActive = selectedFile === node.path && isFile;
                  const status = isFile && publishedDocs[docId] ? "LIVE" : isFile ? "Draft" : "DIR";
                  return (
                    <button
                      key={node.path}
                      onClick={() =>
                        node.type === "directory"
                          ? onNavigateDir(selectedCollection!, node.path)
                          : onSelectFile(selectedCollection!, node.path)
                      }
                      className={`nav-row w-full text-left text-sm ${isActive ? "active" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        {renderIcon(node.type)}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-700">{node.name}</p>
                          {isFile && publishedDocs[docId] && (
                            <p className="text-[11px] text-slate-400">
                              {publishedDocs[docId]?.map((entry) => entry.label).join(" › ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          status === "LIVE"
                            ? "bg-emerald-50 text-emerald-600"
                            : status === "DIR"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-4 text-sm text-slate-500">No files in this directory.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-600">Navigation</h3>
              <p className="text-xs text-slate-500">Modules & submodules</p>
            </div>
            <button
              type="button"
              onClick={onCreateModule}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              + Module
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {sidebarItems.length ? (
              <NavigationNodes
                nodes={sidebarItems}
                activeDocId={currentDocId}
                onRenameCategory={onRenameCategory}
                onDeleteCategory={onDeleteCategory}
                onCreateSubmodule={onCreateSubmodule}
              />
            ) : (
              <p className="text-xs text-slate-500">No modules yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
