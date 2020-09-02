const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const dist = 'dist';  // be aware 'dist' folder is also used for tsconfig output

var nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });

module.exports = {
  entry: {
    'liquid-prep-action': `./src/liquid-prep-action.ts`
  },
  output: {
    path: path.resolve(__dirname, dist),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    plugins: [
      new TsConfigPathsPlugin({configFile: './tsconfig.json'})
    ],
    alias: {
      '@common/*': '../common/src'
    }
  },
  externals: nodeModules,
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true
  }
}
