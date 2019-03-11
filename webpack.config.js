const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "js/app.js"
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, "src/page"),
      component: path.resolve(__dirname, "src/component"),
      utility: path.resolve(__dirname, "src/utility"),
      service: path.resolve(__dirname, "src/service")
    }
  },
  module: {
    rules: [
      //react(jsx) processor
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      //css processor
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //sass processor
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      //pics loader
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "resource/[name].[ext]"
            }
          }
        ]
      },
      //font loader
      {
        test: /\.(ttf|woff2|woff|eot|svg|otf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "resource/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //handler HTML files
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./favicon.ico"
    }),
    //split css files
    new ExtractTextPlugin("css/[name].css"),
    //Extract public module
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    })
  ],
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/dist/index.html"
    },
    proxy: {
      "/manage": {
        target: "http://admintest.happymmall.com",
        changeOrigin: true
      },
      "/user/logout.do": {
        target: "http://admintest.happymmall.com",
        changeOrigin: true
      }
    }
  }
};
