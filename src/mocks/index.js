// Mockjs官网：http://mockjs.com/
import Mock from 'mockjs'

Mock.setup({
    timeout: '100-200'
})

const ctx = require.context('./modules', false, /\.js$/);
const mocks = [];

ctx.keys().forEach(key => {
    mocks.push(ctx(key).default)
})

mocks.forEach(item => {
    Mock.mock(item.url, item.method, item.callback);
})
