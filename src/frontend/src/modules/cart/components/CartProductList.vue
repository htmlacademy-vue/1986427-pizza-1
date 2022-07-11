<template>
  <ul class="cart-list sheet">
    <li
      v-for="(order, key) in userOrder"
      :key="`cart - list__item-${key}`"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="order.pizzaName"
        />
        <div class="product__text">
          <h2>{{ order.pizzaName }}</h2>
          <ul>
            <li>{{ order.size }}, {{ order.dough }}</li>
            <li>Соус: {{ order.sauce }}</li>
            <li>Начинка: {{ getIngredients(order.compound) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <ItemCounter
          :itemId="order.id"
          :value="getCount(order.id, userOrder, 1)"
          :disabled="isDisabled(order.id, userOrder)"
          @countHandler="countHandler"
          class="additional-list__counter"
          modificatorRightBtn="counter__button--orange"
        />
      </div>

      <div class="cart-list__price">
        <b>{{ order.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          @click="editPizza(order.id)"
          type="button"
          class="cart-list__edit"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
import ItemCounter from "@/common/components/ItemCounter";
import { isDisabled, getCount } from "@/static/helper";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartProductList",
  computed: {
    ...mapState("Orders", ["userOrder"]),
    ...mapState("Builder", ["ingredients"]),
  },
  components: {
    ItemCounter,
  },
  data() {
    return {
      getCount,
      isDisabled,
    };
  },
  methods: {
    ...mapActions("Orders", ["updateOrder", "deleteOrder", "setEditableOrder"]),
    ...mapActions("Builder", ["updateIngredients"]),
    editPizza(id) {
      const compound = this.userOrder.find((item) => item.id === id).compound;
      this.ingredients.forEach((ingredient) => {
        const selectedIngredient = compound.filter(
          (item) => item.id === ingredient.id
        );
        if (selectedIngredient.length) {
          this.updateIngredients({
            id: selectedIngredient[0].id,
            count: selectedIngredient[0].count,
          });
        } else {
          this.updateIngredients({ id: ingredient.id, count: 0 });
        }
      });
      const curOrder = this.userOrder.find((item) => item.id === id);
      this.setEditableOrder(curOrder.id);
      this.$router.push({ name: "IndexHome" });
    },
    getIngredients(ingredients) {
      const result = [];
      Object.values(ingredients).forEach((ingredient) => {
        result.push(ingredient.name);
      });
      return result.join(", ");
    },
    countHandler(value) {
      const { count, id } = value;
      if (count === 0) {
        this.deleteOrder(value);

        return;
      }

      const curOrder = this.userOrder.find((item) => item.id === id);
      const prevPrice = curOrder?.prevPrice || curOrder.price;

      let newPrice;
      if (count >= curOrder.count) {
        newPrice = curOrder.price + prevPrice;
      } else {
        newPrice = curOrder.price - prevPrice;
      }

      this.updateOrder({
        count,
        id,
        price: newPrice,
        prevPrice,
      });
    },
  },
};
</script>

<style scoped></style>
