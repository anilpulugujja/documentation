"use client";

import { useDashboard } from "@/hooks/useDashboard";
import {
  DashboardHeader,
  CollectionsSidebar,
  EditorPanel,
  ActionsPanel,
} from "./dashboard";

const DashboardApp = () => {
  const dashboard = useDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-100">
      <DashboardHeader onLogout={dashboard.logout} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <CollectionsSidebar
          collections={dashboard.collections}
          selectedCollection={dashboard.selectedCollection}
          onSelectCollection={dashboard.setSelectedCollection}
          currentCollection={dashboard.currentCollection}
          tree={dashboard.tree}
          currentDir={dashboard.currentDir}
          selectedFile={dashboard.selectedFile}
          publishedDocs={dashboard.publishedDocs}
          sidebarItems={dashboard.sidebarItems}
          onNavigateDir={dashboard.fetchTree}
          onSelectFile={dashboard.fetchDocument}
          onCreateModule={dashboard.handleCreateModule}
          onRenameCategory={dashboard.handleRenameCategory}
          onDeleteCategory={dashboard.handleDeleteCategory}
        />

        <EditorPanel
          selectedFile={dashboard.selectedFile}
          currentCollection={dashboard.currentCollection}
          currentDocId={dashboard.currentDocId}
          publishedPath={dashboard.publishedPath}
          publishedSectionLabel={dashboard.publishedSectionLabel}
          frontmatter={dashboard.frontmatter}
          body={dashboard.body}
          onBodyChange={dashboard.setBody}
          advancedFrontmatter={dashboard.advancedFrontmatter}
          onAdvancedFrontmatterChange={dashboard.setAdvancedFrontmatter}
          advancedFrontmatterPlaceholder={dashboard.advancedFrontmatterPlaceholder}
          formatFieldValue={dashboard.formatFieldValue}
          onFrontmatterFieldChange={dashboard.updateFrontmatterField}
          loadingState={dashboard.loadingState}
          error={dashboard.error}
          notification={dashboard.notification}
          warnings={dashboard.warnings}
          onDismissWarnings={() => dashboard.setWarnings([])}
          onSave={dashboard.handleSave}
        />

        <ActionsPanel
          newDoc={dashboard.newDoc}
          onNewDocChange={dashboard.setNewDoc}
          onFilenameChange={dashboard.handleFilenameChange}
          templates={dashboard.templates}
          currentCollection={dashboard.currentCollection}
          currentDir={dashboard.currentDir}
          onWordUpload={dashboard.handleWordUpload}
          onMarkdownUpload={dashboard.handleMarkdownUpload}
          onCreate={dashboard.handleCreate}
          loadingState={dashboard.loadingState}
          currentDocId={dashboard.currentDocId}
          publishedSectionLabel={dashboard.publishedSectionLabel}
          moduleCategories={dashboard.moduleCategories}
          submoduleCategories={dashboard.submoduleCategories}
          selectedModuleId={dashboard.selectedModuleId}
          onModuleChange={dashboard.setSelectedModuleId}
          selectedSubmoduleId={dashboard.selectedSubmoduleId}
          onSubmoduleChange={dashboard.setSelectedSubmoduleId}
          positionMode={dashboard.positionMode}
          onPositionModeChange={dashboard.setPositionMode}
          beforeDocId={dashboard.beforeDocId}
          onBeforeDocChange={dashboard.setBeforeDocId}
          targetDocOptions={dashboard.targetDocOptions}
          publishState={dashboard.publishState}
          publishedPath={dashboard.publishedPath}
          onPublish={dashboard.handlePublish}
          onUnpublish={dashboard.handleUnpublish}
          onCreateModule={dashboard.handleCreateModule}
          onCreateSubmodule={dashboard.handleCreateSubmodule}
        />
      </main>
    </div>
  );
};

export default DashboardApp;
