import { defineStore } from "pinia";

export const useRoot = defineStore("root", {
  state: () => ({
    isMobile: window.innerWidth < 768,
  }),
});
