<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layouts = this.$route.meta?.layout || "AppLayoutDefault";

      return () => import(`@/layouts/${layouts}.vue`);
    },
  },
};
</script>
