import axios from 'axios'
import config from '@/config'
import path from './path'

const host = config.host

export default {
    // 获取列表
    getList(params) {
        return axios.post(host + path.getList, params);
    }
}