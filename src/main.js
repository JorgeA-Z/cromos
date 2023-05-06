import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO2Np4CtWwVmtkpzGiQF7ym4zL71DqoCc",
  authDomain: "vue-cromes.firebaseapp.com",
  projectId: "vue-cromes",
  storageBucket: "vue-cromes.appspot.com",
  messagingSenderId: "227159083803",
  appId: "1:227159083803:web:feab580a283f20ae78a1be"
};

// Initialize Firebase
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)


app.use(router)
app.mount('#app')

