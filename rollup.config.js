import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import merge from 'deepmerge';

const extensions = ['.ts', '.js'];

const baseConfig = {
  input: './src/hls.ts',
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions
    }),
    commonjs(),
    // TODO babelHelpers should be set to runtime since this is a library but that should require some extra config
    babel({
      extensions,
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            targets: { esmodules: true }
          }
        ]
      ],
      plugins: [
        [
          '@babel/plugin-proposal-class-properties',
          {
            loose: true
          }
        ],
        '@babel/plugin-proposal-object-rest-spread',
        ['@babel/plugin-transform-object-assign'],
        ['@babel/plugin-proposal-optional-chaining']
      ]
    })
  ]
};

const multiConfig = [
  {
    output: {
      file: 'dist/hls.esm.js',
      format: 'esm'
    }
  }
].map(config => merge(baseConfig, config));

export default multiConfig;
