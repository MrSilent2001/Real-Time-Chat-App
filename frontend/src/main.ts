import './assets/main.css'

import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

import { vuetify } from '@/plugins/vuetify'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas  } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas );

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
