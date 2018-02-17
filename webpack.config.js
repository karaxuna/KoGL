var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var awesomeTypescriptLoader = require('awesome-typescript-loader');
var config = require('./config');

var webpackConfig = {
    entry: {
        'KoGL': './src/lib/index.ts',
        'demo': './src/demo/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: path.resolve(__dirname, './src'),
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',
                        publicPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules'],
        plugins: [
            new awesomeTypescriptLoader.TsConfigPathsPlugin({
                configFileName: path.resolve(__dirname, './tsconfig.json')
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/demo/index.html',
            inject: true,
            excludeChunks: ['KoGL']
        }),
        new ExtractTextPlugin({
            filename: 'komponents.css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(config.NODE_ENV),
            'process.env.BROWSER': 'true'
        }),
        new awesomeTypescriptLoader.CheckerPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        contentBase: path.join(__dirname, 'dist')
    }
};

if (config.NODE_ENV === 'development') {
    webpackConfig.devtool = 'source-map';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = webpackConfig;
