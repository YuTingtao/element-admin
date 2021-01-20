import Mock from 'mockjs'
import config from '../config'
import commonApi from '../request/common/api/getList'

const host = config.host

Mock.setup({
    timeout: '200-300'
})

Mock.mock(host + commonApi.getList, 'post', {
    'status': 200,
    'data|10': [{
        'name': '@cname',
        'desc': '@csentence(10, 20)',
        'email': '@email(qq.com)',
        'address': '@county(true)',
        'date': '@date("yyyy-MM-dd HH:mm:ss")'
    }]
})
