const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: ''
}
module.exports = {
  devServer: {
      contentBase: './appout',
      host: '0.0.0.0', 
      port: 88,
      historyApiFallback: true, // is it enabled ?
      inline: true
  }
}
