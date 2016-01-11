'use strict';

import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/app.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  plugins: [babel()]
};
