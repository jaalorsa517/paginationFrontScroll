import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { init } from "./js/init";
import { router } from "./router";
import { useRegisterSW } from "virtual:pwa-register/vue";

console.log("PRODUCTION:", import.meta.env.PROD);
if (import.meta.env.PROD)
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
