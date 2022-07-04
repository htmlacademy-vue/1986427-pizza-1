<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="item in dough"
          :key="`item-${item.id}`"
          @changeRadio="doughHandler"
          :value="item.id"
          :checked="item.id === defaultDough"
          :classes="`dough__input dough__input--${getDoughType(item.id)}`"
          name="dought"
        >
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton";
import { defaultDough } from "@/static/constants";

export default {
  name: "BuilderDoughSelector",
  props: {
    ingredients: {
      type: Array,
      require: true,
    },
    dough: {
      type: Array,
      require: true,
    },
  },
  components: {
    RadioButton,
  },
  data() {
    return {
      defaultDough,
    };
  },
  methods: {
    getDoughType(type) {
      const types = { 1: "light", 2: "large" };

      return types[type] || "";
    },
    doughHandler(value) {
      this.$emit("getDoughType", value);
    },
  },
};
</script>
