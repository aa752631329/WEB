import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from "vue-axios";
import axios from "axios";
//公共路径
axios.defaults.baseURL='http://1.14.96.47:3000/'
Vue.use(VueAxios,axios)
import lazyLoad from 'vue-lazyload'
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.config.productionTip = false

axios.interceptors.request.use((config)=>{
  NProgress.start()
  return config
})
axios.interceptors.response.use((res)=>{
  NProgress.done()
  return res.data
},(err)=>{
  return Promise.reject(new err('fake'))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
