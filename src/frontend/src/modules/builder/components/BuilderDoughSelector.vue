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
          :checked="item.id === DEFAULT_DOUGH"
          :class="`dough__input dough__input--${getDoughType(item.id)}`"
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
import { DEFAULT_DOUGH } from "@/static/constants";
import { pizzaDoughType } from "@/static/mapper";
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  data() {
    return {
      DEFAULT_DOUGH,
      pizzaDoughType,
    };
  },
  computed: {
    ...mapState("Builder", ["dough", "ingredients"]),
  },
  methods: {
    ...mapActions("Builder", ["setDough"]),
    getDoughType(type) {
      return pizzaDoughType[type] || "";
    },
    doughHandler(value) {
      this.setDough(value);
    },
  },
};
</script>
