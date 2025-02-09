import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

export default {
  input: 'app/**/*.ts',
  output: {
    format: 'es',
    file: 'dist/index.mjs'
  },
  plugins: [
    multi(),
    nodeExternals({ deps: false }), // Must always be before `nodeResolve()`.
    nodeResolve({
      extensions: ['.js', '.mjs', '.ts', '.json'],
      exportConditions: ['node', 'import', 'require', 'default']
    }),
    json(),
    commonjs({ include: /node_modules/, transformMixedEsModules: true }),
    replace({ preventAssignment: true }),
    babel({
      babelrc: false,
      configFile: false,
      babelHelpers: 'bundled',
      extensions: ['.js', '.mjs', '.ts'],
      presets: [
        ['@babel/preset-env', {
          targets: { node: '20' },
          bugfixes: true,
          modules: false,
          useBuiltIns: false
        }],
        '@babel/preset-typescript'
      ]
    })
  ]
}