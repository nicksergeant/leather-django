const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './leather/static/js/index'
  ],
  output: {
    path: path.resolve('./leather/static/bundles/'),
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:3000/leather/static/bundles/'
  },
  plugins: [
    new BundleTracker({ filename: './webpack.stats.json' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve('./leather/static/js'),
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?stage=1']
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};
