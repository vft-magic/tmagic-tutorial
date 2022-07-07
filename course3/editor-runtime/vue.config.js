const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        'hello-ui': path.resolve(__dirname, '../hello-ui'),
        vue$: path.resolve(__dirname, './node_modules/vue'),
      },
    },
  },
});
