const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mf = require("@angular-architects/module-federation/webpack");
const sharedMappings = new mf.SharedMappings();
const path = require("path");
const share = mf.share;
sharedMappings.register(
  path.join(__dirname, './tsconfig.json'),
  [/* mapped paths to share */]);
module.exports = {
  output: {
    uniqueName: 'shell-app',
    publicPath: "http://localhost:4200/",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },
      remotes: {
        "mfe1": "http://localhost:4201/remoteEntry.js"
      },
      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ],
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
