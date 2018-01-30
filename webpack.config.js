const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const extractSCSS = new ExtractPlugin({
	filename: './css/[name].min.css',
	disable: false,
	allChunks: true
});
const autoprefixer = require('autoprefixer');

var webpackConfig = {
	entry: {},
	output: {
		filename: './js/[name].min.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: "babel-loader",
				options: {
					presets: ['env']
				}
			}]
		}, {
			test: /\.scss$/,
			use: extractSCSS.extract({
				fallback: "style-loader",
				use: ['css-loader', 'sass-loader', "postcss-loader"]
			})
		}, {
			test: /\.ejs$/,
			loader: 'ejs-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		extractSCSS
	],
	devServer: {
		contentBase: './dist'
	}
};

// 引入多页面文件配置
const {
	items
} = require("./src/Config/config");

items.htmlSet.forEach((page) => {
	const htmlPlugin = new HtmlWebpackPlugin({
		filename: `${page}.html`,
		template: "./src/template.html",
		chunks: [page, 'commons']
	});
	webpackConfig.plugins.push(htmlPlugin);
	webpackConfig.entry[page] = path.resolve(__dirname, `./src/Entrance/${page}.js`);
});

module.exports = webpackConfig;