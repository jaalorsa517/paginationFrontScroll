import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { init } from "./js/init";
import { router } from "./router";
import { useRegisterSW } from "virtual:pwa-register/vue";

useRegisterSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

init();
