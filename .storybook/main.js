const path = require('path');

module.exports = {
  stories: ['../src/stories/**/*.stories.js'],
  webpackFinal: async (config, {configType}) => {
    config.module.rules.push({
      test: /\.*css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });
    return config;
  }
}
