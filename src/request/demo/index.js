import axios from '@/request/intercept'
import api from './api/index.api'

export default {
    // 获取列表
    getList(params) {
        return axios.post(api.getList, params);
    }
}