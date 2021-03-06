require("dotenv").config();

const { Env } = require("@humanwhocodes/env");

const environment = new Env();
// const { } = environment.required;

module.exports = {
  verbose: true,
  sourceDir: `./extension/`,
  ignoreFiles: ["runtime.js"],
  build: {
    overwriteDest: true,
    asNeeded: false,
  },
  run: {
    browserConsole: true,
    firefox: "firefox",
  },
  lint: {
    output: "text",
  },
};
