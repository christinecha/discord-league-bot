const path = require('path')

const PUBLIC_DIR = path.resolve(__dirname, 'client/public')

module.exports = {
  entry: {
    'index.js': path.resolve(__dirname, 'client/index.js'),
  },
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: PUBLIC_DIR,
    compress: true,
    port: 4242,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3333',
      },
    },
  },
  output: {
    path: path.resolve(PUBLIC_DIR),
    publicPath: '/',
    filename: 'dist/[name]',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css?$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
}
