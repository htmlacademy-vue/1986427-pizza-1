<template>
  <form action="/" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <template v-if="issetOrder">
          <CartProductList />
          <CartAdditional />
          <CartOrderAddress />
        </template>
        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>
    <CartFooter />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/components/CartFooter";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartProductList from "@/modules/cart/components/CartProductList";
import CartOrderAddress from "@/modules/cart/components/CartOrderAddress";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartFooter,
    CartAdditional,
    CartProductList,
    CartOrderAddress,
  },
  computed: {
    ...mapState("Orders", ["userOrder"]),
    ...mapGetters("Orders", ["issetOrder"]),
  },
};
</script>

<style scoped></style>
