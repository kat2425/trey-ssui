// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */

const webpack           = require('webpack')
const merge             = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const sharedConfig      = require('./shared.js')
const { env }           = require('./configuration.js')
const {
  BugsnagBuildReporterPlugin,
  BugsnagSourceMapUploaderPlugin
} = require('webpack-bugsnag-plugins')

require('dotenv').config()

const apiKey = env.JS_BUGSNAG_API_KEY

module.exports = merge(sharedConfig, {
  output:  { filename: '[name]-[chunkhash].js' },
  devtool: 'source-map',
  stats:   'normal',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize:  true,
      sourceMap: true,

      compress: {
        warnings:     false,
        drop_console: true
      },

      output: {
        comments: false
      }
    }),

    new BugsnagBuildReporterPlugin({
      apiKey: apiKey
    }),

    new BugsnagSourceMapUploaderPlugin({
      apiKey: apiKey,
      overwrite: true
    }),

    new CompressionPlugin({
      asset:     '[path].gz[query]',
      algorithm: 'gzip',
      test:      /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/
    })
  ]
})
