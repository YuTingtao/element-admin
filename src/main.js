import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from './request/intercept.js'

import Element from 'element-ui'
import './assets/css/reset.css'
import './assets/scss/base/main.scss'
import mixins from './common/mixins'

Vue.use(Element, { size: 'medium' })
Vue.prototype.$axios = axios
Vue.mixin(mixins)

// Mock模拟数据
if (process.env.NODE_ENV == 'development') { 
    require('./mocks/index')
}

Vue.config.productionTip = false

if (sessionStorage.vuex) {
    let menuList = JSON.parse(sessionStorage.vuex).menuList
    if (menuList && menuList.length > 0) {
        store.commit('setMenuList', menuList)
    }
}
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
