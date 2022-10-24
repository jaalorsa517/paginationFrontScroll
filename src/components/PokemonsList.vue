<script setup>
import { onBeforeMount } from "vue";
import cardPokemon from "@/components/Card.vue";
import { usePokemon } from "@/store/usePokemon.store";

const pokemonStore = usePokemon();

onBeforeMount( () => {
  pokemonStore.firtsFetchPokemons();
});
</script>

<template>
  <h2 class="app__title">Los pokemons</h2>
  <div class="app__view">
    <cardPokemon v-for="pokemon in pokemonStore.pokemons" :key="pokemon.name" :info="pokemon" />
  </div>
  <div class="app__container">
    <div class="spinner" v-if="pokemonStore.isLoading"></div>
    <a
      href=""
      class="click__button app__more"
      v-if="pokemonStore.hasMore && !pokemonStore.isLoading"
      @click.prevent="pokemonStore.moreData"
    >
      Ver más
    </a>
  </div>
</template>

<style>
.app__view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
}

.app__title {
  margin: 10px 0;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
}
.app__container {
  min-height: 25px;
  margin: 15px auto;
  text-align: center;
  position: relative;
}
.app__more {
  font-size: 1.2rem;
  text-decoration: none;
  cursor: pointer;
}
.app__more:hover {
  text-decoration: underline;
}
.app__more,
.app__more:active {
  color: rgb(2, 139, 59);
}
</style>
