import { ApiRoutes } from "@/helpers/ApiRoutes";

export const actions = {
  handler: () => {},

  async fetchPhotos({ commit }, params) {
    commit("SET_LOADING", true);

    try {
      const { data } = await this.$axios(ApiRoutes.photos.all, { params });

      commit("SET_PHOTOS", data);
      commit("UPDATE_START", params["_limit"]);
    } catch (e) {
      console.error(e);
    }

    commit("SET_LOADING", false);
  }
};
