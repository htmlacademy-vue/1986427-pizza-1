<template>
  <component
    @updateOrder="updateOrderHandler"
    :is="layout"
    :userOrder="userOrder"
  >
    <router-view @updateOrder="updateOrderHandler" />
  </component>
</template>

<script>
export default {
  name: "AppLayout",
  data() {
    return {
      userOrder: {},
    };
  },
  computed: {
    layout() {
      const layouts = this.$route.meta.layout || "AppLayoutDefault";

      return () => import(`@/layouts/${layouts}.vue`);
    },
  },
  methods: {
    updateOrderHandler(order) {
      this.userOrder = order;
    },
  },
};
</script>
