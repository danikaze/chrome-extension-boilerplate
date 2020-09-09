const presets = ['@babel/preset-typescript'];

const plugins = [
  '@babel/plugin-transform-react-jsx',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: 'esm',
      camel2DashComponentName: false,
    },
    'core',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      libraryDirectory: 'esm',
      camel2DashComponentName: false,
    },
    'icons',
  ],
];

module.exports = {
  presets,
  plugins,
};
