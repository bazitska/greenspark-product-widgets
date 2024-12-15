import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import '@lottiefiles/lottie-player';

import './assets/styles/style.css';

createApp(App).use(store).mount('#app');
