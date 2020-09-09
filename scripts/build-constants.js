/*
 * Don't touch this file.
 * This is used internally by the webpack configurations
 */
const { join } = require('path');
const { readdirSync } = require('fs');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const packageJson = require('../package.json');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = { getBuildTimeConstantsPlugins };

function getBuildTimeConstantsPlugins(IS_PRODUCTION) {
  const constants = getConstants(IS_PRODUCTION);

  const plugins = [gitRevisionPlugin, new DefinePlugin(constants)];

  plugins.push(
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanAfterEveryBuildPatterns: ['VERSION', 'COMMITHASH'],
    })
  );

  return plugins;
}

function getConstants(IS_PRODUCTION) {
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

  return stringify({
    ...constants,
    IS_PRODUCTION,
    PACKAGE_NAME: packageJson.name,
    PACKAGE_VERSION: packageJson.version,
    COMMIT_HASH: gitRevisionPlugin.commithash(),
    COMMIT_HASH_SHORT: gitRevisionPlugin.commithash().substr(0, 7),
  });
}

function stringify(data) {
  return Object.entries(data).reduce((res, [key, value]) => {
    res[key] = JSON.stringify(value);
    return res;
  }, {});
}
