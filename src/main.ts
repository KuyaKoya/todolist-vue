import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import TodoMain from './App.vue';
import router from './router';
import './assets/app-view-styles.css';

// createApp(TodoMain).use(router).mount('#app');

const app = createApp(TodoMain);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
