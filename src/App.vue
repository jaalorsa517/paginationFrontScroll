<script setup>
import PokemonsListVue from "./components/PokemonsList.vue";
</script>

<template>
  <div class="app">
    <PokemonsListVue />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.skeleton {
  animation: skeleton-animation 1.2s linear infinite alternate;
}

.spinner {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 5px solid rgb(2, 139, 59);
  border-top-color: #fff;
  position: absolute;
  bottom: 0;
  left: calc(50% - 20px);
  animation: spinner-animation 1.2s linear infinite;
}
@keyframes skeleton-animation {
  0% {
    background-color: hsl(0, 0%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

@keyframes spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
