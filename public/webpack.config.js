const path = require('path');
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	externals: {
		'createjs' : 'createjs'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}, {
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'images'
						}
					}
				]
			}, {
				test: /\.(woff|woff2|ttf|otf|eot)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: 'fonts'
							}
						}
					]
			}
		]
	},
	mode: 'development'
}
