<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      @click="subtraction"
      :disabled="disabledMinus"
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
    userSelectedIngredients: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      count: this.value,
    };
  },
  computed: {
    disabledMinus() {
      return this.count <= 0;
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.count = val;
        }
      },
    },
  },
  methods: {
    subtraction() {
      this.count = this.count > 0 ? this.count - 1 : 0;
      this.$emit("countHandler", {
        count: this.count,
        ingredient: this.ingredient,
      });
    },
    addition() {
      this.count = this.count + 1;
      this.$emit("countHandler", {
        count: this.count,
        ingredient: this.ingredient,
      });
    },
  },
};
</script>
