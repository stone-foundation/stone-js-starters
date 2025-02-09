import glob from 'tiny-glob'

const files = await glob('./app/**/*.{tsx,jsx}')
const modules = []

for (const file of files) {
  const module = await import(`./${file}`)
  modules.push(Object.values(module))
}

console.log(files);