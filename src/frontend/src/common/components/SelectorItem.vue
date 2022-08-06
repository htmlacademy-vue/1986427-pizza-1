<template>
  <div class="pizza__wrapper">
    <template v-if="!Object.keys(getUserSelectedIngredients).length">
      <div class="pizza__filling pizza__filling--ananas"></div>
      <div class="pizza__filling pizza__filling--bacon"></div>
      <div class="pizza__filling pizza__filling--cheddar"></div>
    </template>
    <div
      v-else
      v-for="(ingredient, key) in Object.values(getUserSelectedIngredients)"
      :key="`ingredients-${key}`"
      :class="getPizzaClasses(ingredient.className, ingredient.quantity)"
    ></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "SelectorItem",
  computed: {
    ...mapGetters("Builder", ["getUserSelectedIngredients"]),
  },
  methods: {
    getPizzaClasses(ingredient, cnt) {
      let additional = "";

      if (cnt === 2) {
        additional = "pizza__filling--second";
      }
      if (cnt === 3) {
        additional = "pizza__filling--third";
      }

      return `pizza__filling pizza__filling--${ingredient} ${additional}`;
    },
  },
};
</script>
