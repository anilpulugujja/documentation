const sidebar = require('./rightsight.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.sections.flatMap((section) => section.items),
};
