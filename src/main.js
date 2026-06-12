import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/theme.css'
import { toastPlugin } from './services/toast'

const app = createApp(App)

app.use(router)
app.use(toastPlugin)

app.mount('#app')
