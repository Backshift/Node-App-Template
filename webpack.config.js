const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const webpack = require('webpack'); // only add this if you don't have yet
require('dotenv').config({ path: './.env' }); 


const conf =  {
  entry: './src/main.js',
  watch: true,
  watchOptions: {
      ignored: /node_modules/,
        poll: 1000, // Check for changes every second
  },
  // watchOptions: {
  // },
  output: {
    path: path.resolve(__dirname, './public/js/vendor'),
    filename: 'bundle.js'
    // library: "libraryStarter", // Desired name for the global variable when using as a drop-in script-tag.
    // libraryTarget: "umd",
    // globalObject: "this"
  },
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, './dist'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use:  [
          {
            loader: 'html-loader',
            options: { minimize: false },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/video/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext]'
        }
      },
      {
        test: /\.mp3$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // "process.env": JSON.stringify(process.env),
      "process.env.baseurl": JSON.stringify(process.env['INVESTIGATION_BASEURL']),
      "process.env.se_baseurl": JSON.stringify(process.env['SITEENGINE_BASEURL']),
      "process.env.debug": JSON.stringify(process.env['DEBUG'])
    })
    // new  HtmlWebPackPlugin({
    //   // favicon: 'src/assets/icons/favicon.ico',
    //   template: './src/index.html',
    //   filename: './index.html'
    // }),
    // new MiniCssExtractPlugin({
    //   filename: 'assets/styles/[name].css',
    //   chunkFilename: '[id].css',
    // }),
  ],
  performance: {
    hints: false
  }
};

// module.exports = conf;
module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  conf.devtool = isProd ? false : 'eval-cheap-module-source-map';
  return conf;
}