const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.90:3000',//后端接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  }
})
