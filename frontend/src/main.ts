import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import { router } from "@/router";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);

app.use(router);

app.mount("#app");
