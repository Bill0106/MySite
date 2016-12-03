var webpack = require('webpack');
var path = require("path");
var tsConfigPath = path.join(__dirname, "tsconfig.frontend.json");

module.exports = {
    entry: {
        'react': './react/vendor.ts',
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
                loaders: ['awesome-typescript-loader?tsconfig=' + tsConfigPath]
            },
            {
                test: /\.tsx$/,
                loaders: ['awesome-typescript-loader?tsconfig=' + tsConfigPath]
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
        }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        })
    ]
};
