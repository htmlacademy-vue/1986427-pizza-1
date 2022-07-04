<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="`size-${size.id}`"
          @changeRadio="sizeHandler"
          :value="size.id"
          :checked="size.id === defaultSize"
          :classes="`diameter__input diameter__input--${getSize(size.id)}`"
          name="diameter"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton";
import { defaultSize } from "@/static/constants";

export default {
  name: "BuilderSizeSelector",
  props: {
    sizes: {
      type: Array,
      require: true,
    },
  },
  components: {
    RadioButton,
  },
  data() {
    return {
      defaultSize,
    };
  },
  methods: {
    getSize(size) {
      const sizes = { 1: "small", 2: "normal", 3: "big" };

      return sizes[size] || "";
    },
    sizeHandler(value) {
      this.$emit("getSize", value);
    },
  },
};
</script>
