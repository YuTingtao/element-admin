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
    }
}