import { pokemonCardDto, pokemonEvolutionDTO, pokemonSpecieDTO } from "@/shared/serializers/pokemon.dto";
import { httpGet } from "@/shared/services/Http.services";

// evolution-chain/

const uri = "https://pokeapi.co/api/v2";
const limit = 20;

export function getSkip(page) {
  return page * limit;
}

export async function getPokemonsRaw({ page = 0 } = {}) {
  const url = `${uri}/pokemon?limit=${limit}&offset=${getSkip(page)}`;
  const response = await httpGet(url);
  return response;
}

export async function getPokemonInfo({ url, id }) {
  if (url || id) {
    const _url = url || `${uri}/pokemon/${id}`;
    const pokemonRaw = await httpGet(_url);
    return pokemonCardDto(pokemonRaw);
  }
  return {};
}

export async function getPokemonsInfo({ urls = [] } = {}) {
  const pokemonsPromise = urls.map(getPokemonInfo);
  const response = await Promise.all(pokemonsPromise);
  return response;
}

export async function getSpecie({ url }) {
  const specieRaw = await httpGet(url);
  return pokemonSpecieDTO(specieRaw);
}

export async function getEvolution({ url }) {
  const evolution = await httpGet(url);
  return pokemonEvolutionDTO(evolution);
}
