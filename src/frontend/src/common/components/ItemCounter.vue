<template>
  <div class="counter">
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
      :class="`counter__button counter__button--plus ${modificatorRightBtn}`"
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
    itemId: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    modificatorRightBtn: {
      type: String,
      default: "",
    },
  },
  methods: {
    subtraction() {
      this.$emit("countHandler", {
        quantity: this.value - 1,
        id: this.itemId,
      });
    },
    addition() {
      this.$emit("countHandler", {
        quantity: this.value + 1,
        id: this.itemId,
      });
    },
  },
};
</script>
