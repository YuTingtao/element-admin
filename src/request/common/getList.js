import axios from 'axios'
import config from '@/config'
import api from './api/getList'

export default {
    // 获取列表
    getList(params) {
        return axios.post(api.getList, params);
    }
}