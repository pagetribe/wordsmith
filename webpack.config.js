var webpack = require("webpack")

module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./src",
    filename: "bundle.js"
  }
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     'wrapWith': 'wrapWith'
  //   })
  // ]
  // externals: {
  //   'wrapWith': 'wrapWith'
  // }
  // resolve: {
  //   alias: {
  //     'Medium': "medium.js/medium.js"
  //   }
  // }
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     Medium: "asdf"
  //   })
  // ]
}