import { defineStore } from "pinia";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "@/shared/services/store.services";
import { insertIntoArray } from "@/shared/services/utils.services";

export const useRoot = defineStore("root", {
  state: () => ({
    isMobile: window.innerWidth < 768,
    scrollY: 0,
    optionsSearch: getFromLocalStorage("optionsSearch") || [],
  }),
  getters: {
    getOptionsSearch() {
      return this.optionsSearch;
    },
  },
  actions: {
    addOptionSearch(option) {
      this.optionsSearch = insertIntoArray({ value: option, array: this.optionsSearch });
      if (this.optionsSearch.length > 10) {
        this.optionsSearch.pop();
      }
      addToLocalStorage("optionsSearch", this.optionsSearch);
      this.optionsSearch = getFromLocalStorage("optionsSearch") || [];
    },
    removeOptionsSearch() {
      this.optionsSearch = [];
      addToLocalStorage("optionsSearch", this.optionsSearch);
      this.optionsSearch = getFromLocalStorage("optionsSearch") || [];
    },
  },
});
