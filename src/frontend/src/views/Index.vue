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
      <header class="header">
        <div class="header__logo">
          <a href="/index.html" class="logo">
            <img
              src="img/logo.svg"
              alt="V!U!E! Pizza logo"
              width="90"
              height="40"
            />
          </a>
        </div>
        <div class="header__cart">
          <a href="cart.html">0 ₽</a>
        </div>
        <div class="header__user">
          <a href="#" class="header__login"><span>Войти</span></a>
        </div>
      </header>

      <main class="content">
        <form action="#" method="post">
          <div class="content__wrapper">
            <h1 class="title title--big">Конструктор пиццы</h1>

            <div class="content__dough">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите тесто</h2>

                <div class="sheet__content dough">
                  <label
                    v-for="item in dough"
                    :key="`item-${item.id}`"
                    :class="`dough__input dough__input--${getDoughType(
                      item.id
                    )}`"
                  >
                    <input
                      type="radio"
                      name="dought"
                      :value="getDoughType(item.id)"
                      class="visually-hidden"
                      :checked="item.id === defaultDough"
                    />
                    <b>{{ item.name }}</b>
                    <span>{{ item.description }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__diameter">
              <div class="sheet">
                <h2 class="title title--small sheet__title">Выберите размер</h2>

                <div class="sheet__content diameter">
                  <label
                    v-for="size in sizes"
                    :key="`size-${size.id}`"
                    :class="`diameter__input diameter__input--${getSize(
                      size.id
                    )}`"
                  >
                    <input
                      type="radio"
                      name="diameter"
                      :value="getSize(size.id)"
                      class="visually-hidden"
                      :checked="size.id === defaultSize"
                    />
                    <span>{{ size.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="content__ingredients">
              <div class="sheet">
                <h2 class="title title--small sheet__title">
                  Выберите ингредиенты
                </h2>

                <div class="sheet__content ingredients">
                  <div class="ingredients__sauce">
                    <p>Основной соус:</p>

                    <label
                      v-for="sauce in sauces"
                      :key="`sauce-${sauce.id}`"
                      class="radio ingredients__input"
                    >
                      <input
                        type="radio"
                        name="sauce"
                        :value="getSauceName(sauce.id)"
                        checked
                      />
                      <span>{{ sauce.name }}</span>
                    </label>
                  </div>

                  <div class="ingredients__filling">
                    <p>Начинка:</p>

                    <ul class="ingredients__list">
                      <li
                        v-for="ingredient in ingredients"
                        :key="`ingredient-${ingredient.id}`"
                        class="ingredients__item"
                      >
                        <span
                          :class="`filling filling--${getIngredientsName(
                            ingredient.id
                          )}`"
                        >
                          {{ ingredient.name }}
                        </span>

                        <div
                          class="counter counter--orange ingredients__counter"
                        >
                          <button
                            type="button"
                            class="counter__button counter__button--minus"
                            disabled
                          >
                            <span class="visually-hidden">Меньше</span>
                          </button>
                          <input
                            type="text"
                            name="counter"
                            class="counter__input"
                            value="0"
                          />
                          <button
                            type="button"
                            class="counter__button counter__button--plus"
                          >
                            <span class="visually-hidden">Больше</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="content__pizza">
              <label class="input">
                <span class="visually-hidden">Название пиццы</span>
                <input
                  type="text"
                  name="pizza_name"
                  placeholder="Введите название пиццы"
                />
              </label>

              <div class="content__constructor">
                <div class="pizza pizza--foundation--big-tomato">
                  <div class="pizza__wrapper">
                    <div class="pizza__filling pizza__filling--ananas"></div>
                    <div class="pizza__filling pizza__filling--bacon"></div>
                    <div class="pizza__filling pizza__filling--cheddar"></div>
                  </div>
                </div>
              </div>

              <div class="content__result">
                <p>Итого: 0 ₽</p>
                <button type="button" class="button" disabled>Готовьте!</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </body>
  </html>
</template>

<script>
import pizza from "@/static/pizza.json";

const defaultSize = 2;
const defaultDough = 1;

export default {
  name: "Index.vue",
  data() {
    return {
      defaultSize,
      defaultDough,
      ingredients: pizza.ingredients,
      sizes: pizza.sizes,
      dough: pizza.dough,
      sauces: pizza.sauces,
    };
  },
  methods: {
    getSize(size) {
      const sizes = { 1: "small", 2: "normal", 3: "big" };

      return sizes[size] || "";
    },
    getDoughType(type) {
      const types = { 1: "light", 2: "large" };

      return types[type] || "";
    },
    getSauceName(type) {
      const names = { 1: "tomato", 2: "creamy" };

      return names[type] || "";
    },
    getIngredientsName(type) {
      const names = {
        1: "mushrooms",
        2: "cheddar",
        3: "salami",
        4: "ham",
        5: "ananas",
        6: "bacon",
        7: "onion",
        8: "chile",
        9: "jalapeno",
        10: "olives",
        11: "tomatoes",
        12: "salmon",
        13: "mozzarella",
        14: "parmesan",
        15: "blue_cheese",
      };

      return names[type] || "";
    },
  },
};
</script>

<style scoped></style>
