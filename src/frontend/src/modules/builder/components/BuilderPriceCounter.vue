<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      @click="addToCard"
      type="button"
      class="button"
      :disabled="disabled"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },
  computed: {
    disabled() {
      return this.price <= 0 || !this.pizzaName.length;
    },
  },
  methods: {
    addToCard() {
      if (this.disabled) {
        return;
      }
      this.$emit("addToCard", true);
    },
  },
};
</script>
