const path                 = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      CleanWebpackPlugin   = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
      filename: 'app.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}