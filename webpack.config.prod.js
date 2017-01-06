const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './leather/static/js/index',
  output: {
    path: path.resolve('./leather/static/bundles/'),
    filename: '[name]-[hash].js',
    publicPath: '/static/bundles/'
  },
  plugins: [
    new BundleTracker({ filename: './webpack.stats.json' }),
    new ExtractTextPlugin('styles-[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve('./leather/static/js'),
        exclude: /node_modules/,
        loaders: ['babel?stage=1']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
          'postcss-loader'
        )
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
};
