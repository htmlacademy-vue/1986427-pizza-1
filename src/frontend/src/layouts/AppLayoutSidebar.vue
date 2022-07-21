<template>
  <div class="layout__sidebar sidebar">
    <router-link :to="{ name: 'IndexHome' }" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      active-class="layout__link--active"
      :to="{ name: 'Orders' }"
      class="layout__link"
      >История заказов
    </router-link>
    <router-link
      :to="{ name: 'Profile' }"
      active-class="layout__link--active"
      class="layout__link"
      >Мои данные
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutDefault",
};
</script>
