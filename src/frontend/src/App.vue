<template>
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-bold.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/roboto-light.woff"
        as="font"
        type="font/woff"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="css/style.min.css" />
      <title>V!U!E! Pizza - главная</title>
    </head>
    <body>
      <div id="app">
        <AppLayout>
          <transition name="slide" mode="out-in" :appear="isAnimated">
            <router-view />
          </transition>
        </AppLayout>
      </div>
    </body>
  </html>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
export default {
  name: "App",
  components: {
    AppLayout,
  },
  computed: {
    isAnimated() {
      return this.$route.name !== "Login";
    },
  },
  async created() {
    await this.$store.dispatch("Builder/init");
    await this.$store.dispatch("Orders/init");
    if (this.$jwt.getToken()) {
      this.$api.auth.setAuthHeader();
      await this.$store.dispatch("Auth/setUser");
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
