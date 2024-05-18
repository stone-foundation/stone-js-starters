import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

export default ({ input, output, externalsOptions = {}, replaceOptions }) => {
  return {
    input,
    output,
    plugins: [
      multi(),
      nodeExternals(externalsOptions), // Must always be before `nodeResolve()`.
      nodeResolve({
        extensions: ['.js', '.mjs'],
        exportConditions: ['node', 'import', 'require', 'default']
      }),
      json(),
      commonjs(),
      replace(replaceOptions),
      babel({
        babelrc: false,
        configFile: false,
        babelHelpers: 'bundled',
        extensions: ['.js', '.mjs'],
        presets: [
          '@babel/preset-env',
          '@babel/preset-flow'
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
          // 'babel-plugin-syntax-hermes-parser',
        ]
      })
    ]
  }
}
