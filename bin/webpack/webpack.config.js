const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../../src/index.js')],
    vendor: ['react', 'react-dom', 'babel-polyfill'],
  },
  // 指定入口文件，程序从这里开始编译,__dirname当前目录, ../表示上一级目录, ./同级目录
  output: {
    path: path.resolve(__dirname, '../../build'), // 输出的路径
    filename: 'app/[name]_[hash:8].js', // 打包后文件
  },
  resolve: { // 指定第三方库目录，减少webpack寻找时间
    modules: [path.resolve(__dirname, '../../node_modules')],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime'],
        },
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../../src/template/index.html'),
      favicon: path.resolve(__dirname, '../../src/favicon.ico'),
      options: {
        title: 'React App'
      }
    }),
  ],
};
