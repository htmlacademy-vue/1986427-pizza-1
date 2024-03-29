import { ingredientsClassNames } from "@/static/mapper";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  RESET_ENTITY,
} from "@/store/mutation-types";

const moduleName = "Builder";
const defaultState = () => ({
  ingredients: [],
  sizes: [],
  dough: [],
  sauces: [],
  selectedDough: 1,
  selectedSize: 2,
  selectedSauce: 1,
  name: "",
  price: 0,
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getSoucePrice(state) {
      return state.sauces.find((item) => item.id === state.selectedSauce).price;
    },
    getDoughPrice(state) {
      return state.dough.find((item) => item.id === state.selectedDough).price;
    },
    getSizePrice(state) {
      return state.sizes.find((item) => item.id === state.selectedSize)
        .multiplier;
    },
    calcIngredients(state, getters) {
      return getters.getUserSelectedIngredients.reduce((prev, cur) => {
        const price = state.ingredients.find(
          (item) => item.id === cur.ingredientId
        )["price"];

        prev += cur.quantity * price;

        return prev;
      }, 0);
    },
    getUserSelectedIngredients(state) {
      const res = [];
      state.ingredients.forEach((ingredient) => {
        const ingredientId = ingredient.id;
        if (ingredient.quantity && ingredient.quantity > 0) {
          res.push({
            ingredientId,
            className: ingredientsClassNames[ingredientId],
            name: ingredient.name,
            quantity: ingredient.quantity,
          });
        }
      });
      return res;
    },
  },
  actions: {
    setPrice({ commit, getters }) {
      if (!Object.keys(getters.getUserSelectedIngredients).length) {
        return 0;
      }
      const total =
        getters.getSizePrice *
        (getters.getSoucePrice +
          getters.getDoughPrice +
          getters.calcIngredients);

      commit(
        SET_ENTITY,
        {
          entity: "price",
          module: moduleName,
          value: total,
        },
        { root: true }
      );
    },
    setSize({ commit, dispatch }, size) {
      commit(
        SET_ENTITY,
        {
          entity: "selectedSize",
          module: moduleName,
          value: size,
        },
        { root: true }
      );
      dispatch("setPrice");
    },
    setDough({ commit, dispatch }, dough) {
      commit(
        SET_ENTITY,
        {
          entity: "selectedDough",
          module: moduleName,
          value: dough,
        },
        { root: true }
      );
      dispatch("setPrice");
    },
    setSauce({ commit, dispatch }, sauce) {
      commit(
        SET_ENTITY,
        {
          entity: "selectedSauce",
          module: moduleName,
          value: sauce,
        },
        { root: true }
      );
      dispatch("setPrice");
    },
    updateIngredients({ commit, dispatch, state }, ingredientValues) {
      const { id, quantity } = ingredientValues;
      const ingredient = state.ingredients[id - 1];
      commit(
        UPDATE_ENTITY,
        {
          entity: "ingredients",
          module: moduleName,
          value: Object.assign(ingredient, { quantity }),
        },
        { root: true }
      );

      dispatch("setPrice");
    },
    async init({ commit }) {
      const ingredients = await this.$api.builderIngredients.getIngredients();
      const dough = await this.$api.builderIngredients.getDough();
      const sizes = await this.$api.builderIngredients.getSizes();
      const sauces = await this.$api.builderIngredients.getSauces();

      commit(
        SET_ENTITY,
        {
          entity: "ingredients",
          module: moduleName,
          value: ingredients,
        },
        { root: true }
      );

      commit(
        SET_ENTITY,
        {
          entity: "dough",
          module: moduleName,
          value: dough,
        },
        { root: true }
      );

      commit(
        SET_ENTITY,
        {
          entity: "sizes",
          module: moduleName,
          value: sizes,
        },
        { root: true }
      );

      commit(
        SET_ENTITY,
        {
          entity: "sauces",
          module: moduleName,
          value: sauces,
        },
        { root: true }
      );
    },
    resetBuilderState({ commit }) {
      const reset = defaultState();
      commit(RESET_ENTITY, { module: moduleName, reset }, { root: true });
    },
  },
};
