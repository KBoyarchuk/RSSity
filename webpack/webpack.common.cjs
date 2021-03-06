const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const rootPath = path.resolve(__dirname, "../");
const extensionPath = path.join(rootPath, "src");

const { NODE_ENV } = process.env;

module.exports = {
  entry: {
    "manifest": path.resolve(extensionPath, "manifest.json"),
    "background": {
      import: path.resolve(extensionPath, "background", "background.ts"),
      dependOn: "webextension-polyfill",
    },
    "popup": {
      import: path.resolve(extensionPath, "popup", "popup.ts"),
      dependOn: "webextension-polyfill",
    },
    "options": {
      import: path.resolve(extensionPath, "options", "options.ts"),
      dependOn: "webextension-polyfill",
    },
    "webextension-polyfill": "webextension-polyfill-ts",
  },
  experiments: {
    outputModule: true,
  },
  output: {
    module: true,
    environment: {
      dynamicImport: true,
      module: true,
    },
    filename: "[name].js",
    path: path.resolve(__dirname, `${rootPath}/extension/`),
  },
  resolve: {
    modules: [path.resolve(__dirname, "..", "src/"), "node_modules"],
    alias: {
      "@": path.resolve(__dirname, "..", "src/"),
    },
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["date-fns"],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["url-loader?limit=10000", "img-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        type: "javascript/auto",
        test: /manifest\.json$/,
        use: {
          loader: "wext-manifest-loader",
          options: {
            usePackageJSONVersion: true,
          },
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, "../", "src/")],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "RSSity Background Page",
      filename: "background.html",
      template: `${extensionPath}/background/background.html`,
      minify: NODE_ENV === "production" ? true : false,
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      title: "RSSity Option Page",
      filename: "options.html",
      template: `${extensionPath}/options/options.html`,
      minify: NODE_ENV === "production" ? true : false,
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      title: "RSSity Popup Page",
      filename: "popup.html",
      template: `${extensionPath}/popup/popup.html`,
      minify: NODE_ENV === "production" ? true : false,
      chunks: [],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new WextManifestWebpackPlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: "src/assets", destination: "extension/" },
            { source: "src/_locales", destination: "extension/_locales" },
            { source: "content.js", destination: "extension/" },
          ],
          delete: ["content.js"],
        },
      },
    }),
    new Dotenv({
      path: path.resolve(rootPath, ".env"),
    }),
    new webpack.EnvironmentPlugin({
      TARGET_BROWSER: "chrome",
      DEBUG: false,
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};
