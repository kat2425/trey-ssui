const path           = require('path')
const fs             = require('fs')

const lessToJs       = require('less-vars-to-js')

const rootDir = '../../../'
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, `${rootDir}/resources/ant-theme/ant-default-vars-override.less`), 'utf8'))

module.exports = {
  test: /\.less$/,
  include: /node_modules\/antd/,
  use: [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {loader: 'less-loader',
      options: {
        modifyVars: themeVariables,
        root: path.resolve(__dirname, './')
      }
    }
  ]
}
