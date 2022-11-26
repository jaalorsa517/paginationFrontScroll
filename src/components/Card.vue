<script setup>
import { ref, watchEffect } from "vue";
import { colorsType } from "@/js/dictionary";
import { useRouter } from "vue-router";
import { useRoot } from "@/store/useRoot.store";

const props = defineProps({
  info: Object,
});

const router = useRouter();
const storeRoot = useRoot();

const isLoad = ref(false);
const card = ref(null);

watchEffect(() => {
  if (isLoad.value) {
    card.value.style.borderColor = colorsType[props.info.type];
  }
});

function goDetails() {
  const scrollY = window.scrollY;
  storeRoot.$patch({ scrollY });
  router.push({ name: "Details", params: { id: props.info.id } });
}
</script>

<template>
  <div class="card" ref="card" @click="goDetails">
    <div class="card__details">
      <div class="card__number">
        <div class="skeleton card__skeleton card__skeleton--number" v-if="!isLoad"></div>
        <h4 v-else>#{{ info.id }}</h4>
      </div>
      <div class="skeleton card__name card__skeleton card__skeleton--txt" v-if="!isLoad"></div>
      <p class="card__name" v-else>{{ info.name }}</p>
    </div>
    <div class="card__img">
      <div class="skeleton card__skeleton card__skeleton--img" v-if="!isLoad"></div>
      <img :src="info.img" :alt="info.name" @load="isLoad = true" v-show="isLoad" />
    </div>
  </div>
</template>

<style>
.card {
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
  border-radius: 5px 5px 15px 15px;
  box-shadow: 1px 1px 5px #c3c3c3;
  border-top: 7px solid #2c3e50;
  transition: border 600ms;
  cursor: pointer;
}
.card__details {
  position: relative;
}
.card__img {
  width: 80%;
  max-height: 100%;
  margin: 5px auto;
}
.card__img img {
  width: 100%;
  height: 100%;
}
.card__name {
  text-transform: capitalize;
  font-weight: bold;
}
.card__skeleton {
  border-radius: 5px;
}
.card__skeleton--img {
  width: 240px;
  height: 240px;
}
.card__skeleton--txt {
  width: 100px;
  height: 15px;
  margin: auto;
  text-align: center;
}
.card__skeleton--number {
  width: 40px;
  height: 15px;
}
.card__number {
  position: absolute;
  left: 0;
}
</style>
