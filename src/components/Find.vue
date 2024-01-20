<script setup>
import { ref } from "vue"
import { J5VIcons } from "@jaalorsa/j5-components-vue"
import { J5VDatalist } from "@jaalorsa/j5-components-vue"
import WrapperFull from "./WrapperFull.vue";

const isOpen = ref(false);

</script>
<template>
  <div class="find">

    <div class="find__item app__filterItem" @click="isOpen = true">
      <J5VIcons name="find" />
      <span>Buscar</span>
    </div>
    <WrapperFull :is-open="isOpen" title="Buscar Pokemon" @close="isOpen = false">

      <div class="find__search">
        <J5VDatalist :has-icon="true" />
      </div>
    </WrapperFull>


  </div>
</template>
<style lang="scss">
.find {}
</style>