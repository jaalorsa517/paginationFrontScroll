export function pokemonCardDto(pokemonRaw) {
  return {
    id: pokemonRaw.id || "",
    name: pokemonRaw.name || "",
    img: pokemonRaw.sprites.other["official-artwork"].front_default || "",
    types: pokemonRaw.types?.map((type) => type.type.name) || [],
    type: pokemonRaw.types[0].type.name || "",
    height: pokemonRaw.height || "",
    weight: pokemonRaw.weight || "",
    speciesUrl: pokemonRaw.species.url || "",
  };
}

export function pokemonCardDtoDefault() {
  return pokemonCardDto({});
}

export function pokemonSpecieDTO(pokemonRaw) {
  const featuresRaw =
    pokemonRaw.flavor_text_entries
      .filter((text) => text.language.name === "es")
      .map((text) => text.flavor_text) || [];
  const features = Array.from(new Set(featuresRaw));

  return {
    genera: pokemonRaw.genera?.find((genus) => genus.language.name === "es")?.genus || "",
    evolution: pokemonRaw.evolution_chain.url || "",
    is_legendary: pokemonRaw.is_legendary || "",
    is_baby: pokemonRaw.is_baby || "",
    is_mythical: pokemonRaw.is_mythical || "",
    features,
  };
}

function getId(url) {
  return url.match(/[^\/][^\W](\d+)/g)?.at(0);
}

function getEvolution({ species, evolves_to }) {
  const evolutions = evolves_to.map((evolve) => {
    return getEvolution(evolve);
  });
  const id = getId(species.url);
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return { name: species.name, url, evolutions };
}

export function pokemonEvolutionDTO(pokemonRaw) {
  return getEvolution(pokemonRaw.chain);
}
