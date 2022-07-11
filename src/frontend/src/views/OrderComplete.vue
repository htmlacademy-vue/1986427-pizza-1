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
import { mapState, mapActions } from "vuex";

export default {
  name: "OrderComplete",
  computed: {
    ...mapState("Auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("Orders", {
      ordersInit: "init",
      resetOrdersState: "resetOrdersState",
    }),
    ...mapActions("Builder", {
      builerInit: "init",
      resetBuilderState: "resetBuilderState",
    }),
    close() {
      if (this.isAuth) {
        this.$router.push("HistoryOrders");

        return;
      }

      this.resetOrdersState();
      this.resetBuilderState();
      this.ordersInit();
      this.builerInit();
      this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>
