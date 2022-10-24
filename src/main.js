import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { registerSW } from "virtual:pwa-register";
import { init } from "./js/init";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");

init();
