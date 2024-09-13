const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      sideEffects: false,
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',
      },
    },
  },
});
