/*
 * Don't touch this file.
 * This is used internally by the webpack configurations
 */
import { join } from 'path';
import { readdirSync } from 'fs';
import { DefinePlugin, WebpackPluginInstance } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import getGitData from './git';
import packageJson from '../package.json';

export function getBuildTimeConstantsPlugins(IS_PRODUCTION: boolean) {
  const constants = getConstants(IS_PRODUCTION);

  const plugins = [new DefinePlugin(constants)] as WebpackPluginInstance[];

  plugins.push(
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['VERSION', 'COMMITHASH'],
    })
  );

  return plugins;
}

function getConstants(IS_PRODUCTION: boolean) {
  const constants = readdirSync(join(__dirname, '..', 'build-time-constants'))
    .filter((file) => /\.js$/.test(file))
    .reduce((res, filePath) => {
      const fileData = require(join(
        __dirname,
        '..',
        'build-time-constants',
        filePath
      ));
      return { ...res, ...fileData };
    }, {});

  const gitData = getGitData();

  return stringify({
    ...constants,
    IS_PRODUCTION,
    PACKAGE_NAME: packageJson.name,
    PACKAGE_VERSION: packageJson.version,
    COMMIT_HASH: gitData.rev,
    COMMIT_HASH_SHORT: gitData.shortRev,
  });
}

function stringify<T extends {}>(data: T): Record<keyof T, string | number> {
  return Object.entries(data).reduce((res, [key, value]) => {
    res[key as keyof T] = JSON.stringify(value);
    return res;
  }, {} as Record<keyof T, string | number>);
}
