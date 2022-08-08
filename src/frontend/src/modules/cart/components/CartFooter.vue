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
import { mapActions, mapGetters } from "vuex";
import { ADDRESS_NEW_DELIVERY } from "@/static/constants";
export default {
  name: "CartFooter",
  props: {
    addresses: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters("Orders", ["issetOrder", "getTotalSum"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("Orders", ["setAddress"]),
    completeOrder() {
      const { street, building, flat, selectedAddress } = this.addresses;
      if (
        selectedAddress === ADDRESS_NEW_DELIVERY &&
        (!street.length || !building.length)
      ) {
        return;
      }

      if (!this.issetOrder) {
        return;
      }
      //если выбрал самовывоз, то ставим пустые
      this.setAddress({
        street: street || "",
        building: building || "",
        flat,
      });
      this.$emit("setOrderComplete", true);
    },
  },
};
</script>

<style scoped></style>
