import { Photo } from "@/models/Photo";

const SET_LOADING = (state, payload) => {
  state.isLoading = payload;
};

const SET_PARAMS = (state, payload) => {
  const { start, limit } = payload;

  state.meta["_start"] = start;
  state.meta["_limit"] = limit;
};

const SET_PHOTOS = (state, payload) => {
  payload.forEach(photo => {
    state.photos.push(new Photo(photo));
  });
};

const REMOVE_PHOTO = (state, payload) => {
  const { id } = payload;
  const idx = state.photos.findIndex(el => el.id === id);

  state.photos.splice(idx, 1);
};

export default {
  SET_LOADING,
  SET_PHOTOS,
  SET_PARAMS,
  REMOVE_PHOTO
};
