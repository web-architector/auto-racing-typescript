const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'scripts/bundle-[hash].js',
    publicPath: './' // public URL of the output directory when referenced in a browser
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devServer: {
    // You should remove contentBase option as by default webpack-dev-server uses output.path value as the path to serve files from.
    // contentBase: path.resolve(__dirname, 'docs'),
    publicPath: 'http://localhost:3000/', // public URL of the output directory when referenced in a browser
    compress: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader' // creates style nodes from JS strings
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.join(__dirname, ''),
              debug: true,
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(png|jpg|jpeg)$/, // регэксп для css фалов
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],

      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/index.html',
          to: './index.html',
        },
        {
          from: 'src/assets/**/*',
          to: './assets',
          transformPath: (targetPath, path) => {
            return targetPath.replace('src/assets', '');
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/images/favicon.ico',
      title: 'Гонки',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

  ],
};
