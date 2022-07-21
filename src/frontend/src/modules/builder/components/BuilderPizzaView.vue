<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="name"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="resultClassPizza">
        <AppDrop @drop="dropItemHandler">
          <SelectorItem />
        </AppDrop>
      </div>
    </div>
    <BuilderPriceCounter :name="getPizzaName" />
  </div>
</template>
<script>
import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import SelectorItem from "@/common/components/SelectorItem";
import { pizzaType, pizzaSauce } from "@/static/mapper";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
    BuilderPriceCounter,
    SelectorItem,
  },
  data() {
    return {
      pizzaType,
      pizzaSauce,
      name: "",
    };
  },
  computed: {
    ...mapState("Builder", ["selectedDough", "selectedSauce"]),
    ...mapGetters("Builder", ["getUserSelectedIngredients"]),
    ...mapState("Orders", ["editableOrderId", "userOrder"]),
    getPizzaName: {
      get() {
        if (this.editableOrderId) {
          return this.userOrder.find((item) => item.id === this.editableOrderId)
            .name;
        }
        return this.name;
      },
      set(newValue) {
        this.name = newValue;
      },
    },
    resultClassPizza() {
      return `pizza--foundation--${pizzaType[this.selectedDough]}-${
        pizzaSauce[this.selectedSauce]
      }`;
    },
  },
  methods: {
    ...mapActions("Builder", ["updateIngredients"]),
    dropItemHandler(ingredient) {
      const item = this.getUserSelectedIngredients.find(
        (item) => item.ingredientId === ingredient.id
      );
      let quantity;
      if (item) {
        quantity = item.quantity + 1;
      } else {
        quantity = 1;
      }
      this.updateIngredients({ id: ingredient.id, quantity });
    },
  },
};
</script>
