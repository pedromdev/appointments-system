const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SizePlugin = require('size-plugin');

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

module.exports = {
  entry: {
    bundle: './src/client/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js?version=[contenthash]'
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
        test: /\.css$/
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    }),
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
  ]
};