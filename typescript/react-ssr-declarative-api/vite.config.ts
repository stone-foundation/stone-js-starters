import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import react from '@vitejs/plugin-react'
import nodeExternals from 'rollup-plugin-node-externals'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(
        {
          babel: {
            plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
          }
        }
      ),
      babel({
        filter: /\.(t|j)sx?$/,
        babelConfig: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-typescript'],
          plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
        }
      })
    ],

    build: {
      target: 'esnext',
      rollupOptions: {
        plugins: [
          nodeExternals()
        ],
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
