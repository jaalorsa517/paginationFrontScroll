<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import cardPokemon from "./Card.vue";

const uri = "https://pokeapi.co/api/v2/pokemon/";
const limit = 20;
let pokemons = ref(Array.from({ length: 20 }, (v, i) => ({ id: "", name: "", img: "", types: "" })));
let page = ref(0);
let hasMore = ref(false);
let isLoading = ref(false);

const getSkip = (_page) => _page * limit;

async function fetchPokemons(_page) {
  isLoading.value = true;
  const response = await fetch(`${uri}?limit=${limit}&offset=${getSkip(_page)}`);
  const pokemonsRaw = await response.json();
  hasMore.value = pokemonsRaw.count > getSkip(_page);
  const result = await Promise.all(
    pokemonsRaw.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonRaw = await response.json();
      return {
        id: pokemonRaw.id,
        name: pokemonRaw.name,
        img: pokemonRaw.sprites.other["official-artwork"].front_default,
        type: pokemonRaw.types[0].type.name,
      };
    })
  );
  isLoading.value = false;
  return result;
}

async function moreData() {
  page.value++;
  const newPokemons = await fetchPokemons(page.value);
  pokemons.value = [...pokemons.value, ...newPokemons];
}

function scrolling({ target }) {
  const { scrollingElement } = target;
  const gap = 60;
  if (scrollingElement.scrollTop + scrollingElement.clientHeight + gap >= scrollingElement.scrollHeight) {
    const button = document.querySelector(".click__button");
    button?.click();
  }
}

onBeforeMount(async () => {
  pokemons.value = await fetchPokemons(page.value);
});

onMounted(() => {
  window.addEventListener("scroll", scrolling);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrolling);
});
</script>

<template>
  <h2 class="app__title">Los pokemons</h2>
  <div class="app__view">
    <cardPokemon v-for="pokemon in pokemons" :key="pokemon.name" :info="pokemon" />
  </div>
  <div class="app__container">
    <div class="spinner" v-if="isLoading"></div>
    <a href="" class="click__button app__more" v-if="hasMore && !isLoading" @click.prevent="moreData">Ver más</a>
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
