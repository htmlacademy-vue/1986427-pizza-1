<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector @getDoughType="getDoughType" :dough="dough" />
        <BuilderSizeSelector @getSize="getSize" :sizes="sizes" />
        <BuilderIngredientsSelector
          @getSauce="getSauce"
          @getIngredients="getIngredients"
          :userSelectedIngredients="userSelectedIngredients"
          :ingredients="ingredients"
          :sauces="sauces"
        />
        <BuilderPizzaView
          :userSelectedIngredients="userSelectedIngredients"
          @addToCard="addToCardHandler"
          @dropItem="dropItemHandler"
          :selectedDough="selectedDough"
          :selectedSauce="selectedSauce"
          :price="calcPrice"
        />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { ingredientsNames } from "@/static/mapper";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      ingredientsNames,
      userOrder: {},
      userSelectedIngredients: {},
      ingredients: pizza.ingredients,
      sizes: pizza.sizes,
      dough: pizza.dough,
      sauces: pizza.sauces,
      selectedDough: 1,
      selectedSize: 1,
      selectedSauce: 1,
      pizzaName: "",
    };
  },
  computed: {
    calcIngredients() {
      let total = 0;
      const userIngredients = this.userSelectedIngredients;
      const allIngredients = this.ingredients;

      Object.keys(userIngredients).forEach((itemId) => {
        const idIngredient = parseInt(itemId);
        const item = userIngredients[idIngredient];

        const price = allIngredients.find((item) => item.id === idIngredient)[
          "price"
        ];

        total += item.count * price;
      });

      return total;
    },
    calcPrice() {
      if (!Object.keys(this.userSelectedIngredients).length) {
        return 0;
      }
      const saucePrice = this.sauces.filter(
        (item) => item.id === this.selectedSauce
      )[0].price;
      const doughPrice = this.dough.filter(
        (item) => item.id === this.selectedDough
      )[0].price;
      const sizePrice = this.sizes.filter(
        (item) => item.id === this.selectedSize
      )[0].multiplier;

      return sizePrice * (saucePrice + doughPrice + this.calcIngredients);
    },
  },
  methods: {
    getDoughType(value) {
      this.selectedDough = value;
    },
    getSize(value) {
      this.selectedSize = value;
    },
    getSauce(value) {
      this.selectedSauce = value;
    },
    getIngredients(value) {
      const { count, ingredient } = value;

      if (count === 0) {
        this.$delete(this.userSelectedIngredients, ingredient);

        return;
      }

      this.$set(this.userSelectedIngredients, ingredient, {
        name: ingredientsNames[ingredient],
        count,
      });
    },
    addToCardHandler(order) {
      this.pizzaName = order.name;
      this.$set(this.userOrder, 0, {
        compound: this.userSelectedIngredients,
        price: this.calcPrice,
        pizzaName: order.name,
      });

      this.$emit("updateOrder", this.userOrder);
    },
    dropItemHandler(value) {
      this.getIngredients(value);
    },
  },
};
</script>

<style scoped></style>
