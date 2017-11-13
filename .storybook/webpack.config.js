// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const baseConfig       = require('../config/webpack/development.js')

module.exports = function (config, env) {
  const newConfig         = genDefaultConfig(config, env)
  newConfig.resolve.alias = Object.assign({}, newConfig.resolve.alias, baseConfig.resolve.alias)
  newConfig.module.rules.push({
    test: /\.less$/,
    loader: "style-loader!css-loader!less-loader"
  })

  return newConfig
}
