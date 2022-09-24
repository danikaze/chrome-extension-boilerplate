import { createHash } from 'crypto';
import { sep, join } from 'path';
import { existsSync, readdirSync } from 'fs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import packageJson from './package.json';
import { getBuildTimeConstantsPlugins } from './scripts/build-constants';
import { Configuration, WebpackPluginInstance } from 'webpack';

const config: (env: any) => Configuration = (env) => {
  const IS_PRODUCTION = env.production === true;

  return {
    mode: IS_PRODUCTION ? 'production' : 'development',

    devtool: IS_PRODUCTION ? undefined : 'inline-source-map',

    entry: {
      app: ['src/index.tsx'],
    },

    output: {
      path: join(__dirname, 'release', 'app'),
    },

    watch: !IS_PRODUCTION,

    module: {
      rules: [
        // css modules
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  getLocalIdent: getCssLocalIdent,
                },
                sourceMap: true,
                importLoaders: 1,
              },
            },
            'sass-loader',
          ],
          include: /\.module\.s?(c|a)ss$/,
        },
        // css not-modules
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: /\.module\.s?(c|a)ss$/,
        },
        // images & fonts (assets)
        {
          test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|ttf|eot|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'assets',
              publicPath: './assets',
            },
          },
        },
        // code
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
        // https://webpack.js.org/configuration/module/#resolvefullyspecified
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },

    plugins: (
      [
        ...getBuildTimeConstantsPlugins(IS_PRODUCTION),
        new CopyPlugin({
          patterns: [
            { from: 'icons/*', to: '' },
            {
              from: 'manifest.json',
              to: '',
              transform: (content: any) => {
                const manifest = JSON.parse(content.toString());
                manifest.version = packageJson.version;
                return JSON.stringify(manifest, null, 2);
              },
            },
          ].concat(
            (() => {
              if (!existsSync('src/static')) return [];
              if (readdirSync('src/static').length === 0) return [];

              return [{ from: './*', to: 'static', context: 'src/static' }];
            })()
          ),
        }),
      ] as WebpackPluginInstance[]
    ).concat(IS_PRODUCTION ? [new CleanWebpackPlugin()] : []),

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
      moduleIds: IS_PRODUCTION ? undefined : 'named',
    },

    stats: {
      children: false,
      excludeAssets: [/COMMITHASH/, /VERSION/],
    },
  };
};

interface CssLoaderContextLike {
  context: string;
  resourcePath: string;
}

/* https://github.com/webpack-contrib/css-loader#modules */
function getCssLocalIdent(
  context: CssLoaderContextLike,
  localIdentName: string,
  localName: string
): string {
  const HASH_LENGTH = 5;
  const hashContent = `filepath:${context.resourcePath}|classname:${localName}`;
  const filename = context.resourcePath
    .replace(`${context.context}`, '')
    .substring(1)
    .replace(sep, '-')
    .replace(/\.module\.s?[ca]ss/, '');
  const hash = createHash('md5')
    .update(hashContent)
    .digest('base64')
    .substring(0, HASH_LENGTH);

  return `${filename}__${localName}__${hash}`;
}

export default config;
