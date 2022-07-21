<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section
      v-for="order in orders"
      :key="`sheet ${order.orderId}`"
      class="sheet order"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ {{ order.orderId }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ order.totalSum }} ₽</span>
        </div>

        <div class="order__button">
          <button
            @click="deleteOrder(order.orderId)"
            type="button"
            class="button button--border"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button
            @click="repeatOrder(order.orderId)"
            type="button"
            class="button"
          >
            Повторить
          </button>
        </div>
      </div>

      <ul class="order__list">
        <li
          v-for="(item, key) in order.pizza"
          :key="`order__item-${key}`"
          class="order__item"
        >
          <div class="product">
            <img
              src="@/assets/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              :alt="item.name"
            />
            <div class="product__text">
              <h2>{{ item.name }}</h2>
              <ul>
                <li>{{ item.size }}, {{ item.dough }}</li>
                <li>Соус: {{ item.sauce }}</li>
                <li>Начинка: {{ item.ingredients.join(", ") }}</li>
              </ul>
            </div>
          </div>

          <p class="order__price">
            <template v-if="item.quantity > 1"> X{{ item.quantity }} </template>
            {{ item.pizzaSum }} ₽
          </p>
        </li>
      </ul>

      <ul class="order__additional">
        <li v-for="(item, key) in order.misc" :key="`misc-${key}`">
          <img :src="item.image" width="20" height="30" :alt="item.name" />
          <p>
            <span>{{ item.name }}</span>
            <b>{{ item.price }} ₽</b>
          </p>
        </li>
      </ul>

      <p class="order__address">Адрес доставки: {{ order.orderAddress }}</p>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      calculatedAmounts: [],
    };
  },
  computed: {
    ...mapState("Orders", ["userOrder"]),
  },
  async created() {
    await this.getOrders();
  },
  methods: {
    ...mapActions("Orders", ["setUserOrder", "setCountAdditionalGoods"]),
    async getOrders() {
      const pizzas = [];
      const orders = await this.$api.orders.query();
      const misc = await this.$api.misc.query();
      const dough = await this.$api.builderIngredients.getDough();
      const sizes = await this.$api.builderIngredients.getSizes();
      const sauces = await this.$api.builderIngredients.getSauces();
      const ingredients = await this.$api.builderIngredients.getIngredients();

      orders.forEach((order) => {
        const pizza = [];
        let totalSum = 0;
        let sum = 0;
        order.orderPizzas.forEach((orderItem) => {
          const ingredientsNames = [];
          let sumIngredients = 0;

          orderItem.ingredients.forEach((orderIngredient) => {
            const item = ingredients.find(
              (ingredient) => ingredient.id === orderIngredient.ingredientId
            );
            sumIngredients += item.price;
            ingredientsNames.push(item.name);
          });

          const saucesItem = sauces.find((el) => el.id === orderItem.sauceId);
          const doughItem = dough.find((el) => el.id === orderItem.doughId);
          const sizesItem = sizes.find((el) => el.id === orderItem.sizeId);
          sum =
            sizesItem.multiplier *
            (saucesItem.price + doughItem.price + sumIngredients);
          totalSum += sum * orderItem.quantity;

          this.calculatedAmounts.push({ idPizza: orderItem.id, sum });

          pizza.push({
            ingredients: ingredientsNames,
            pizzaSum: sum,
            name: orderItem.name,
            sauce: saucesItem.name,
            dough: doughItem.name,
            size: sizesItem.name,
            quantity: orderItem.quantity,
          });
        });

        let miscSum = 0;
        let miscUser = [];
        if (order.orderMisc) {
          miscUser = order.orderMisc.map((userMisc) => {
            const item = misc.find(
              (miscItem) => miscItem.id === userMisc.miscId
            );
            miscSum += item.price * userMisc.quantity;
            return item;
          });
        }

        pizzas.push({
          pizza: { ...pizza },
          misc: miscUser,
          totalSum: totalSum + miscSum,
          orderId: order.id,
          orderAddress: `Адрес доставки: ${order.orderAddress.name} ул. ${
            order.orderAddress.street
          } д. ${order.orderAddress.building} кв. ${
            order.orderAddress.flat || ""
          }`,
        });
      });
      this.orders = pizzas;
    },
    async deleteOrder(id) {
      await this.$api.orders.delete(id);
      await this.getOrders();
    },
    async repeatOrder(id) {
      const orders = await this.$api.orders.query();
      const order = orders.find((item) => item.id === id);

      let misc = [];
      if (order.misc) {
        misc = order.misc.map((miscItem) => ({
          id: miscItem.miscId,
          quantity: miscItem.quantity,
        }));
        misc.forEach((item) => this.setCountAdditionalGoods(item));
      }

      order.orderPizzas.forEach((itemOrder) => {
        const price = this.calculatedAmounts.find(
          (item) => item.idPizza === itemOrder.id
        ).sum;
        this.setUserOrder(Object.assign(itemOrder, { price }));
      });
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style scoped></style>
