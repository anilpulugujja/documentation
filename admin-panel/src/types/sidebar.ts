export type SidebarDocItem = string;

export type SidebarCategory = {
  type: 'category';
  id: string;
  label: string;
  items: SidebarNode[];
  collapsible?: boolean;
  collapsed?: boolean;
};

export type SidebarNode = SidebarCategory | SidebarDocItem;

export type SidebarDefinition = {
  sidebarId: string;
  items: SidebarNode[];
};

export type PublishPosition =
  | { type: 'end' }
  | { type: 'top' }
  | { type: 'before'; docId: string };
