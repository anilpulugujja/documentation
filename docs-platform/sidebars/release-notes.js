const sidebar = require('./release-notes.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.sections.flatMap((section) => section.items),
};
