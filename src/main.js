import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from './service'
import App from './App.vue'

Vue.use(ElementUI);
Vue.prototype.$axios = Axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
