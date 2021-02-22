const path = require("path");
const glob = require("glob-all");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const PATHS = {
  src: path.join(__dirname, "src"),
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const SizePlugin = require("size-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new PurgecssPlugin({
      paths: () => glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new SizePlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "productionBundleReport.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
});
