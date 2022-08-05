<template>
  <ul v-if="userOrder.length" class="cart-list sheet">
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
          :alt="order.name"
        />
        <div class="product__text">
          <h2>{{ order.name }}</h2>
          <ul>
            <li>{{ getSizeName(order) }}, {{ getDoughName(order) }}</li>
            <li>Соус: {{ getSouceName(order) }}</li>
            <li>Начинка: {{ getIngredientsNames(order.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <ItemCounter
          :itemId="order.id"
          :value="getCount(order)"
          :disabled="isDisabled(order)"
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
import { isDisabled, getCount } from "@/common/helper";
import { mapState, mapActions } from "vuex";

export default {
  name: "CartProductList",
  computed: {
    ...mapState("Orders", ["userOrder"]),
    ...mapState("Builder", ["ingredients", "dough", "sizes", "sauces"]),
  },
  components: {
    ItemCounter,
  },
  methods: {
    ...mapActions("Orders", ["updateOrder", "deleteOrder", "setEditableOrder"]),
    ...mapActions("Builder", ["updateIngredients"]),
    getCount,
    isDisabled,
    editPizza(id) {
      const selectedIngredients = this.userOrder.find(
        (item) => item.id === id
      ).ingredients;
      this.ingredients.forEach((ingredient) => {
        const selectedIngredient = selectedIngredients.find(
          (item) => item.ingredientId === ingredient.id
        );
        if (selectedIngredient) {
          this.updateIngredients({
            id: selectedIngredient.ingredientId,
            quantity: selectedIngredient.quantity,
          });
        } else {
          this.updateIngredients({ id: ingredient.id, quantity: 0 });
        }
      });
      const curOrder = this.userOrder.find((item) => item.id === id);
      this.setEditableOrder(curOrder.id);
      this.$router.push({ name: "IndexHome" });
    },
    countHandler(value) {
      const { quantity, id } = value;
      if (quantity === 0) {
        this.deleteOrder(value);

        return;
      }

      const curOrder = this.userOrder.find((item) => item.id === id);
      const prevPrice = curOrder?.prevPrice || curOrder.price;

      let newPrice;
      if (quantity >= curOrder.quantity) {
        newPrice = curOrder.price + prevPrice;
      } else {
        newPrice = curOrder.price - prevPrice;
      }

      this.updateOrder({
        quantity,
        id,
        price: newPrice,
        prevPrice,
      });
    },
    getSouceName(order) {
      if (!this.sauces.length) {
        return "";
      }
      return this.sauces.find((el) => el.id === order.sauceId).name;
    },
    getDoughName(order) {
      if (!this.dough.length) {
        return "";
      }
      return this.dough.find((el) => el.id === order.doughId).name;
    },
    getSizeName(order) {
      if (!this.sizes.length) {
        return "";
      }
      return this.sizes.find((el) => el.id === order.sizeId).name;
    },
    getIngredientsNames(order) {
      return order
        .map((orderItem) => {
          const item = this.ingredients.find(
            (ingredient) => ingredient.id === orderItem.ingredientId
          );
          return item.name;
        })
        .join(", ");
    },
  },
};
</script>

<style scoped></style>
