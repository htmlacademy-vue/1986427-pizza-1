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
            <input
              type="text"
              name="street"
              v-model.trim="street"
              @input="
                updateAddressEntity({
                  name: 'street',
                  value: $event.target.value,
                })
              "
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              v-model.trim="building"
              @input="
                updateAddressEntity({
                  name: 'building',
                  value: $event.target.value,
                })
              "
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              v-model.trim="flat"
              @input="
                updateAddressEntity({
                  name: 'flat',
                  value: $event.target.value,
                })
              "
              :disabled="isDisabled"
            />
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
      availableAddress: [],
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },
  async created() {
    this.availableAddress = this.address;
    if (this.user) {
      const userAddresses = await this.$api.addresses.query();
      this.availableAddress = [...this.address, ...userAddresses].map(
        (address, index) => ({
          name: address.name,
          street: address?.street || "",
          building: address?.building || "",
          flat: address?.flat || "",
          id: index + 1,
        })
      );
    }
  },
  watch: {
    selectedAddress(newAddress) {
      if (newAddress <= this.ADDRESS_NEW_DELIVERY) {
        this.clear();
      }
      if (newAddress >= this.ADDRESS_HOME_DELIVERY) {
        this.setOrderAddress();
      }
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Orders", ["userAddress"]),
    showAddress() {
      return this.selectedAddress !== ADDRESS_SELF_DELIVERY;
    },
    isDisabled() {
      return this.selectedAddress > 2;
    },
  },
  methods: {
    clear() {
      const clearAddress = [
        { name: "street", value: " " },
        { name: "building", value: " " },
        { name: "flat", value: " " },
        { name: "comment", value: " " },
        { name: "userPhone", value: " " },
      ];

      this.setAddress(clearAddress);
    },
    setOrderAddress() {
      const { street, building, flat } = this.availableAddress.find(
        (address) => address.id === this.selectedAddress
      );
      const curAddress = [
        { name: "street", value: street },
        { name: "building", value: building },
        { name: "flat", value: flat },
      ];

      this.setAddress(curAddress);
    },
    setAddress(data) {
      data.forEach((field) => {
        this[field.name] = field.value;
        this.updateAddressEntity(field);
      });
    },
    updateAddressEntity(data) {
      this.$emit("updateAddressEntity", data);
    },
  },
};
</script>

<style scoped></style>
