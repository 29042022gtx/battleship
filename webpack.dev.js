const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // optimization: {
  //   runtimeChunk: 'single',
  // },
  devServer: {
    static: './dist',
    watchFiles: [
      './src/*.html',
      './**/*.css'
      // './webpack.config.js'
    ],
    client: {
      logging: 'warn',
    },
  },
});