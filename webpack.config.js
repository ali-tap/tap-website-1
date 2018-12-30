var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const options = {
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      crawlDelay: 2
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      crawlDelay: 2
    },
    {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
      crawlDelay: 10,
    }
  ]
};

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
      },
      {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
             {
               loader: 'file-loader',
               options: {}
             }
           ]
       },
       {
         test: /\.(ttf|otf|eot|woff|woff2)$/,
         use: {
           loader: "file-loader",
           options: {
             name: "fonts/[name].[ext]",
           },
         },
       }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
      },
      {
           test: /\.(png|jpg|gif|svg)$/,
           use: [
             {
               loader: 'file-loader',
               options: {}
             }
           ]
       },
       {
         test: /\.(ttf|otf|eot|woff|woff2)$/,
         use: {
           loader: "file-loader",
           options: {
             name: "fonts/[name].[ext]",
           },
         },
       }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../', 'src/index.html'),
		}),
    new UglifyJSPlugin({
			cache: true,
			parallel: true,
			uglifyOptions: {
				compress: true,
				ecma: 6,
				mangle: true
			},
			sourceMap: true
		}),
    new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
    new CompressionPlugin(),
    new RobotstxtPlugin(options)
  ]
}

module.exports = [browserConfig, serverConfig]
