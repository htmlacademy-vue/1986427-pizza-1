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
          <CartOrderAddress @updateAddressEntity="updateAddressEntityHandler" />
        </template>
        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>
    <CartFooter
      @setOrderComplete="showPopupHandler"
      :addresses="addressValues"
    />
    <transition name="order-complete">
      <CartOrderComplete v-if="showPopup" @close="showPopupHandler" />
    </transition>
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/components/CartFooter";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartProductList from "@/modules/cart/components/CartProductList";
import CartOrderAddress from "@/modules/cart/components/CartOrderAddress";
import CartOrderComplete from "@/modules/cart/components/CartOrderComplete";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartFooter,
    CartAdditional,
    CartProductList,
    CartOrderAddress,
    CartOrderComplete,
  },
  data() {
    return {
      showPopup: false,
      addressValues: {
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  computed: {
    ...mapState("Orders", ["userOrder"]),
    ...mapGetters("Orders", ["issetOrder"]),
  },
  methods: {
    updateAddressEntityHandler(params) {
      const { name, value } = params;
      this.addressValues[name] = value;
    },
    showPopupHandler(show) {
      this.showPopup = show;
    },
  },
};
</script>

<style scoped></style>
