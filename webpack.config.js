const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/scripts.js", // entry file of your app
  output: {
    filename: "[name].[contenthash].js", // name of the output file
    path: path.resolve(__dirname, "build"), // output folder (dist)
  },
  mode: "production", // development mode for easier debugging
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
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
      // CSS handling rule
      {
        test: /\.css$/,
        use: [
          // extract CSS into a separate file
          MiniCssExtractPlugin.loader,
          "css-loader", // Resolves CSS imports and URLs
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // template file
      filename: "index.html", // output file
      minify: false, // do not minify for easier debugging
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", // Output CSS with contenthash
    }),
  ],
};
