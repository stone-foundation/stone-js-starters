// Stone.js Configuration Namespace
// Define the configuration options for Stone.js below.
export default {

  // Build Configuration Namespace
  // Configure modules here to build and load automatically.
  autoload: {

    // Here, you can specify the static type checker you want to use:
    // Acceptable values are typescript, flow, or vanilla
    type: 'typescript',

    // Modules Pattern Used at Build Time
    // This pattern is used to transpile and bundle the application code.
    // It is also used to load transpiled modules at runtime.
    modules: {
      app: 'app/**/*.{ts,json}',
      options: 'config/*.{ts,json}'
    }
  },
}