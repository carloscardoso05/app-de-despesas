import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAgVo-p-dyS_DlvjAFamjIVrEgvesFzDSY",
  authDomain: "despesas-d008c.firebaseapp.com",
  projectId: "despesas-d008c",
  storageBucket: "despesas-d008c.appspot.com",
  messagingSenderId: "915510494352",
  appId: "1:915510494352:web:4eb51214969abf89aa4415",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
