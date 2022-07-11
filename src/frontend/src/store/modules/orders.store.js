import {
  UPDATE_ENTITY,
  ADD_ENTITY,
  DELETE_ENTITY,
  SET_ENTITY,
  RESET_ENTITY,
} from "@/store/mutation-types";
import misc from "@/static/misc.json";

const moduleName = "Orders";

const defaultState = () => ({
  misc: [],
  userOrder: [],
  editableOrderId: null,
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getUserOrderPrice(state) {
      let price = 0;
      state.userOrder.forEach((item) => {
        price += item.price;
      });
      return price;
    },
    getTotalSum(state, getters) {
      if (!getters.issetOrder) {
        return 0;
      }
      return getters.getUserOrderPrice + getters.getCalcAdditionl;
    },
    getCalcAdditionl(state, getters) {
      let total = 0;
      Object.keys(getters.getAdditionalGoods).forEach((id) => {
        const item = getters.getAdditionalGoods[+id];
        if (item.count) {
          total += item.price * item.count;
        }
      });
      return total;
    },
    issetOrder(state) {
      return Object.keys(state.userOrder).length;
    },
    getAdditionalGoods(state) {
      const res = [];
      state.misc.forEach((item) => {
        const { count, id, price } = item;
        if (item.count && item.count > 0) {
          res.push({
            price,
            count,
            id,
          });
        }
      });

      return res;
    },
  },
  actions: {
    setCountAdditionalGoods({ commit, state }, additionalOrder) {
      const { id, count } = additionalOrder;
      const miscItem = state.misc.find((item) => item.id === id);
      commit(
        UPDATE_ENTITY,
        {
          entity: "misc",
          module: moduleName,
          value: Object.assign(miscItem, { count }),
        },
        { root: true }
      );
    },
    setUserOrder({ commit }, order) {
      commit(
        ADD_ENTITY,
        {
          entity: "userOrder",
          module: moduleName,
          value: order,
        },
        { root: true }
      );
    },
    deleteOrder({ commit }, order) {
      const { id } = order;
      commit(
        DELETE_ENTITY,
        {
          entity: "userOrder",
          module: moduleName,
          id,
        },
        { root: true }
      );
    },
    setEditableOrder({ commit }, id) {
      commit(
        SET_ENTITY,
        {
          entity: "editableOrderId",
          module: moduleName,
          value: id,
        },
        { root: true }
      );
    },
    updateOrder({ commit, state }, order) {
      const { id } = order;
      const curOrder = state.userOrder.find((item) => item.id === id);

      commit(
        UPDATE_ENTITY,
        {
          entity: "userOrder",
          module: moduleName,
          value: Object.assign(curOrder, order),
        },
        { root: true }
      );
    },
    init({ commit }) {
      commit(
        SET_ENTITY,
        {
          entity: "misc",
          module: moduleName,
          value: misc,
        },
        { root: true }
      );
    },
    resetOrdersState({ commit }) {
      const reset = defaultState();
      commit(RESET_ENTITY, { module: moduleName, reset }, { root: true });
    },
  },
};
