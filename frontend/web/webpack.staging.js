const webpack = require('webpack')
const webpackBase = require('./webpack.config.js')

module.exports = {
  ...webpackBase,
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(false),
      NODE_ENV: JSON.stringify('staging'),
      STORYBOOK: JSON.stringify(false),
      'process.env.STORYBOOK': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('staging'), // Tells React to build in either dev or prod modes
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  output: {
    path: `${__dirname}/../backend/challenge/static/build/`,
    filename: 'build.min.js',
    sourceMapFilename: 'build.min.map.js',
  },
}
