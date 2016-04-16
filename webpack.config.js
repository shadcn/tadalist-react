const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  devtool: "source-map",
  devServer: {
    contentBase: PATHS.dist,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only'
  },
  entry: {
    app: ['webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      PATHS.app + '/index.js'
    ]
  },
  output: {
    path: PATHS.dist,
    filename: '[name].[ext]'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader, css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.(png|svg)$/,
        loaders: ['url']
      },
      {
        test: /\.json/,
        loaders: ['json']
      }
    ],
  },
  plugins: []
};
