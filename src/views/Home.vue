<script setup>
import PokemonsListVue from "@/components/PokemonsList.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router"

const route = useRoute()

const type = ref(route.query.type)

watch(()=> route.query.type, (value) => {
    type.value = value || ""
})

</script>

<template>
  <div class="app">
    <PokemonsListVue :query="type"/>
  </div>
</template>

