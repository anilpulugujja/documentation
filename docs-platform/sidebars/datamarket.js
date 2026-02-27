const sidebar = require('./datamarket.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.items,
};
