const path = require('path')
const webpack = require('webpack')


const webpackBase = {
  entry: [path.resolve(__dirname, 'src', 'index.ts')],
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.js$|.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
              sassOptions: {
                includePaths: [__dirname],
              },
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
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        options: {
          includePaths: [__dirname],
          limit: 100000,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '..', '..', 'node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    symlinks: true,
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: JSON.stringify(false),
      NODE_ENV: JSON.stringify('production'),
      STORYBOOK: JSON.stringify(false),
      'process.env.STORYBOOK': JSON.stringify(false),
      'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = webpackBase
