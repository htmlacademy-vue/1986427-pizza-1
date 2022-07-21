<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ issetOrder ? getTotalSum : 0 }} ₽</router-link>
    </div>
    <div v-if="user" class="header__user">
      <router-link to="/profile">
        <img :src="user.avatar" :alt="user.name" width="32" height="32" />
        <span>{{ user.name }}</span>
      </router-link>
      <a @click="logoutHandler" class="header__logout">
        <span>Выйти</span>
      </a>
    </div>
    <div v-else class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppLayoutHeader",
  data() {
    return {
      isAuth: true,
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Orders", ["issetOrder", "getTotalSum"]),
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    logoutHandler() {
      this.logout();
      this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>
