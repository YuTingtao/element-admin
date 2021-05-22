import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Router from '../router'
import menuData from '@/mocks/menu'
import renderMenu from '@/utils/renderMenu'

const store = new Vuex.Store({
    state: {
        token: '',
        userInfo: {},
        menuList: []
    },
    getters: {
    },
    mutations: {
        LOGIN(state, data) {
            state.token = data.token;
            state.userInfo = data.userInfo;
        },
        LOGOUT(state) {
            state.token = '';
            state.userInfo = {};
            state.menuList = [];
        },
        setMenuList(state, data) {
            state.menuList = data;
            let routes = [{
                path: '/',
                component: () => import('@/views/common/layout'),
                redirect: '/index',
                name: '',
                alias: '',
                meta: {
                    title: '首页'
                },
                children: []
            }];
            renderMenu(routes[0].children, data);
            routes.push({
                path: '*',
                redirect: '/index'
            })
            Router.addRoutes(routes);
        }
    },
    actions: {
        getMenuList(context) {
            context.commit('setMenuList', menuData);
            return Promise.resolve(menuData);
        }
    }
})

export default store;
