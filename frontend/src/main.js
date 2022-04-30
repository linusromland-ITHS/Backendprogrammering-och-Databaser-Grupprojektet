//External Dependencies import:
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

//Internal Dependencies import:
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Registers vue-axios
app.use(VueAxios, axios);

//Mounts app to div with id app
app.mount('#app');
