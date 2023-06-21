const path = require('path') // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack')

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

const webpackBase = {
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    `webpack-dev-server/client?http://${HOST}:8080`,
    `${__dirname}/src/app.tsx`,
  ],
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: 'build.min.js',
    path: `${__dirname}/../../backend/challenge/static/build`,
    publicPath: `http://${HOST}:${PORT}/`,
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.css)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.resolve(__dirname, 'styles'),
            },
          },
        ],
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.resolve(__dirname, 'styles'),
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './styles/variables.scss',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          includePaths: [__dirname,],
          limit: 100000,
        },
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'file-loader',
          options: {
            jsx: true,
            esModule: false,
          },
        },],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules'),],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css',],
    symlinks: true,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(true),
      NODE_ENV: JSON.stringify('debug'),
      STORYBOOK: JSON.stringify(false),
      'process.env.STORYBOOK': JSON.stringify(false),
      LOCAL_API: process.env.LOCAL_API ? JSON.parse(process.env.LOCAL_API) : true,
      'process.env.NODE_ENV': JSON.stringify('debug'), // Tells React to build in either dev or prod modes
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 8080,
    contentBase: `${__dirname}/../../backend/challenge/static`,
    historyApiFallback: true,
    disableHostCh eck: true,
  },
}

module.exports = webpackBase
