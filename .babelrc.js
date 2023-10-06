const presets = ['@babel/preset-typescript'];

const plugins = [
  ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = {
  presets,
  plugins,
};
