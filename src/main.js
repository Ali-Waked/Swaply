import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";

// import Vue3EasyDataTable from 'vue3-easy-data-table';
// import 'vue3-easy-data-table/dist/style.css';

// mitt
import mitt from "mitt";
const emitter = mitt();

// pinia
import { createPinia } from "pinia";

// swiper
import "swiper/css";
import "swiper/css/pagination";

// import { useAuthStore } from "./stores/auth/auth";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
// const authStore = useAuthStore();
// await authStore.checkAuth();
app.use(router);
// app.use()
// app.component('EasyDataTable', Vue3EasyDataTable);

app.provide("emitter", emitter);

app.mount("#app");

