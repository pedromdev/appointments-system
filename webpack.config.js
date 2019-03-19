const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

module.exports = {
  entry: {
    bundle: './src/client/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [ 'style-loader', 'css-loader' ],
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
  ]
};