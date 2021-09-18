// Model constructor
export const setAttributes = (attrs, parent) => {
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      if (key in parent) {
        parent[key] = attrs[key];
      } else {
        console.warn(
          `"${key}" doesn not exist in ${parent.constructor.name.toUpperCase()}`
        );
      }
    });
  }
};
