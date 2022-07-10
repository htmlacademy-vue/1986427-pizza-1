<template>
  <div>
    <AppLayoutHeader :userOrder="userOrder" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutDefault",
  props: {
    userOrder: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AppLayoutHeader,
  },
};
</script>
