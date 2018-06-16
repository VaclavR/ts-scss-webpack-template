const path                    = require('path'),
      MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin       = require('html-webpack-plugin'),
      CleanWebpackPlugin      = require('clean-webpack-plugin'),
      UglifyJsPlugin          = require("uglifyjs-webpack-plugin"),
      OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 
        [
          {
            loader: 'file-loader',
            options: {
              name: 'asset/images/[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true
      },
      hash: true
    })
    
  ]
}