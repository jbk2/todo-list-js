const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './src/views/template.html', // Input html template
      filename: 'index.html', // Output html file name in the dist/
    }),
  ],

  module: {
    rules: [
			{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
			},
			{
        test: /\.html$/i,
        // include: path.resolve(__dirname, 'src/views/partials'),
        loader: 'html-loader',
			},
			{
        test: /\.(eot|ttf|woff|woff2|otf|png|svg|jpg|jpeg|gif|webp)$/i,
				type: 'asset/resource',
			}
		],
	},

  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};