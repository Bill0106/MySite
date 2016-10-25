var webpack = require('webpack');

module.exports = {
    entry: {
        'polyfills': './resources/scripts/angular-polyfills.ts',
        'vendor'   : './resources/scripts/angular-vendor.ts',
        'app'      : './angular_2/app.ts'
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
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
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
