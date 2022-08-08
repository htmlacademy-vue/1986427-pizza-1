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
<style>
.slither-enter-active,
.slither-leave-active {
  transition: transform 1s;
}

.slither-enter,
.slither-leave-to {
  transform: translateX(-100%);
}

.slither-enter-to,
.slither-leave {
  transform: translateX(0);
}
</style>
