const path = require('path');
module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			createjs: 'createjs/builds/1.0.0/createjs.js'
		},
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
				test: /node_modules[/\\]createjs/,
        loaders: [
          'imports-loader?this=>window',
          'exports-loader?window.createjs'
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
