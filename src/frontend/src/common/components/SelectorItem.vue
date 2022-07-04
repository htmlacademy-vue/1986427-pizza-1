<template>
  <div class="pizza__wrapper">
    <template v-if="!Object.keys(userSelectedIngredients).length">
      <div class="pizza__filling pizza__filling--ananas"></div>
      <div class="pizza__filling pizza__filling--bacon"></div>
      <div class="pizza__filling pizza__filling--cheddar"></div>
    </template>
    <div
      v-else
      v-for="(ingredient, key) in Object.values(userSelectedIngredients)"
      :key="`ingredients-${key}`"
      :class="getPizzaClasses(ingredient.name, ingredient.count)"
    ></div>
  </div>
</template>
<script>
export default {
  name: "SelectorItem",
  props: {
    userSelectedIngredients: {
      type: Object,
      required: true,
    },
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
