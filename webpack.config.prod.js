const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   // enforce: 'pre',
      //   loader: 'ts-loader',
      //   options: {
      //     configFile: 'tsconfig.prod.json',
      //   },
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:5].[id].css',
      chunkFilename: 'assets/css/[name].[contenthash:5].[id].css',
    })
  ]
});
