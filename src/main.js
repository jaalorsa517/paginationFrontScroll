import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { init } from "./js/init";
import { router } from "./router";
import { useRegisterSW } from "virtual:pwa-register/vue";
import "@jaalorsa/j5-components-vue/style.css"

if (import.meta.env.PROD)
  useRegisterSW({
    onNeedRefresh() {
      console.log("Reiniciar el navegador");
    },
    onOfflineReady() {
      console.log("Web app está disponible offline");
    },
  });

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

init();
