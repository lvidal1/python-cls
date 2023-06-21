
const path = require('path');
const webpack = require('webpack')

module.exports = {
  stories: ['../src/**/*.story.jsx'],
  addons: [
    // '@storybook/addon-viewport/register',
    // 'storybook-chrome-screenshot/register',
    // '@storybook/addon-a11y/register',
    // '@storybook/addon-options/register',
  ],
  webpackFinal: async (config) => {
  config.module.rules = config.module.rules.concat([
      {
        test: /.js$|.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /(\.ts|\.tsx)$/,
        loader: 'ts-loader',
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
            root: path.resolve(__dirname, '../styles'),
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
            }
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'resolve-url-loader',
          options: {
            root: path.resolve(__dirname, '../styles'),
          },
        },
        {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {
            sassOptions: {
              includePaths: [`${__dirname}/frontend`],
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
        includePaths: [path.resolve(__dirname, '../images')],
        name: 'images/[name].[ext]',
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: 'url-loader',
      options: {
        includePaths: [path.resolve(__dirname, '../fonts')],
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
    }])

    config.resolve = {
      modules: ['node_modules', path.resolve(__dirname, '..', '..', 'node_modules')],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
      symlinks: true,
      alias: {
        '@': path.resolve(__dirname, '..', 'src'),
      },
    }

    return config;
  },
}
