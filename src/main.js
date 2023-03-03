import { createApp } from 'vue'
import App from './App.vue'
import VueEasyLightbox from 'vue-easy-lightbox';
import store from './store'

// createApp(App).use(router).use(VueEasyLightbox).mount('#app')
// app.config.globalProperties.$navigationProps = {"cat": "meow"};
let app=createApp(App)
// app.config.globalProperties.$bionicReaderActive = true;
store.actions.initializeCount()
app.use(VueEasyLightbox).mount('#app')
