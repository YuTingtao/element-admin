import config from '@/config'

const host = config.host

export default {
    // 获取列表
    getList: host + '/getList'
}