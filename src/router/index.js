import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/login',
            component: ()=> import('@/views/login.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
})

// 防止路由重复点击报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

router.beforeEach((to, from, next) => {
    let token = store.state.token || JSON.parse(sessionStorage.vuex || '{}').token;
    if (!(token) && to.path != '/login') {
        store.commit('LOGOUT');
        next('/login');
    } else {
        next();
    }
})

export default router
