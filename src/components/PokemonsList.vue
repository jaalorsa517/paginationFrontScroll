<script setup>
import { onBeforeMount, provide } from "vue";
import cardPokemon from "@/components/Card.vue";
import { usePokemon } from "@/store/usePokemon.store";
import { J5VIcons } from "@jaalorsa/j5-components-vue"

const pokemonStore = usePokemon();

onBeforeMount(() => {
  if (pokemonStore.pokemons.length <= 20) pokemonStore.firtsFetchPokemons();
});

</script>

<template>
  <h2 class="app__title">Pokemon</h2>
  <div class="app__filter">
    <div class="app__filterItem">
      <J5VIcons name="find" />
      <span>Buscar</span>
    </div>
    <div class="app__filterItem">
      <J5VIcons name="filter" />
      <span>Filtrar</span>
    </div>
  </div>

  <div class="app__view">
    <cardPokemon v-for="pokemon in pokemonStore.pokemons" :key="pokemon.name" :info="pokemon" />
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
    justify-content: center;
    gap: 5px;
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s ease;
    &:hover{
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
