const path = require("path");

module.exports = {
  entry: "./src/scripts.js", // entry file of your app
  output: {
    filename: "bundle.js", // name of the output file
    path: path.resolve(__dirname, "build"), // output folder (dist)
  },
  mode: "production", // development mode for easier debugging
};
