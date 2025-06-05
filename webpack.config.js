const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
  entry: './index.js',
  output: {
    filename: 'idyll-embed.min.js',
    path: require('path').resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // the 'transform-runtime' plugin tells babel to require the runtime
      // instead of inlining it.
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(idyll|idyll-components|idyll-document)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['last 2 versions', 'ie >= 11']
                },
                loose: true
              }],
              ['@babel/preset-react', {
                runtime: 'automatic'
              }]
            ],
            plugins: [
              ['@babel/plugin-transform-classes', {
                loose: true
              }]
            ]
          }
        }
      }
    ]
  },
  optimization: isProduction ? {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 5,
        compress: {
          warnings: false
        },
        output: {
          comments: false,
          ascii_only: true
        }
      }
    })]
  } : {
    minimize: false
  },
  devtool: isProduction ? false : 'source-map'
  };
};