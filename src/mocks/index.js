import Mock from 'mockjs'

Mock.setup({
    timeout: '100-200'
})

const mockFiles = require.context('./modules', false, /\.js$/)
let mocks = []

mockFiles.keys().forEach(item => {
    mocks.push(mockFiles(item).default)
})

mocks.forEach(item => {
    Mock.mock(item.url, item.method, options => {
        console.log(options)
        return item.data
    })
})
