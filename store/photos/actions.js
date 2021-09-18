import { ApiRoutes } from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async fetchPhotos({ commit }, params) {
    commit("SET_LOADING", true);

    try {
      // TODO: Fetch photos
    } catch (e) {
      console.error(e);
    }

    commit("SET_LOADING", false);
  }
};
