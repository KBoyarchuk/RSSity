require("dotenv").config();

const { Env } = require("@humanwhocodes/env");

const environment = new Env();
const { WEB_EXT_VERBOSE, WEB_EXT_OUTPUT } = environment.required;

module.exports = {
  verbose: Boolean(WEB_EXT_VERBOSE),

  build: {
    overwriteDest: true,
  },
  run: {
    firefox: "firefoxdeveloperedition",
    browserConsole: true,
  },

  lint: {
    output: WEB_EXT_OUTPUT,
  },
};
