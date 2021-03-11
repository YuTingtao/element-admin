import axios from 'axios'
import router from '@/router'
import store from '@/store'
import config from '@/config'
import { Message } from 'element-ui'

const toast = function(msg) {
    Message.closeAll();
    Message.error(msg, {
        duration: 2000
    });
}

const toLogin = function() {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

axios.defaults.timeout = 10000;
// axios.defaults.baseURL = './api';

// 请求拦截
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['token'] = store.state.token;
        }
        return config;
    },
    error => {
        console.log('error:' + error);
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    res => {
        if (res.status === 200) {
            if (res.data instanceof Blob) {
                return res;
            }
            return res.data;
        } else {
            return Promise.reject(res);
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401: // 401: 未登录
                    toLogin()
                    break;
                case 403: // 403 token过期
                    toast('登录过期，请重新登录')
                    store.commit('LOGOUT');
                    toLogin();
                    break;
                case 404: // 404请求不存在
                    toast('网络请求不存在')
                    break;
                default: // 其他错误
                    console.log('error');
            }
        } else {
            if (!navigator.onLine) {
                toast('网络已断开，请检查网络设置');
            } else {
                console.log('error:' + error);
                return Promise.reject(error);
            }
        }
    }
);

export default axios;
