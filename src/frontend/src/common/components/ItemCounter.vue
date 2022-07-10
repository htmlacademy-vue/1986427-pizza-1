<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      @click="subtraction"
      :disabled="value <= 0"
      type="button"
      class="counter__button counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="value" />
    <button
      @click="addition"
      :disabled="disabled"
      type="button"
      class="counter__button counter__button--plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    ingredient: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    subtraction() {
      this.$emit("countHandler", {
        count: this.value - 1,
        ingredient: this.ingredient,
      });
    },
    addition() {
      this.$emit("countHandler", {
        count: this.value + 1,
        ingredient: this.ingredient,
      });
    },
  },
};
</script>
