const path = require('path');

module.exports = {
  mode: 'production', //development
  entry: './src/index.js',
  output: {
    //虚拟打包路径，文件不会真正生成
    publicPath: "/xuni",
    //打包出来的文件名
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist')
  },
  optimization: {    // 1. 这个配置必须
      minimize: false
  },
  devtool: "source-map",
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, "www")
    }
  }
};