<script setup>
import { onBeforeMount, watch } from "vue";
import cardPokemon from "@/components/Card.vue";
import { usePokemon } from "@/store/usePokemon.store";
import Filter from "@/components/Filter.vue"
import Find from "@/components/Find.vue"

const props = defineProps({
  query: {
    type: String,
    default: "",
  },
});

const pokemonStore = usePokemon();

watch(()=>props.query, (value) => {
  if(value){
    pokemonStore.fetchTypes(value)
    return
  }
  pokemonStore.firtsFetchPokemons();
})

onBeforeMount(() => {
  if(props.query){
    pokemonStore.fetchTypes(props.query)
    return
  }
  if (pokemonStore.pokemons.length <= 20) pokemonStore.firtsFetchPokemons();
});

</script>

<template>
  <div class="app__header">
    <h2 class="app__title">Pokemon</h2>
    <div class="app__filter">
      <Find />
      <Filter :hasFilter="Boolean(props.query)"/>
    </div>
  </div>

  <div class="app__view">
    <cardPokemon v-for="pokemon in pokemonStore.getpokemons" :key="pokemon.name" :info="pokemon" />
  </div>
  <div class="app__container">
    <div class="spinner" v-if="pokemonStore.isLoading"></div>
    <a href="" class="click__button app__more" v-if="pokemonStore.hasMore && !pokemonStore.isLoading"
      @click.prevent="pokemonStore.moreData">
      Ver más
    </a>
  </div>
</template>

<style lang="scss">
.app {
  &__header{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: var(--color-white);
    box-shadow: 1px 1px var(--color-gray-light);
    z-index: 200;
  }

  &__view {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
  }

  &__title {
    margin: 10px 0;
    text-align: center;
    font-size: 2rem;
    text-transform: uppercase;
  }

  &__filter {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__filterItem {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }

    & .j5v-icons {
      width: 20px;
      display: block;
    }
  }

  &__container {
    min-height: 25px;
    margin: 15px auto;
    text-align: center;
    position: relative;
  }

  &__more {
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
  }

  &__more:hover {
    text-decoration: underline;
  }

  &__more,
  &__more:active {
    color: rgb(2, 139, 59);
  }
}
</style>
