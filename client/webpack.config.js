const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isDevEnv = process.env.NODE_ENV === 'development';

const appName = 'jarvis';
// cdn 地址
const CDN_URL = `https://b.yzcdn.cn/${appName}/client/`;
const ASSET_PATH = CDN_URL;

function getOutputPath() {
  return path.resolve(__dirname, 'dist');
}

function getCssLoaders(modules = false) {
  return [
    require.resolve('style-loader'),
    require.resolve('cache-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: modules
          ? {
              localIdentName: '[name]_[local]_[hash:base64:5]',
            }
          : false,
        url: true,
        importLoaders: 2,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            autoprefixer({
              remove: false,
            }),
          ],
        },
      },
    },

    {
      loader: require.resolve('sass-loader'),
      options: {
        // 导入变量文件
        sassOptions: {
          // 导入变量文件
          // additionalData: `@import "src/stylesheets/abstracts/_variables.scss";`,
        },
      },
    },
  ];
}

const config = {
  mode: isDevEnv ? 'development' : 'production',
  devtool: isDevEnv ? 'inline-source-map' : undefined,
  entry: {
    main: './src/main.tsx',
    another: './src/another.js',
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    minimizer: isDevEnv ? [] : [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevEnv ? '[name].js' : '[name]_[chunkhash:8].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // NOTE: !!! cache-loader会让一些针对代码编译的配置不能及时生效，因为配置虽然变了但是代码文件未修改
          // 它会直接去读cache，导致那些代码不能被新的配置编译
          //
          // 遇到这种问题时考虑关掉cache-loader 或者多编译几次
          require.resolve('cache-loader'),
          {
            loader: require.resolve('babel-loader'),

            options: {
              babelrc: false,
              plugins: [
                // proposal
                require.resolve('@babel/plugin-proposal-optional-chaining'),
                require.resolve('@babel/plugin-proposal-class-properties'),
                // isDevEnv && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    // 开发环境 Chrome 87
                    targets: {
                      chrome: '87',
                    },
                  },
                ],
                require.resolve('@babel/preset-react'),
                [
                  require.resolve('@babel/preset-typescript'),
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: getCssLoaders(false),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: isDevEnv,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new HtmlWebpackPlugin({
      title: '管理输出',
      template: './src/index.html'
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // })
  ],
  devServer: {
    static: './dist',
    // hot: true,
  },
  
}

module.exports = config;