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

export function pokemonEvolutionDTO(pokemonRaw) {
  return {};
}

/*
EVULUTION OBJECT

Togepit
{

    "baby_trigger_item": null,
    "chain": {
        "evolution_details": [ ],
        "evolves_to": [
            {
                "evolves_to": [
                    {
                        "evolves_to": [ ],
                        "is_baby": false,
                        "species": {
                            "name": "togekiss",
                            "url": "https://pokeapi.co/api/v2/pokemon-species/468/"
                        }
                    }
                ],
                "is_baby": false,
                "species": {
                    "name": "togetic",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/176/"
                }
            }
        ],
        "is_baby": true,
        "species": {
            "name": "togepi",
            "url": "https://pokeapi.co/api/v2/pokemon-species/175/"
        }
    },
    "id": 87

}

eevee

{

    "baby_trigger_item": null,
    "chain": {
        "evolution_details": [ ],
        "evolves_to": [
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "vaporeon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/134/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "jolteon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/135/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "flareon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/136/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "espeon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/196/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "umbreon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/197/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "leafeon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/470/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "glaceon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/471/"
                }
            },
            {
                "evolves_to": [ ],
                "is_baby": false,
                "species": {
                    "name": "sylveon",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/700/"
                }
            }
        ],
        "is_baby": false,
        "species": {
            "name": "eevee",
            "url": "https://pokeapi.co/api/v2/pokemon-species/133/"
        }
    },
    "id": 67

}


*/
