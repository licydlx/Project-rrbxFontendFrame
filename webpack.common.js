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
// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
// const ASSET_PATH = process.env.ASSET_PATH || './';

var webpackConfig = {
	entry: {
		// main: './src/Entrance/npro.js'
		// vendor: [
		// 	'lodash'
		// ]
	},
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
				use: ['css-loader?minimize', 'sass-loader', "postcss-loader"]
			})
		}, {
			test: /\.ejs$/,
			loader: 'ejs-compiled-loader?htmlmin'

		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor'
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'manifest'
		// }),
		extractSCSS
		// 该插件帮助我们安心地使用环境变量
		// new webpack.DefinePlugin({
		// 	'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
		// })
	],
};

//引入多页面文件配置
const {
	items
} = require("./src/Config/config");

items.htmlSet.forEach((value, index) => {
	var target;
	switch (index) {
		case 0:
			target = 'npro';
			break;
		case 1:
			target = 'price_cal';
			break;
		case 2:
			target = 'nbuy';
			break;
	}

	const htmlPlugin = new HtmlWebpackPlugin({
		title: value.title,
		filename: `${value.page}.html`,
		template: `./src/${target}.html`,
		chunks: [value.page, 'commons']
	});
	webpackConfig.plugins.push(htmlPlugin);

	webpackConfig.entry[value.page] = path.resolve(__dirname, `./src/Entrance/${target}.js`);
});

module.exports = webpackConfig;