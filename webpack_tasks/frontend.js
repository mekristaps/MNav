let webpack = require('webpack');
let mix = require('laravel-mix');
let argv = require('yargs').argv;

let CopyWebpackPlugin = require('copy-webpack-plugin');
let StyleLintPlugin = require('stylelint-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');

let nodeEnv = process.env.NODE_ENV;
let isDevEnv = nodeEnv === 'development';
let isProdEnv = nodeEnv === 'production';
let isWatching = argv.watch || false;

function EmptyPlugin() {
    this.apply = function () {
    };
}

module.exports = {
    cleanAssets: function () {
        return isProdEnv ? new CleanWebpackPlugin({
            verbose: true
        }) : new EmptyPlugin();
    },
    styleLint: function (source) {
        return new StyleLintPlugin({
            configFile: '.stylelintrc',
            context: source,
            files: '**/*.scss'
        })
    },
    jQueryGlobals: function() {
        return new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        });
    }
};