let mix = require('laravel-mix');
let frontend = require('./webpack_tasks/frontend.js');

let sourcePath = 'src';
let publicPath = 'dist/assets';

let sassSource = sourcePath + '/sass/';
let jsSource = sourcePath + '/js/';

mix.setPublicPath(publicPath);
mix.disableNotifications();

mix.webpackConfig({
    plugins: [
        frontend.styleLint(sassSource),
        frontend.jQueryGlobals()
    ]
});

/* SASS */
mix
    .sass(sassSource + 'mnav.scss', 'css');

/* JAVASCRIPT */
mix
    .ts(jsSource + 'mnav.ts', 'js');

mix.options({processCssUrls: false});
mix.options({
        cssNano: {discardComments: {removeAll: true}}
    })
    .version();