import { createApp } from 'vue'
import App from './App.vue'
import VueEasyLightbox from 'vue-easy-lightbox';
import store from './store'

let app=createApp(App)
store.actions.initializeCount()
app.use(VueEasyLightbox).mount('#app')
