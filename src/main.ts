import { createApp } from 'vue';
import App from './App.vue';
import './index.css'; // Tailwind CSS import
import router from './router';
import { createPinia } from 'pinia';
import 'swiper/swiper-bundle.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './index.css'; // Import Tailwind CSS

const app = createApp(App);

app.use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
  });
  
app.use(router);
app.use(createPinia());


app.mount('#app');
