import { createApp } from 'vue'
import { router } from './router';

// import './style.css'
import App from './App.vue'

//importare bootstrap js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


createApp(App).use(router).mount('#app')
