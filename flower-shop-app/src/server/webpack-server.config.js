var path = require('path');
var nodeModules = {};

module.exports =
  {
    name: 'server',
    mode: 'production',
    target: 'node',
    entry: './src/server/server.js',
    output: {
      path: path.resolve('./dist/server'),
      publicPath: 'dist/server',
      filename: 'server.js'
    },
    externals: nodeModules,
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
  };