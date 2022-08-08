<template>
  <component :is="layout">
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </component>
</template>

<script>
const defaultLayout = () => import("@/layouts/AppLayoutDefault.vue");

export default {
  name: "AppLayout",
  computed: {
    layout() {
      return this.$route.meta?.layout || defaultLayout;
    },
  },
};
</script>
