<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["loadImage"]);

const img = ref(null);

const isLoad = ref(false);

function onLoad() {
  isLoad.value = true;
  emit("loadImage", isLoad.value);
}

onMounted(() => {
  img.value.style.width = props.width;
  img.value.style.height = props.height;
});
</script>
<template>
  <div class="skeleton imageSkeleton" v-if="!isLoad" ref="img"></div>
  <img :class="props.class" :src="props.src" :alt="props.alt" loading="lazy" @load="onLoad" v-show="isLoad" />
</template>

<style>
.imageSkeleton {
  width: auto;
  height: auto;
  border-radius: 5px;
}
</style>
