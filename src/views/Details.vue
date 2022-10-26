<script setup>
import { onBeforeMount, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getEvolution, getPokemonInfo, getSpecie } from "@/shared/services/Pokemon.service";
import { langagueES } from "@/js/dictionary";

const route = useRoute();
const router = useRouter();
const pokemon = reactive({ info: {}, specie: {}, evolutions: {} });

const isLoaded = computed(() => {
  return pokemon.info.id;
});
const title = computed(() => {
  if (pokemon.info.name) {
    return toCamelCase(pokemon.info.name);
  }
  return "";
});
const height = computed(() => {
  const height = parseInt(pokemon.info.height);
  return `${height / 10}m`;
});
const weight = computed(() => {
  const weigth = parseInt(pokemon.info.weight);
  return `${(weigth * 100) / 1000}kg`;
});

function goBack() {
  router.back();
}
function translateType(type) {
  return langagueES[type];
}
function translateBoolean(value) {
  return value ? "Si" : "No";
}
function toCamelCase(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

onBeforeMount(async () => {
  const id = route.params.id;
  if (!id) router.push({ name: "Home" });
  const pokemonInfo = await getPokemonInfo({ id });
  const details = await getSpecie({ url: pokemonInfo.speciesUrl });
  // const evolutions = await getEvolution({ url: details.evolution });
  pokemon.info = pokemonInfo;
  pokemon.specie = details;
  // pokemon.evolutions = evolutions;
});
</script>
<template>
  <section class="details">
    <section class="details__goBack" @click="goBack">
      <span class="details__arrow">
        <svg  viewBox="0 0 500 500" >
          <g>
            <path
              d="M487.267,225.981c0-17.365-13.999-31.518-31.518-31.518H194.501L305.35,83.615c12.24-12.24,12.24-32.207,0-44.676 L275.592,9.18c-12.24-12.24-32.207-12.24-44.676,0L15.568,224.527c-6.12,6.12-9.256,14.153-9.256,22.262 c0,8.032,3.136,16.142,9.256,22.262l215.348,215.348c12.24,12.239,32.207,12.239,44.676,0l29.758-29.759 c12.24-12.24,12.24-32.207,0-44.676L194.501,299.498h261.094c17.366,0,31.519-14.153,31.519-31.519L487.267,225.981z"
            />
          </g>
        </svg>
      </span>
      <span class="details__textBack">Atras</span>
    </section>
    <section class="details__main" v-if="isLoaded">
      <div class="details__primary">
        <span class="details__id">{{ pokemon.info.id }}</span>
        <h1 class="details__title">{{ title }}</h1>
        <div class="details__image">
          <img :src="pokemon.info.img" :alt="pokemon.info.name" />
        </div>
        <div class="details__types">
          <div class="details__type" v-for="(type, index) in pokemon.info.types" :key="index" :type="type">
            {{ translateType(type) }}
          </div>
        </div>
      </div>
      <div class="details__secondary">
        <div class="details__detail">
          <span class="details__label">Altura</span>
          <span class="details__text">{{ height }}</span>
        </div>
        <div class="details__detail">
          <span class="details__label">Peso</span>
          <span class="details__text">{{ weight }}</span>
        </div>
        <div class="details__detail">
          <span class="details__label">Bebé</span>
          <span class="details__text">{{ translateBoolean(pokemon.specie.is_baby) }}</span>
        </div>
        <div class="details__detail">
          <span class="details__label">Legendario</span>
          <span class="details__text">{{ translateBoolean(pokemon.specie.is_legendary) }}</span>
        </div>
        <div class="details__detail">
          <span class="details__label">Mítico</span>
          <span class="details__text">{{ translateBoolean(pokemon.specie.is_mythical) }}</span>
        </div>
        <div class="details__detail">
          <span class="details__label">Género</span>
          <span class="details__text">{{ pokemon.specie.genera }}</span>
        </div>
        <div class="details__descriptionContainer">
          <h4 class="details__label">Características</h4>
          <ul class="details__descriptions">
            <li
              class="details__description"
              v-for="(description, index) in pokemon.specie.features"
              :key="index"
            >
              {{ description }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="details__container" v-else>
      <section class="spinner"></section>
    </section>
  </section>
</template>

<style>
.details {
  max-width: 540px;
  margin: auto;
}
.details svg{
  fill: var(--color_font);
}
.details__goBack {
  display: flex;
  padding: 0.5em;
  font-size: 1.5em;
  cursor: pointer;
}
.details__textBack {
  margin: 0 0.2em;
}
.details__arrow {
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.details__container {
  display: flex;
  justify-content: center;
}
.details__container .spinner {
  position: absolute;
  bottom: initial;
  left: initial;
}
.details__title {
  text-align: center;
  font-size: 2em;
}
.details__primary {
  position: relative;
}
.details__id {
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5em;
}
.details__id::before {
  content: "#";
  margin: 0 0.1em 0 0;
}
.details__image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  margin: auto;
}
.details__image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.details__types {
  display: flex;
  justify-content: center;
  align-items: center;
}
.details__primary,
.details__secondary {
  padding: 0.5em;
}
.details__detail {
  margin: 0.5em 0;
}
.details__label {
  margin: 0 0.2em 0 0;
  color: var(--color_font);
  font-size: 1.1em;
  font-weight: 700;
}
.details__label::after {
  content: ":";
}
.details__descriptions {
  padding: 0.5em 1.5em;
}
.details__description {
  margin: 0.5em 0;
  list-style: disclosure-closed;
}
@media screen and (min-width: 768px) {
  .details {
    max-width: 768px;
  }
}
</style>
