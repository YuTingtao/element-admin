import axios from '@/request/intercept'
import config from '@/config'
import api from './api/index.api'

const host = config.host

export default {
    // 获取列表
    getList(params) {
        return axios.post(host + api.getList, params);
    }
}