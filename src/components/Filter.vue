<script setup>
import { ref } from "vue"
import { J5VIcons } from "@jaalorsa/j5-components-vue"
import WrapperFull from "./WrapperFull.vue";
import { langagueES } from "@/js/dictionary";

const isOpen = ref(false);

function translateType(type) {
  return langagueES[type];
}

</script>
<template>
  <div class="filter">
    <div class="filter__item app__filterItem" @click="isOpen = true">
      <J5VIcons name="filter" />
      <span>Filtrar</span>
    </div>
    <WrapperFull :is-open="isOpen" @close="isOpen = false">
      <ul class="filter__types">
          <li class="filter__type" v-for="(type, index) in pokemon.info.types" :key="index" :type="type">
            {{ translateType(type) }}
          </li>
        </ul>
    </WrapperFull>
  </div>
</template>
<style lang="scss">
.filter {
  &__item {}
}
</style>