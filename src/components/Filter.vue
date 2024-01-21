<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { J5VIcons } from "@jaalorsa/j5-components-vue"
import WrapperFull from "./WrapperFull.vue";
import { langagueES, colorsType, langagueESInvertido } from "@/js/dictionary";

const props = defineProps({
  hasFilter: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false);
const router = useRouter();

const types = Object.keys(colorsType).filter((type) => type !== "undefined");

function translateType(type) {
  return langagueES[type];
}

function onSelected({ target }) {
  const { innerText } = target
  const typeTranslated = langagueESInvertido[innerText]
  router.push({ name: "Home", query: { type: typeTranslated } })
  isOpen.value = false
}

function onFilter(){
  if(!props.hasFilter){
    isOpen.value = true
    return
  }
  router.push({ name: "Home", query: {} })
  isOpen.value = false
}

</script>
<template>
  <div class="filter">
    <div :class="{ filter__item: true, app__filterItem: true, 'filter__item--active': hasFilter }" @click="onFilter">
      <J5VIcons name="filter" />
      <span v-if="!props.hasFilter">Filtrar</span>
      <span v-else>Limpiar Filtro</span>
    </div>
    <WrapperFull :is-open="isOpen" title="Filtrar Pokemon" @close="isOpen = false">
      <div class="filter__content">
        <ul class="filter__types" @click="onSelected">
          <li class="filter__type" v-for="(type, index) in types" :key="index" :type="type">
            {{ translateType(type) }}
          </li>
        </ul>
      </div>
    </WrapperFull>
  </div>
</template>
<style lang="scss">
.filter {
  &__types {
    max-width: 768px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 2em auto;
  }

  &__type {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2;
    cursor: pointer;
  }

  &__item {
    &--active {
      color: var(--color-primary)
    }
  }
}
</style>