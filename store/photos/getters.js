const photos = state => {
  return state.photos;
};

const photosIsLoading = state => {
  return state.isLoading;
};

const photosMeta = state => {
  return state.meta;
};

const photosParams = state => {
  return state.params;
};

export default {
  photos,
  photosIsLoading,
  photosMeta,
  photosParams
};
