import { createApp } from "vue";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

createApp(App).mount("#app");
