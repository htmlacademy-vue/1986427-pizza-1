<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="sauce in sauces"
            :key="`sauce-${sauce.id}`"
            @changeRadio="sauceHandler"
            :value="sauce.id"
            class="radio ingredients__input"
            name="sauce"
            :checked="sauce.id === DEFAULT_SAUCE"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="`ingredient-${ingredient.id}`"
              class="ingredients__item"
            >
              <AppDrag
                :transferData="ingredient"
                :isDraggable="!isDisabled(ingredient.id)"
              >
                <span
                  :class="`filling filling--${ingredientsNames[ingredient.id]}`"
                >
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <itemCounter
                :ingredient="ingredient.id"
                :disabled="isDisabled(ingredient.id)"
                :value="getCount(ingredient.id)"
                :userSelectedIngredients="userSelectedIngredients"
                @countHandler="countHandler"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import { DEFAULT_SAUCE } from "@/static/constants";
import { ingredientsNames } from "@/static/mapper";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredients: {
      type: Array,
      require: true,
    },
    userSelectedIngredients: {
      type: Object,
      require: true,
    },
    sauces: {
      type: Array,
      require: true,
    },
  },
  components: {
    AppDrag,
    ItemCounter,
    RadioButton,
  },
  data() {
    return {
      DEFAULT_SAUCE,
      ingredientsNames,
    };
  },
  methods: {
    sauceHandler(value) {
      this.$emit("getSauce", value);
    },
    countHandler(value) {
      this.$emit("getIngredients", value);
    },
    getCount(id) {
      if (Object.keys(this.userSelectedIngredients).length === 0) {
        return 0;
      }
      if (this.userSelectedIngredients[id]) {
        return this.userSelectedIngredients[id].count;
      }
      return 0;
    },
    isDisabled(id) {
      if (Object.keys(this.userSelectedIngredients).length === 0) {
        return false;
      }

      if (
        this.userSelectedIngredients[id] &&
        this.userSelectedIngredients[id].count > 2
      ) {
        return true;
      }

      return (
        Object.keys(this.userSelectedIngredients).length > 2 &&
        this.userSelectedIngredients[id] === undefined
      );
    },
  },
};
</script>
