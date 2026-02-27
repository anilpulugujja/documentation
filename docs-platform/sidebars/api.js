const sidebar = require('./api.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.sections.flatMap((section) => section.items),
};
