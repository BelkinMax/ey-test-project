import Photo from "@/models/Photo";

const SET_LOADING = (state, payload) => {
  state.isLoading = payload;
};

const SET_PARAMS = (state, payload) => {
  const { _start = null, _limit = null } = payload;

  if (_start !== null) state.params["_start"] = _start;
  if (_limit !== null) state.params["_limit"] = _limit;
};

const UPDATE_START = (state, payload) => {
  state.params["_start"] += payload;
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
  UPDATE_START,
  REMOVE_PHOTO
};
