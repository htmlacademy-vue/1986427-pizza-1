<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutSidebar />
      <transition name="slide" appear>
        <slot />
      </transition>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },
};
</script>
