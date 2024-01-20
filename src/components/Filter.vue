<script setup>
import { ref } from "vue"
import { J5VIcons } from "@jaalorsa/j5-components-vue"
import WrapperFull from "./WrapperFull.vue";

const isOpen = ref(false);

</script>
<template>
  <div class="filter">
    <div class="filter__item app__filterItem" @click="isOpen = true">
      <J5VIcons name="filter" />
      <span>Filtrar</span>
    </div>
    <WrapperFull :is-open="isOpen" @close="isOpen = false">

    </WrapperFull>
  </div>
</template>
<style lang="scss">
.filter {
  &__item {}
}
</style>