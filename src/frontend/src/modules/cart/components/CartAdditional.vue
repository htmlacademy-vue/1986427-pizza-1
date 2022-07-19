<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li
        v-for="item in misc"
        :key="`additional-list__item-${item.id}`"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img :src="item.image" width="39" height="60" :alt="`${item.name}`" />
          <span> {{ item.name }} </span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            :itemId="item.id"
            :value="getCount(item)"
            :disabled="isDisabled(item)"
            @countHandler="countHandler"
            class="additional-list__counter"
            modificatorRightBtn="counter__button--orange"
          />

          <div class="additional-list__price">
            <b>× {{ item.price }} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { isDisabled, getCount } from "@/static/helper";
import ItemCounter from "@/common/components/ItemCounter";
export default {
  name: "CartAdditional",
  computed: {
    ...mapState("Orders", ["misc"]),
    ...mapGetters("Orders", ["getAdditionalGoods"]),
  },
  components: {
    ItemCounter,
  },
  methods: {
    ...mapActions("Orders", ["setCountAdditionalGoods"]),
    getCount,
    isDisabled,
    countHandler(value) {
      this.setCountAdditionalGoods(value);
    },
  },
};
</script>

<style scoped></style>
