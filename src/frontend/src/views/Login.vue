<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @keypress.enter.prevent.stop.self="submit" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model.trim="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model.trim="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button @click.prevent="submit" type="submit" class="button">
        Авторизоваться
      </button>
    </form>
    <div v-if="issetError">
      <p v-for="(error, key) in errors" :key="`error-${key}`">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
        auth: "",
      },
    };
  },
  watch: {
    email(value) {
      this.email = value;
      this.errors["email"] = "";
      if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors["email"] = "не валидный имейл";
      }
    },
    password(value) {
      this.password = value;
      this.errors["password"] = "";
      if (this.password.length === 0) {
        this.errors["password"] = "Заполните поле пароль";
      }
    },
  },
  computed: {
    issetError() {
      return Object.values(this.errors).reduce((cur, next) => {
        cur += next.length;

        return cur;
      }, 0);
    },
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    async submit() {
      if (this.errors["email"] !== "" || this.errors["password"] !== "") {
        return false;
      }
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "IndexHome" });
      } catch (error) {
        this.errors["auth"] = error;
      }
    },
  },
};
</script>

<style scoped></style>
