var webpack = require('webpack');
var path = require("path");
var tsConfigPath = path.join(__dirname, "tsconfig.frontend.json");

module.exports = {
    entry: {
        'polyfills': './resources/scripts/angular-polyfills.ts',
        'vendor'   : './resources/scripts/angular-vendor.ts',
        'app'      : './angular/app.ts'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
        customAttrAssign: [ /\)?\]?=/ ]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?tsconfig=' + tsConfigPath, 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
