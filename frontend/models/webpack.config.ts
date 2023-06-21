const path = require('path')

const webpackBase = {
  entry: [path.resolve(__dirname, 'src', 'index.js')],
  mode: 'development',
  output: {
    filename: 'lib/index.js',
    path: __dirname,
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules')],
    extensions: ['.ts', '.js',],
  },
}

module.exports = webpackBase
