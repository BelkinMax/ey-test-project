const JSON_PLACEHOLDER_BASE = process.env.JSON_PLACEHOLDER_BASE;

// Routes
const PHOTOS = `${JSON_PLACEHOLDER_BASE}/photos`;

export const ApiRoutes = {
  photos: {
    all: PHOTOS
  }
};
