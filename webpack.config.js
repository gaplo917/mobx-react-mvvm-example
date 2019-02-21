const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader?cacheDirectory=true',
                        options: {
                            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
                        }
                    }
                ]
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'public','index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname,'src'),
        hot: true
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
