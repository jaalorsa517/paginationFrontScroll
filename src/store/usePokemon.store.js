import { defineStore } from "pinia";
import { pokemonCardDtoDefault } from "../shared/serializers/pokemon.dto";
import { getPokemonsInfo, getSkip, getPokemonsRaw } from "../shared/services/Pokemon.service";

export const usePokemon = defineStore("pokemons", {
  state: () => ({
    pokemons: Array.from({ length: 20 }, (v, i) => pokemonCardDtoDefault),
    pokemon: null,
    page: 0,
    hasMore: false,
    isLoading: false,
  }),
  actions: {
    async moreData() {
      this.page++;
      await this.fetchPokemons();
    },
    async firtsFetchPokemons() {
      this.page = 0;
      this.pokemons = [];
      await this.fetchPokemons();
    },
    async fetchPokemons() {
      try {
        this.isLoading = true;
        const pokemonsRaw = await getPokemonsRaw({ page: this.page });
        this.hasMore = pokemonsRaw.count > getSkip(this.page);
        const promisesGetPokemon = await getPokemonsInfo({ urls: pokemonsRaw.results });
        this.isLoading = false;
        this.pokemons = [...this.pokemons, ...promisesGetPokemon];
      } catch (error) {
        this.isLoading = false;
        return [];
      }
    },
  },
});
