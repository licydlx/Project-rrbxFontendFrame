const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const productObj = require('./src/Config/config.json');

const extractSCSS = new ExtractPlugin({
	filename: './css/[name]' + productObj.ver + '.min.css',
	disable: false,
	allChunks: true
});

//引入多页面文件配置
const pageNameArray = glob.sync("./src/Config/Page/" + productObj.productId + "/*.json").map(function(value, index) {
	return value.substring(value.lastIndexOf("/") + 1, value.lastIndexOf("."));
});

function getEntry() {
	var entry = {};
	pageNameArray.forEach(function(value, index) {
		entry[value] = path.resolve(__dirname, `./src/Entrance/${value}.js`);
	})
	return entry;
}

function getPlugins() {
	var plugins = [new CleanWebpackPlugin(['dist']),
		extractSCSS
	];
	pageNameArray.forEach(function(value, index) {
		const htmlPlugin = new HtmlWebpackPlugin({
			title: value,
			filename: `${value}.html`,
			template: `./src/${value}.html`,
			chunks: [value, 'commons']
		});
		plugins.push(htmlPlugin);
	});
	return plugins;
}

const webpackConfig = {
	entry: getEntry(),
	output: {
		filename: './js/[name]' + productObj.ver + '.min.js',
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
	plugins: getPlugins(),
};

module.exports = webpackConfig;