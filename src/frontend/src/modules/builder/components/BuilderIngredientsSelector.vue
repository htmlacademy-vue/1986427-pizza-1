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
          <transition-group class="ingredients__list" name="fade" tag="ul">
            <li
              v-for="ingredient in ingredients"
              :key="`ingredient-${ingredient.id}`"
              class="ingredients__item"
            >
              <AppDrag
                :transferData="ingredient"
                :isDraggable="
                  !isDisabled(ingredient.id, getUserSelectedIngredients)
                "
              >
                <span
                  :class="`filling filling--${
                    ingredientsClassNames[ingredient.id]
                  }`"
                >
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <itemCounter
                class="counter--orange ingredients__counter"
                :itemId="ingredient.id"
                :disabled="
                  isDisabled(ingredient.id, getUserSelectedIngredients)
                "
                :value="getCount(ingredient.id, getUserSelectedIngredients)"
                @countHandler="countHandler"
              />
            </li>
          </transition-group>
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
import { ingredientsClassNames } from "@/static/mapper";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    ItemCounter,
    RadioButton,
  },
  data() {
    return {
      DEFAULT_SAUCE,
      ingredientsClassNames,
    };
  },
  computed: {
    ...mapState("Builder", ["sauces", "ingredients"]),
    ...mapGetters("Builder", ["getUserSelectedIngredients"]),
  },
  methods: {
    ...mapActions("Builder", ["setSauce", "updateIngredients", "setPrice"]),
    sauceHandler(value) {
      this.setSauce(value);
    },
    countHandler(value) {
      this.updateIngredients(value);
    },
    getCount(id) {
      if (this.getUserSelectedIngredients.length === 0) {
        return 0;
      }

      const curItem = this.getUserSelectedIngredients.find(
        (item) => item.ingredientId === id
      );

      if (curItem) {
        return curItem.quantity;
      }

      return 0;
    },
    isDisabled(id) {
      if (this.getUserSelectedIngredients.length === 0) {
        return false;
      }

      const curItem = this.getUserSelectedIngredients.find(
        (item) => item.ingredientId === id
      );
      if (curItem?.quantity > 2) {
        return true;
      }

      return (
        this.getUserSelectedIngredients.length > 2 && curItem === undefined
      );
    },
  },
};
</script>
