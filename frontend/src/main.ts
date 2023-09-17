import { createApp } from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import "./index.css";

// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(Toast);
app.use(router);
app.use(pinia);

app.mount("#app");
