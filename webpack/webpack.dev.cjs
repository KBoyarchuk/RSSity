const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  plugins: [new ForkTsCheckerWebpackPlugin()],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
});
