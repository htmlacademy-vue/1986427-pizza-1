<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>
    <div v-if="addresses && addresses.length" class="layout__address">
      <div
        v-for="address in addresses"
        :key="`address${address.id}`"
        class="sheet address-form"
      >
        <div class="address-form__header">
          <b>{{ address.name }}</b>
          <div class="address-form__edit">
            <button @click="editAddress(address.id)" type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>
          {{ address.street }}, д. {{ address.building }},
          <template v-if="address.flat"> кв. {{ address.flat }} </template>
        </p>
        <small v-if="address.comment">{{ address.comment }}</small>
      </div>
    </div>

    <div v-if="showForm" class="layout__address">
      <form class="address-form address-form--opened sheet">
        <div class="address-form__header">
          <b>{{ name }} </b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
                v-model.trim="name"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
                v-model.trim="street"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
                v-model.number="building"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
                required
                v-model.number="flat"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
                v-model.trim="comment"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            v-if="editableId"
            @click="deleteAddress(editableId)"
            type="button"
            class="button button--transparent"
          >
            Удалить
          </button>
          <button @click="saveAddress" type="submit" class="button">
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button @click="addAddresses" type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState("Auth", ["user"]),
  },
  data() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      addresses: [],
      showForm: false,
      editableId: null,
    };
  },
  async created() {
    await this.getAddress();
  },
  methods: {
    clearData() {
      this.name = "";
      this.street = "";
      this.building = "";
      this.flat = "";
      this.comment = "";
      this.editableId = null;
    },
    async deleteAddress(id) {
      await this.$api.addresses.delete(id);
      this.clearData();
      this.showForm = false;
      await this.getAddress();
    },
    editAddress(id) {
      const curAddress = this.addresses.find((el) => el.id === id);

      this.showForm = true;
      this.editableId = id;

      this.name = curAddress.name;
      this.street = curAddress.street;
      this.flat = curAddress.flat;
      this.building = curAddress.building;
      this.comment = curAddress.comment;
    },
    async saveAddress() {
      if (!this.name || !this.street || !this.building) {
        return;
      }
      const commonData = {
        name: this.name,
        userId: this.user.id,
        street: this.street,
        flat: this.flat,
        building: this.building,
        comment: this.comment,
      };

      if (this.editableId) {
        this.$api.addresses.put(
          Object.assign(commonData, { id: this.editableId })
        );
      } else {
        await this.$api.addresses.post(commonData);
      }
      await this.getAddress();
      this.showForm = false;
      this.editableId = null;
    },
    async getAddress() {
      this.addresses = await this.$api.addresses.query();
    },
    addAddresses() {
      this.clearData();
      this.showForm = true;
    },
  },
};
</script>
