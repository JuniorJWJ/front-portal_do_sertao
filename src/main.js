import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Criar a aplicação Vue
const app = createApp(App)

// Configurar as opções do toast
const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

// Usar o plugin do toast na aplicação Vue
app.use(Toast, options)

// Usar o router
app.use(router)

// Montar a aplicação no elemento com id "app" no HTML
app.mount('#app')
