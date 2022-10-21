export function pokemonCardDto(pokemonRaw) {
  return {
    id: pokemonRaw.id || "",
    name: pokemonRaw.name || "",
    img: pokemonRaw.sprites.other["official-artwork"].front_default || "",
    type: pokemonRaw.types[0].type.name || "",
  };
}
