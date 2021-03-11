// Mockjs官网示例：http://mockjs.com/examples.html
import config from '@/config'
import api from '@/request/demo/api/index.api'
import Mock from 'mockjs'

const Random = Mock.Random;
const host = config.host;

export default {
    url: host + api.getList,
    method: 'post',
    callback(data) {
        let params = data.body? JSON.parse(data.body) : {};
        let content = [];
        for(var i = 0; i < params.pageSize; i++) {
            content.push({
                name: Random.cname(),
                desc: Random.csentence(10, 20),
                email: Random.email("qq.com"),
                address: Random.county(true),
                date: Random.date('yyyy-MM-dd HH:mm:ss')
            })
        }
        return {
            status: 200,
            total: 100,
            content
        }
    }
}
