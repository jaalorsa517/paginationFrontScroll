import { defineStore } from "pinia";
import { pokemonCardDtoDefault } from "@/shared/serializers/pokemon.dto";
import {
  getPokemonsInfo,
  getSkip,
  getPokemonsRaw,
  getPokemonType,
} from "@/shared/services/Pokemon.service";

export const usePokemon = defineStore("pokemons", {
  state: () => ({
    pokemons: Array.from({ length: 20 }, (v, i) => pokemonCardDtoDefault),
    pokemon: null,
    page: 0,
    hasMore: false,
    isLoading: false,
  }),
  getters: {
    getpokemons() {
      return this.pokemons;
    },
  },
  actions: {
    async moreData() {
      this.page++;
      await this.fetchPokemons();
    },
    async firtsFetchPokemons() {
      this.page = 0;
      this.pokemons.splice(0);
      await this.fetchPokemons();
    },
    async fetchPokemons() {
      try {
        this.isLoading = true;
        const pokemonsRaw = await getPokemonsRaw({ page: this.page });
        this.hasMore = pokemonsRaw.count > getSkip(this.page);
        const promisesGetPokemon = await getPokemonsInfo({
          urls: pokemonsRaw.results,
        });
        this.isLoading = false;
        this.pokemons.push(...promisesGetPokemon);
      } catch (error) {
        this.isLoading = false;
        return [];
      }
    },
    async fetchTypes(type) {
      try {
        this.pokemons.splice(0);
        this.isLoading = true;
        const pokemonsRaw = await getPokemonType({ type });
        const promisesGetPokemon = await getPokemonsInfo({ urls: pokemonsRaw });
        this.isLoading = false;
        this.hasMore = false;
        this.pokemons.push(...promisesGetPokemon);
      } catch (error) {
        this.isLoading = false;
        this.pokemons = [];
      }
    },
  },
});
