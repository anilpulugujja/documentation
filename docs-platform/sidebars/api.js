const sidebar = require('./api.json');

module.exports = {
  [sidebar.sidebarId]: sidebar.items,
};
