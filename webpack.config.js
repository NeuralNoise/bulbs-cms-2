var BowerWebpackPlugin = require('bower-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './webpack.bundle-app',
    vendor: './webpack.bundle-vendor'
  },
  output: {
    filename: 'cms.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new ExtractTextPlugin('cms.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new BowerWebpackPlugin()
  ],
  resolve: {
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'app'
    ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!less')
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|swf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate',
        query: {
          module: 'cms.templates',
          relativeTo: '/app'
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ico|gif|png)$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'file',
        query: {
          hash: 'sha512',
          digest: 'hex',
          name: '[name]-[hash].[ext]'
        }
      }
    ]
  }
};
