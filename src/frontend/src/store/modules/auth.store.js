import { SET_ENTITY } from "@/store/mutation-types";

const defaultState = () => ({
  user: null,
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {},
  actions: {
    async login({ dispatch }, userData) {
      const data = await this.$api.auth.login(userData);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("setUser");
    },
    async setUser({ commit }) {
      try {
        const userData = await this.$api.auth.getUser();
        commit(
          SET_ENTITY,
          {
            entity: "user",
            module: "Auth",
            value: userData,
          },
          { root: true }
        );
      } catch (e) {
        this.$jwt.destroyToken();
        console.log("Ошибка при получении данных пользователя");
      }
    },
    async logout({ commit }) {
      await this.$api.auth.logout();

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        {
          entity: "user",
          module: "Auth",
          value: null,
        },
        { root: true }
      );
    },
  },
};
