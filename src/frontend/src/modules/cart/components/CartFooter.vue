<template>
  <section class="footer">
    <div class="footer__more">
      <a href="#" class="button button--border button--arrow">Хочу еще одну</a>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ issetOrder ? getTotalSum : 0 }} ₽</b>
    </div>

    <div class="footer__submit">
      <button @click.prevent="completeOrder" type="submit" class="button">
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Orders", ["issetOrder", "getTotalSum"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    completeOrder() {
      this.$router.push({ name: "OrderComplete" });
    },
  },
};
</script>

<style scoped></style>
