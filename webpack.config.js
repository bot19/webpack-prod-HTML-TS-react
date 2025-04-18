const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/scripts.ts", // entry file of your app
  output: {
    filename: "[name].[contenthash].js", // name of the output file
    path: path.resolve(__dirname, "build"), // output folder (dist)
  },
  mode: "production", // development mode for easier debugging
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add .jsx to resolve JSX files
  },
  devServer: {
    port: 3001, // usually 3000
    static: {
      directory: path.join(__dirname, "public"), // serve static files from public folder
    },
    // Hot Module Replacement (HMR) = inject updated JS without page refresh
    hot: process.env.NODE_ENV !== "production", // enable HMR only in development
  },
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
    usedExports: true, // Enable tree shaking
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cj|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // Specify target environments; excessive to ensure polyfills
                  targets: "> 0.25%, not dead",
                  // auto add polyfills for features used in code
                  useBuiltIns: "usage",
                  // Specify core-js ver. (inc. minor) for polyfills
                  corejs: 3.41,
                },
              ],
              // This preset handles JSX transformation for React
              "@babel/preset-react",
            ],
          },
        },
      },
      // handle TS
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
    // new BundleAnalyzerPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"], // Specify the file extensions to lint
      exclude: ["node_modules"], // Exclude node_modules from linting
    }),
  ],
};
