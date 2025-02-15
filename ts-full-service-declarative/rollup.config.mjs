import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

export default {
  input: 'app/**/*.ts',
  context: 'globalThis',
  output: {
    format: 'es',
    file: 'dist/app.mjs'
  },
  external:['@libsql/client', 'bcrypt'],
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
      ],
      plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
    })
  ],
  onwarn(warning, warn) {
    // Suppress only the yargs circular dependency warning
    if (
      warning.code === "CIRCULAR_DEPENDENCY" &&
      /node_modules[/\\]yargs/.test(warning.message)
    ) { return }

    warn(warning)
  },
}