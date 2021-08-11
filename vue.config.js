module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
};
