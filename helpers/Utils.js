// Model constructor
export const setAttributes = (attrs, parent) => {
  if (attrs) {
    Object.keys.forEach(key => {
      if (key in parent) parent[key] = attrs[key];
    });
  }
};
