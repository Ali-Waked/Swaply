import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";

// mitt
import mitt from "mitt";
const emitter = mitt();

// pinia
import { createPinia } from "pinia";

// swiper
import "swiper/css";
import "swiper/css/pagination";

// import { useAuthStore } from "./stores/auth/auth";
const app = createApp(App);
app.use(createPinia());
// const authStore = useAuthStore();
// await authStore.checkAuth();
app.use(router);
// app.use()

app.provide("emitter", emitter);

app.mount("#app");

