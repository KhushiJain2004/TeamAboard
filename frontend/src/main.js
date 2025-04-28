import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'

// FontAwesome Setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBell, faCog, faComments, faHeart, faSignOutAlt, faTh } from "@fortawesome/free-solid-svg-icons"

// Add icons to FontAwesome library
library.add(faTh, faBell, faComments, faHeart, faCog, faSignOutAlt);


// BootstrapVue (for Vue 3)
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'

// Create Vue App
const app = createApp(App)
app.use(router)
app.use(BootstrapVue3)

// FontAwesome Configuration
library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
