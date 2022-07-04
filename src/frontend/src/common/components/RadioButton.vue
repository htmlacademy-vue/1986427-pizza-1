<template>
  <label :class="classes">
    <input
      @click="handleInput($event.target.value)"
      :name="name"
      :value="value"
      :checked="checked"
      type="radio"
      class="visually-hidden"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    classes: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("changeRadio", parseInt(value));
    },
  },
};
</script>
