<script setup>
import { watch } from "vue"
import { J5VIcons } from "@jaalorsa/j5-components-vue"

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title:{
    type: String,
    default: ""
  }
})

watch(()=> props.isOpen, (value) => {
  if (value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
})

const emit = defineEmits(["close"])

function close() {
  emit("close")
}

</script>
<template>
  <Transition name="slide-fade">
    <div class="wrapperFull" v-if="props.isOpen">
      <div class="wrapperFull__container">
        <div class="wrapperFull__header">
          <div class="wrapperFull__title">
            <h2>{{ props.title }}</h2>
          </div>
          <div class="wrapperFull__close">
            <J5VIcons name="close" @click="close" />
          </div>
        </div>
        <slot></slot>
        <div class="wrapperFull__mask"></div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss">
.slide-fade-enter-active {
  transition: transform 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: transform 0.5s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100vw);
}

.wrapperFull {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-white);
  z-index: 1000;

  &__header {
    display: flex;
    margin: 0 0 0.7em 0;
    padding: 0.6em;
    border-bottom: 1px solid var(--color-gray-light);
  }

  &__title{
    flex: 10 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__close {
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
    text-align: center;
    cursor: pointer;
  }
}
</style>