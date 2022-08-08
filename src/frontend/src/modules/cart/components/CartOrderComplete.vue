<template>
  <div class="popup">
    <a @click.prevent="close" href="#" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a @click.prevent="close" href="#" class="button">Отлично, я жду!</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CartOrderComplete",
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Orders", ["userOrder", "userAddress"]),
    ...mapGetters("Orders", ["getAdditionalGoods"]),
  },
  methods: {
    ...mapActions("Orders", {
      ordersInit: "init",
      resetOrdersState: "resetOrdersState",
    }),
    ...mapActions("Builder", {
      builderInit: "init",
      resetBuilderState: "resetBuilderState",
    }),
    async close() {
      if (!this.user) {
        await this.reInit();
        this.closePopup();
        this.$router.push({ name: "IndexHome" });

        return;
      }
      const pizzas = [];
      this.userOrder.forEach((order) => {
        const ingredients = order.ingredients.map((item) => ({
          ingredientId: item.ingredientId,
          quantity: item.quantity,
        }));

        pizzas.push({
          name: order.name,
          sauceId: order.sauceId,
          doughId: order.doughId,
          sizeId: order.sizeId,
          quantity: order.quantity,
          ingredients,
        });
      });

      const misc = this.getAdditionalGoods.map((item) => ({
        miscId: item.id,
        quantity: item.quantity,
      }));

      await this.$api.orders.post({
        userId: this.user.id,
        phone: this.user.phone,
        address: this.userAddress,
        pizzas,
        misc,
      });

      await this.reInit();
      this.closePopup();
      this.$router.push("orders");
    },
    async reInit() {
      this.resetOrdersState();
      this.resetBuilderState();
      await this.ordersInit();
      await this.builderInit();
    },
    closePopup() {
      this.$emit("close", false);
    },
  },
};
</script>
