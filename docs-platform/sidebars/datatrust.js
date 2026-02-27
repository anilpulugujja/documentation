const sidebar = require('./datatrust.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.sections.flatMap((section) => section.items),
};
