const path = require("path");

const rootPath = path.resolve(__dirname, "../");
const extensionPath = path.join(rootPath, "src");

module.exports = {
  entry: {
    content: {
      import: path.resolve(extensionPath, "content", "content.ts"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, `${rootPath}`),
  },
  module: {
    rules: [
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
};
