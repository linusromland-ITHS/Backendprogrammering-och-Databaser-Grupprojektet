//External Dependencies import:
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

//Internal Dependencies import:
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

//Creats the Vue app
const app = createApp(App);

//Registers vue-router
app.use(router);

//Registers vue-axios
axios.defaults.validateStatus = () => true;
axios.defaults.baseURL = '/api/';
app.use(VueAxios, axios);

//Registers vue-toastification
app.use(Toast, {
	transition: 'Vue-Toastification__bounce',
	maxToasts: 20,
	newestOnTop: true,
	timeout: 2500,
	hideProgressBar: true,
});

//Mounts app to div with id app
app.mount('#app');
