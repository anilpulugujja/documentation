const sidebar = require('./sidebar.json');

const transformItems = (items = []) =>
  items.map((item) => {
    if (typeof item === 'string') {
      return item;
    }
    if (item.type === 'category') {
      const { id, items: childItems = [], customProps = {}, ...rest } = item;
      const nextCustomProps = { ...customProps };
      if (id) {
        nextCustomProps.nodeId = id;
      }
      const transformed = {
        ...rest,
        items: transformItems(childItems),
      };
      if (Object.keys(nextCustomProps).length) {
        transformed.customProps = nextCustomProps;
      }
      return transformed;
    }
    return item;
  });

module.exports = {
  [sidebar.sidebarId]: transformItems(sidebar.items),
};
