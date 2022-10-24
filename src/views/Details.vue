<script setup>
import { onBeforeMount, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPokemonInfo, getSpecie } from "@/shared/services/Pokemon.service";
import { langagueES } from "@/js/dictionary";

const route = useRoute();
const router = useRouter();
const pokemon = reactive({ info: {}, specie: {} });

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
  const _pokemon = await getPokemonInfo({ id });
  const details = await getSpecie({ url: _pokemon.speciesUrl });
  pokemon.info = _pokemon;
  pokemon.specie = details;
});
</script>
<template>
  <section class="details">
    <section class="details__goBack" @click="router.replace({ name: 'Home' })">
      <span class="details__arrow">&#129044;</span>
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
  max-width: 1024px;
  margin: auto;
}
.details__goBack {
  font-size: 1.5em;
  cursor: pointer;
}
.details__textBack {
  margin: 0 0.2em;
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
.details__secondary{
  padding: 0.5em;
}
.details__detail{
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
.details__descriptions{
  padding: 0.5em 1.5em;
}
.details__description{
  margin: 0.5em 0;
  list-style: disclosure-closed;
}
</style>
