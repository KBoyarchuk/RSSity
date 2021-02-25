require("dotenv").config();

const { Env } = require("@humanwhocodes/env");

const environment = new Env();
// const { } = environment.required;

module.exports = {
  verbose: true,
  artifactsDir: "./web-ext-artifacts/",
  sourceDir: `./extension/`,
  ignoreFiles: ["./webextension-polyfill.js"],
  build: {
    overwriteDest: true,
    asNeeded: false,
  },
  run: {
    browserConsole: true,
    firefox: "firefoxdeveloperedition",
  },
  lint: {
    output: "text"
  },
};
