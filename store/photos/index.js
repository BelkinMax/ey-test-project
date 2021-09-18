import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

const state = () => {
  return {
    photos: [],

    meta: {
      COUNT: 5000
    },

    params: {
      _start: 0,
      _limit: 12
    },

    isLoading: false
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
