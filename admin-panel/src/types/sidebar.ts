export type SidebarSection = {
  id: string;
  label: string;
  items: string[];
};

export type SidebarDefinition = {
  sidebarId: string;
  sections: SidebarSection[];
};

export type PublishPosition =
  | { type: 'end' }
  | { type: 'top' }
  | { type: 'before'; docId: string };
