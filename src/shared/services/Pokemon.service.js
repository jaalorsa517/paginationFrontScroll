import { pokemonCardDto } from "../serializers/pokemon.dto";
import { httpGet } from "./Http.services";

const uri = "https://pokeapi.co/api/v2/pokemon/";
const limit = 20;

export function getSkip(page) {
  return page * limit;
}

export async function getPokemonsRaw({ page = 0 } = {}) {
  const url = `${uri}?limit=${limit}&offset=${getSkip(page)}`;
  const response = await httpGet(url);
  return response;
}

export async function getPokemonsInfo({ urls = [] } = {}) {
  const pokemonsPromise = urls.map(async ({ url }) => {
    const pokemonRaw = await httpGet(url);
    return pokemonCardDto(pokemonRaw);
  });
  const response = await Promise.all(pokemonsPromise);
  return response;
}
