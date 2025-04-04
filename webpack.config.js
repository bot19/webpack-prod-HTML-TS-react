const path = require("path");

module.exports = {
  entry: "./src/scripts.js", // entry file of your app
  output: {
    filename: "bundle.js", // name of the output file
    path: path.resolve(__dirname, "build"), // output folder (dist)
  },
  mode: "production", // development mode for easier debugging
  // loaders
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // Specify target environments; excessive to ensure polyfills
                  targets: "> 0.25%, not dead, ie 11",
                  // auto add polyfills for features used in code
                  useBuiltIns: "usage",
                  // Specify core-js ver. (inc. minor) for polyfills
                  corejs: 3.41,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
