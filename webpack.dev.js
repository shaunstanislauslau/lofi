const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let mainConfig = {
    mode: 'development',
    entry: './src/main/main.ts',
    target: 'electron-main',
    output: {
        filename: 'main.bundle.js',
        path: __dirname + '/dist',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.node$/,
                use: 'native-ext-loader'
            }
        ],
    },
};

let rendererConfig = {
    mode: 'development',
    entry: './src/renderer/renderer.tsx',
    target: 'electron-renderer',
    output: {
        filename: 'renderer.bundle.js',
        path: __dirname + '/dist',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap',
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.node$/,
                use: 'native-ext-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/renderer/index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: 'visualization.html',
            template: path.resolve(__dirname, './src/renderer/visualization.html'),
            //inject: false
        }),
    ],
};

module.exports = [mainConfig, rendererConfig];
