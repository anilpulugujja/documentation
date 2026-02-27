const sidebar = require('./datamarket.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.sections.flatMap((section) => section.items),
};
