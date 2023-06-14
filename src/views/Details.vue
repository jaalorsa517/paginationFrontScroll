<script setup lang="js">
import { onBeforeMount, reactive, computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageSkeletonVue from "@/components/ImageSkeleton.vue";
import { getEvolution, getPokemonInfo, getSpecie } from "@/shared/services/Pokemon.service";
import { langagueES } from "@/js/dictionary";
import {useRoot} from "@/store/useRoot.store";
import {selectContent} from "@/shared/services/analytics.services"

const route = useRoute();
const router = useRouter();
const rootStore = useRoot();
const prevolution = ref(null);
const evolution = ref(null);
const pokemon = reactive({ info: {}, specie: {}, prevolutions: [], evolutions: [] });

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
const sizeSkeletonImgPrincipal = computed(() => {
  return rootStore.isMobile ? "272px" : "450px";
});
const sizeSkeletonImgCarousel = computed(() => {
  return rootStore.isMobile ? "200px" : "500px";
});

watchEffect(() => {
  const arrowsEvolution = evolution.value?.getElements(".j5-carousel__arrow") || [];
  if (pokemon.evolutions.length === 1 || (pokemon.evolutions.length === 2 && !rootStore.isMobile)) {
    arrowsEvolution.forEach((arrow) => {
      arrow.style.display = "none";
    });
  } else {
    arrowsEvolution.forEach((arrow) => (arrow.style.display = "flex"));
  }

  const arrowsPrevolution = prevolution.value?.getElements(".j5-carousel__arrow") || [];
  if (pokemon.prevolutions.length === 1 || (pokemon.prevolutions.length === 2 && !rootStore.isMobile)) {
    arrowsPrevolution.forEach((arrow) => (arrow.style.display = "none"));
  } else {
    arrowsPrevolution.forEach((arrow) => (arrow.style.display = "flex"));
  }
});

function goBack() {
  router.push({ name: "Home" });
}
async function goPokemon(id) {
  await router.push({ name: "Details", params: { id: id } });
  window.scrollTo(0, 0);
  await init();
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
function getPrevolution({ name, url, id, evolutions }, prevolutions = [], brothers = []) {
  if (pokemon.info.name === name) {
    return prevolutions;
  }

  const isMe = brothers.length > 1 ? brothers.some((brother) => brother.name === name) : false;
  if (!isMe) {
    prevolutions.push({ name, url, id });
  }

  if (evolutions.length) {
    evolutions.forEach((evolution) => {
      getPrevolution(evolution, prevolutions, evolutions);
    });
  }
  return prevolutions;
}
function getPostEvolutions({ name, url, id, evolutions }, postEvolutions = [], brothers = []) {
  const hashBrothers = brothers.some((brother) => brother.name === pokemon.info.name);
  const hashPrevolution = pokemon.prevolutions.some((pokemon) => pokemon.name === name);
  if (!hashPrevolution && pokemon.info.name !== name && !hashBrothers) {
    postEvolutions.push({ name, url, id });
  }
  if (evolutions.length) {
    const brothersNext = [...evolutions];
    evolutions.forEach((evolution) => {
      getPostEvolutions(evolution, postEvolutions, brothersNext);
    });
  }
  return postEvolutions;
}
async function init() {
  const id = route.params.id;
  if (!id) router.push({name: "Home"});
  try {
    const pokemonInfo = await getPokemonInfo({ id });
    pokemon.info = pokemonInfo;
    selectContent("pokemon", pokemon.info.name)
    const details = await getSpecie({ url: pokemonInfo.speciesUrl });
    pokemon.specie = details;
    const evolutions = await getEvolution({ url: details.evolution });
    const prevolutions = getPrevolution(evolutions);
    pokemon.prevolutions = prevolutions;
    const postEvolutions = getPostEvolutions(evolutions);
    pokemon.evolutions = postEvolutions;
  } catch (error) {
    router.push({ name: "Home" });
  }
}

onBeforeMount(() => {
  init();
});
</script>
<template>
  <section class="details">
    <section class="details__goBack" @click="goBack">
      <span class="details__arrow">
        <svg width="95" height="74" viewBox="0 0 95 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.46447 33.4645C-0.488155 35.4171 -0.488156 38.5829 1.46447 40.5355L33.2843 72.3553C35.2369 74.308 38.4027 74.308 40.3553 72.3553C42.308 70.4027 42.308 67.2369 40.3553 65.2843L12.0711 37L40.3553 8.71572C42.308 6.7631 42.308 3.59728 40.3553 1.64466C38.4027 -0.307965 35.2369 -0.307966 33.2843 1.64466L1.46447 33.4645ZM95 32L5 32L5 42L95 42L95 32Z"
            fill="#2C3E50" />
        </svg>
      </span>
      <span class="details__textBack">Inicio</span>
    </section>
    <section class="details__main" v-if="isLoaded">
      <div class="details__primary">
        <span class="details__id">{{ pokemon.info.id }}</span>
        <h1 class="details__title">{{ title }}</h1>
        <div class="details__image">
          <ImageSkeletonVue
            :src="pokemon.info.img"
            :alt="pokemon.info.name"
            :width="sizeSkeletonImgPrincipal"
            :height="sizeSkeletonImgPrincipal"></ImageSkeletonVue>
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
              :key="index">
              {{ description }}
            </li>
          </ul>
        </div>
      </div>
      <section class="details__container" v-if="pokemon.prevolutions.length">
        <h2 class="details__title">Pre-Evoluciones</h2>
        <j5-carousel class="details__carousel" :count-slides="rootStore.isMobile ? 1 : 2" ref="prevolution">
          <div
            class="details__slide"
            v-for="(pokemon, index) in pokemon.prevolutions"
            :key="`${pokemon.name}-${index}`"
            @click="goPokemon(pokemon.id)">
            <div class="details__img">
              <ImageSkeletonVue
                :src="pokemon.url"
                :alt="pokemon.name"
                :width="sizeSkeletonImgCarousel"
                :height="sizeSkeletonImgCarousel"></ImageSkeletonVue>
            </div>
            <h3 class="details__namePokemon">
              <span class="details__idSlide">{{ pokemon.id }}</span>
              <span class="details__nameSlide">{{ toCamelCase(pokemon.name) }}</span>
            </h3>
          </div>
        </j5-carousel>
      </section>
      <section class="details__container" v-if="pokemon.evolutions.length">
        <h2 class="details__title">Evoluciones</h2>
        <j5-carousel class="details__carousel" :count-slides="rootStore.isMobile ? 1 : 2" ref="evolution">
          <div
            class="details__slide"
            v-for="(pokemon, index) in pokemon.evolutions"
            :key="`${pokemon.name}-${index}`"
            @click="goPokemon(pokemon.id)">
            <div class="details__img">
              <ImageSkeletonVue
                :src="pokemon.url"
                :alt="pokemon.name"
                :width="sizeSkeletonImgCarousel"
                :height="sizeSkeletonImgCarousel"></ImageSkeletonVue>
            </div>
            <h3 class="details__namePokemon">
              <span class="details__idSlide">{{ pokemon.id }}</span>
              <span class="details__nameSlide">{{ toCamelCase(pokemon.name) }}</span>
            </h3>
          </div>
        </j5-carousel>
      </section>
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
  padding: 1em;
}
.details svg {
  fill: var(--color_font,#2c3e50);
}
.details__goBack,
.details__arrow,
.details__container,
.details__id,
.details__image,
.details__types {
  display: flex;
  align-items: center;
}
.details__arrow,
.details__container,
.details__image,
.details__types {
  justify-content: center;
}
.details__goBack,
.details__slide {
  cursor: pointer;
}
.details__goBack {
  width: fit-content;
  padding: 0.5em;
  font-size: 1.5em;
}
.details__textBack {
  margin: 0 0.2em;
  top: 1px;
}
.details__arrow {
  width: 1em;
  height: 1em;
}
.details__container {
  flex-direction: column;
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
.details__primary,
.details__textBack {
  position: relative;
}
.details__id {
  flex-shrink: 0;
  justify-content: flex-end;
  font-size: 1.5em;
}
.details__id::before {
  content: "#";
  margin: 0 0.1em 0 0;
}
.details__image {
  max-width: 450px;
  margin: auto;
}
.details__img > img,
.details__image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.details__carousel {
  margin: auto;
}
.details__slide {
  min-width: 200px;
  max-width: 200px;
  margin: auto;
}
.details__namePokemon {
  text-align: center;
}
.details__idSlide::before {
  content: "#";
  margin: 0 0.1em 0 0;
}
.details__idSlide::after {
  content: "-";
  margin: 0 0.2em;
}
@media screen and (min-width: 540px) {
  .details__slide {
    min-width: 250px;
    max-width: 250px;
  }
}
@media screen and (min-width: 768px) {
  .details {
    max-width: 768px;
  }
  .details__slide {
    min-width: 300px;
    max-width: 300px;
  }
}
</style>
