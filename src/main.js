import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { init } from "./js/init";
import { router } from "./router";
import { useRegisterSW } from "virtual:pwa-register/vue";

if (import.meta.env.PROD)
  useRegisterSW({
    onNeedRefresh() {
      console.log("Refresh triggered");
      const response = window.confirm("Web App está actualizando...\n ¿Desea refrescar?");
      if (response) {
        window.location.reload();
      }
    },
    onOfflineReady() {
      console.log("Offline ready");
      window.alert("Web App está instalado de manera local para mayor eficiencia.");
    },
  });

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");

init();
