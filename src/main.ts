import { createApp } from 'vue';
import TodoMain from './App.vue';
import router from './router';
import './assets/app-view-styles.css';

createApp(TodoMain).use(router).mount('#app');
