'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
	devtool: 'inline-source-map',
	cache: true,
	entry: {
		airdrone: path.resolve(__dirname, 'public/js', 'airdrone.js'),
        styles: path.resolve(__dirname, 'public/css', 'style.scss'),
		vendor: ['babel-polyfill', 'eventsource-polyfill', 'milligram']
	},
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: path.join('js', '[name].bundle.js'),
		// TODO сделать выбор этого параметра зависящим от переменных окружения
		// publicPath: '/dist/' // for development
		publicPath: 'https://s3.eu-central-1.amazonaws.com/technopark-cdn/sample-static/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|sw.js)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.s?css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
                    loader: 'css-loader?minimize!postcss-loader!sass-loader'
				})
			},
			{
				test: /\.tmpl\.xml$/,
				loader: 'fest-loader'
			},
			{
				test: /\/sw.js$/,
				loader: `file?name=${path.join('..', 'index', '[name].js')}&publicPath=/&outputPath=/`
			}
		]
	},
	resolve: {
		alias: {}
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
		alias: {
			'fest-loader': path.resolve(__dirname, './fest-loader'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.NoErrorsPlugin(),
		new HtmlPlugin({
			filename: path.resolve(__dirname, 'index', 'index.html'),
			template: path.resolve(__dirname, 'public', 'index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: path.join('js', 'airdrone.vendor.js')
		}),
		new ExtractTextPlugin(path.join('css', '[name].css')),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}),
	]
};
