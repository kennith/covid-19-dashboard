const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, ''),
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	}
};