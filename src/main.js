import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from './request/httpServe.js'

import Element from 'element-ui';
import './assets/css/reset.css'
import './assets/scss/element.scss'
import './assets/scss/common.scss'
import mixins from './common/mixins'

Vue.use(Element, { size: 'medium' })
Vue.prototype.$axios = axios
Vue.mixin(mixins)

// Mock模拟数据
import config from './config'
if (config.mock) { require('./mock/index') }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
