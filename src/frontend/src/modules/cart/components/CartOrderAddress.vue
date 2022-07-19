<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="selectedAddress">
          <option
            v-for="address in availableAddress"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="userPhone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
        />
      </label>

      <div v-if="showAddress" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { address } from "@/static/mapper";
import {
  ADDRESS_SELF_DELIVERY,
  ADDRESS_NEW_DELIVERY,
  ADDRESS_HOME_DELIVERY,
} from "@/static/constants";
export default {
  name: "CartOrderAddress",
  data() {
    return {
      address,
      ADDRESS_SELF_DELIVERY,
      ADDRESS_NEW_DELIVERY,
      ADDRESS_HOME_DELIVERY,
      userPhone: "",
      selectedAddress: ADDRESS_SELF_DELIVERY,
    };
  },
  computed: {
    ...mapState("Auth", ["isAuth"]),
    showAddress() {
      return this.selectedAddress !== ADDRESS_SELF_DELIVERY;
    },
    availableAddress() {
      return address.filter(
        (value) =>
          (value.id !== ADDRESS_HOME_DELIVERY && !this.isAuth) || this.isAuth
      );
    },
  },
};
</script>

<style scoped></style>
