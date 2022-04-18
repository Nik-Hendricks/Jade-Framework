const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts'); 
const isDevelopment = process.env.NODE_ENV === 'development'

var JS_CONFIG = {
  entry:  {
    main: path.resolve(__dirname, 'src/js/main.js'),
    css: path.join(__dirname, 'src/css/main.css'),
  },
  resolve: {
    alias: {
      '/components': path.resolve(__dirname, 'src/components/'),
      '/js': path.resolve(__dirname, 'src/js/'),
      '/views': path.resolve(__dirname, 'src/views/'),
    },
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
    ],
  },
  optimization: {
    concatenateModules: true,
  },
}; 

module.exports = [JS_CONFIG];