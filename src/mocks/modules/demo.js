import Mock from 'mockjs'
import config from '@/config'
import path from '@/request/demo/path'

const host = config.host

const content = Mock.mock({
    'content|10': [{
        'name': '@cname',
        'desc': '@csentence(10, 20)',
        'email': '@email("qq.com")',
        'address': '@county(true)',
        'date': '@date("yyyy-MM-dd HH:mm:ss")'
    }]
})

const res = {
    url: host + path.getList,
    method: 'post',
    data: {
        status: 200,
        total: 100,
        ...content
    }
}

export default {
    ...res
}
