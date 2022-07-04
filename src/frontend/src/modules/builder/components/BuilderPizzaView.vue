<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        v-model="pizzaName"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza" :class="resultClassPizza">
        <DropItem @drop="dropItemHandler">
          <SelectorItem :userSelectedIngredients="userSelectedIngredients" />
        </DropItem>
      </div>
    </div>
    <BuilderPriceCounter
      @addToCard="addToCardHandler"
      :price="price"
      :pizzaName="pizzaName"
    />
  </div>
</template>
<script>
import DropItem from "@/common/components/DropItem";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import SelectorItem from "@/common/components/SelectorItem";
import { pizzaType, pizzaSauce } from "@/static/mapper";

export default {
  name: "BuilderPizzaView",
  props: {
    userSelectedIngredients: {
      type: Object,
      required: true,
    },
    selectedDough: {
      type: Number,
      required: true,
    },
    selectedSauce: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  components: {
    DropItem,
    BuilderPriceCounter,
    SelectorItem,
  },
  data() {
    return {
      pizzaType,
      pizzaSauce,
      pizzaName: "",
    };
  },
  computed: {
    resultClassPizza() {
      return `pizza--foundation--${pizzaType[this.selectedDough]}-${
        pizzaSauce[this.selectedSauce]
      }`;
    },
  },
  methods: {
    addToCardHandler(value) {
      this.$emit("addToCard", { send: value, name: this.pizzaName });
    },
    dropItemHandler(ingredient) {
      const count = this.userSelectedIngredients[ingredient.id]
        ? this.userSelectedIngredients[ingredient.id].count + 1
        : 1;
      this.$emit("dropItem", { ingredient: ingredient.id, count });
    },
  },
};
</script>
