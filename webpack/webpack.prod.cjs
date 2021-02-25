const path = require("path");
const glob = require("glob-all");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

const rootPath = path.resolve(__dirname, "../src");
const extensionPath = path.join(rootPath, "src");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isAnalyze = process.env.BUNDLE_ANALYZE;

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new PurgecssPlugin({
      paths: () => glob.sync(`${extensionPath}/**/*`, { nodir: true }),
      only: ["popup", "options", "content"],
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
    minimize: true,
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
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          mangle: false,
          module: true,
          ecma: 2018,
        },
        extractComments: false,
      }),
    ],
  },
});

if (isAnalyze) {
  module.exports.plugins.push(new BundleAnalyzerPlugin());
}
