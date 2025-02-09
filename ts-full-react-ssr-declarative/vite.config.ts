import builtins from 'module'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(
        {
          babel: {
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
          }
        }
      ),
      babel({
        filter: /\.(t|j)sx?$/,
        babelConfig: {
          babelrc: false,
          configFile: false,
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
        }
      })
    ],

    build: {
      target: 'esnext',
      rollupOptions: {
        external: [...builtins.builtinModules, /node:/],
      },
    },

    resolve: {
      extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json'],
    },

    esbuild: {
      jsxInject: `import React from 'react'`, // Automatically inject React for JSX
    },
  }
})
