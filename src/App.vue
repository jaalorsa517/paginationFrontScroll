<script setup>
import { defineAsyncComponent } from "vue";

const PromptSW = import.meta.env.PROD
  ? defineAsyncComponent(() => import("@/components/PromptSW.vue"))
  : null;
</script>

<template>
  <router-view></router-view>
  <PromptSW v-if="PromptSW" />
</template>

<style lang="scss">
@import "@/style/main";
</style>
