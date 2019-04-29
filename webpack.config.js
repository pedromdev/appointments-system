const path = require('path');
const {DefinePlugin} = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SizePlugin = require('size-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const VENDOR_LIBS = [
  '@sentry/browser',
  'apollo-client',
  'axios',
  'graphql-tag',
  'react',
  'react-apollo',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
];

const isDevMode = process.env.NODE_ENV === 'development';

const plugins = [
  new DefinePlugin({
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
      REACT_SENTRY_DSN: process.env.REACT_SENTRY_DSN,
    })
  }),
  new HtmlWebpackPlugin({ template: './src/client/index.html' }),
  // new PreloadWebpackPlugin({
  //   rel: 'preload',
  //   as(entry) {
  //     if (/\.css$/.test(entry)) return 'style';
  //     if (/\.(woff2|woff|ttf|eot)$/.test(entry)) return 'font';
  //     if (/\.(png|jpe?g|gif|webp|svg)$/.test(entry)) return 'image';
  //     return 'script';
  //   }
  // }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css?version=[contenthash]',
    chunkFilename: 'css/[name].[id].css?version=[contenthash]',
  }),
  new SizePlugin()
];

if (isDevMode) {
  plugins.push(new LiveReloadPlugin({ appendScriptTag: true }));

  if (process.env.APP_ENV !== 'docker') plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:8080' }));
}

module.exports = {
  entry: {
    bundle: [
      '@babel/polyfill',
      './src/client/index.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js?version=[contenthash]',
    chunkFilename: 'js/bundle.[id].js?version=[contenthash]'
  },
  devtool: isDevMode ? 'eval-cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevMode,
            },
          },
          'css-loader',
          'sass-loader',
        ],
        test: /\.(sc|sa|c)ss$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins
};