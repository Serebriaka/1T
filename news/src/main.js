import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

// const app = createApp(App).mount('#app')
//
// app.use(VueAxios, axios)

const app = createApp(App).use(VueAxios, axios)
// const instanceOfAppComponent = app.mount('#app')

app.mount('#app')
