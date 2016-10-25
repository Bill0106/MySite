var webpack = require('webpack');

module.exports = {
    entry: {
        'react': './resources/scripts/react-vendor.ts',
        'admin': './react/app.tsx'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.tsx$/,
                loaders: ['awesome-typescript-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['admin', 'react']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
