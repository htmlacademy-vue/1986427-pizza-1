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
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("Builder", [
      "price",
      "sizes",
      "dough",
      "sauces",
      "selectedSize",
      "selectedDough",
      "selectedSauce",
    ]),
    ...mapState("Orders", ["userOrder", "editableOrderId"]),
    ...mapGetters("Builder", ["getUserSelectedIngredients"]),
    disabled() {
      return this.price <= 0 || !this.name.length;
    },
  },
  methods: {
    ...mapActions("Orders", [
      "setUserOrder",
      "setEditableOrder",
      "setEditableOrder",
      "updateOrder",
    ]),
    addToCard() {
      if (this.disabled) {
        return;
      }

      const id = this.editableOrderId ?? this.userOrder.length + 1;
      const order = {
        id,
        name: this.name,
        ingredients: this.getUserSelectedIngredients,
        price: this.price,
        quantity: 1,
        sizeId: this.sizes[this.selectedSize - 1].id,
        doughId: this.dough[this.selectedDough - 1].id,
        sauceId: this.sauces[this.selectedSauce - 1].id,
      };

      if (this.editableOrderId) {
        this.updateOrder(order);
        this.setEditableOrder(null);
        return;
      }
      this.setUserOrder(order);
    },
  },
};
</script>
