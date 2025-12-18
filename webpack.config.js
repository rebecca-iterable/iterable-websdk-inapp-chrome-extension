const path = require('path');

module.exports = {
  // Use 'production' for a smaller, optimized file for the final extension.
  mode: 'production', 
  
  // The entry point for your content script.
  // Make sure this path points to the correct TS file.
  entry: './src/main.ts', 

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          // This ensures the assets are placed in an 'assets' folder
          // relative to the output path.
          filename: 'assets/[name][ext]', 
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  output: {
    // The final output path for the bundled file.
    path: path.resolve(__dirname, 'dist/content'), 
    
    // The name of the bundled content script file.
    filename: 'iterable-content-script.js', 
    
    // Clean the output folder before each build.
    clean: true, 
  },
};