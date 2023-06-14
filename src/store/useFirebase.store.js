import { defineStore } from 'pinia';

export const useFirebaseStore = defineStore("firebase", {
  state: () => ({
    analyticsInstance: null,
  }),
});
