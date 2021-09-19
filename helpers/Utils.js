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

// Check if element is in the viewport
export const isInViewport = params => {
  const { element, offsetTop = 0 } = params;
  const rect = element.getBoundingClientRect();

  return (
    rect.top <=
    (window.innerHeight + offsetTop ||
      document.documentElement.clientHeight + offsetTop)
  );
};
