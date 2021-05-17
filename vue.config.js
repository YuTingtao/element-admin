// vue.config.js
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('./src'))
        if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/scss/base/variable.scss";`
            }
        }
    },
    // 通过Babel显式转译的依赖
    transpileDependencies: [
        'echarts'
    ],
    devServer: {
        open: true, // 自动启动浏览器
    }
}