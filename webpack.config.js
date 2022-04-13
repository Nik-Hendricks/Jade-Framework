const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


var CSS_CONFIG = {
  entry: './src/css/main.css',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer:[
      new CssMinimizerPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
}

var JS_CONFIG = {
  entry: './src/js/main.js',
  resolve: {
    alias: {
      '/components': path.resolve(__dirname, 'src/components/'),
      '/js': path.resolve(__dirname, 'src/js/'),
      '/views': path.resolve(__dirname, 'src/views/'),
    },
  },
}


module.exports = [JS_CONFIG, CSS_CONFIG];