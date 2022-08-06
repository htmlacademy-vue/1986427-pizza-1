import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";

import {
  DELETE_ENTITY,
  UPDATE_ENTITY,
  SET_ENTITY,
  ADD_ENTITY,
  RESET_ENTITY,
} from "@/store/mutation-types";

Vue.use(Vuex);

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    state[module][entity] = value;
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    state[module][entity] = [...state[module][entity], value];
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    const index = state[module][entity].findIndex(({ id }) => id === value.id);
    if (~index) {
      state[module][entity].splice(index, 1, value);
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    state[module][entity] = state[module][entity].filter(
      (element) => element.id !== id
    );
  },
  [RESET_ENTITY](state, { module, reset }) {
    state[module] = reset;
  },
};

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations,
  modules,
  plugins: [VuexPlugins],
});
