import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
// O tema vem depois do Bootstrap para que os tokens do design system
// tenham precedência sobre os estilos padrão do framework.
import './styles/theme.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
