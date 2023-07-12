import { createApp } from 'vue'
import App from './App.vue'
import TailWindCss from "../dist/output.css"

createApp(App).use(TailWindCss).mount('#app')
