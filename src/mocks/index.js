// Mockjs官网：http://mockjs.com/
import Mock from 'mockjs'

Mock.setup({
    timeout: '100-200'
})

const mockFiles = require.context('./modules', false, /\.js$/);
const mocks = [];

mockFiles.keys().forEach(key => {
    mocks.push(mockFiles(key).default)
})

mocks.forEach(item => {
    Mock.mock(item.url, item.method, item.callback);
})
