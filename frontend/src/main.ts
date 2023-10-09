import { createApp } from "vue";
import App from "@/App.vue";
import { router } from "@/router";
import "./index.css";

const app = createApp(App);

// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// vue-toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
app.component("font-awesome-icon", FontAwesomeIcon);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-solid-svg-icons";

library.add(faBookmark, farBookmark);

app.use(Toast);
app.use(router);
app.use(pinia);

app.mount("#app");
