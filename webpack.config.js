const { existsSync, readdirSync } = require('fs');
const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const packageJson = require('./package.json');
const { getBuildTimeConstantsPlugins } = require('./scripts/build-constants');

module.exports = (env) => {
  const IS_PRODUCTION = env === 'production';

  return {
    mode: IS_PRODUCTION ? 'production' : 'development',

    devtool: IS_PRODUCTION ? undefined : 'inline-source-map',

    entry: {
      app: ['src/index.tsx'],
    },

    output: {
      path: join(__dirname, 'app'),
    },

    watch: !IS_PRODUCTION,

    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|ttf|eot|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:8].[ext]',
              outputPath: 'img',
              publicPath: './img',
            },
          },
        },
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
      ],
    },

    plugins: [
      ...getBuildTimeConstantsPlugins(IS_PRODUCTION),
      new CopyPlugin({
        patterns: [
          { from: 'icons/*', to: '' },
          {
            from: 'manifest.json',
            to: '',
            transform: (content) => {
              const manifest = JSON.parse(content.toString());
              manifest.version = packageJson.version;
              return JSON.stringify(manifest, null, 2);
            },
          },
        ].concat(
          (() => {
            if (!existsSync('src/static')) return [];
            if (readdirSync('src/static').length === 0) return [];

            return [{ from: 'src/static/*', to: 'static', flatten: true }];
          })()
        ),
      }),
    ].concat(IS_PRODUCTION ? [new CleanWebpackPlugin()] : []),

    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
    },

    optimization: {
      minimize: IS_PRODUCTION,
      namedModules: !IS_PRODUCTION,
    },

    stats: {
      children: false,
      excludeAssets: [/COMMITHASH/, /VERSION/],
    },
  };
};
