// Cucumber.js configuration (ES Modules — no "default" profile wrapper,
// unlike JSON/CommonJS config formats).
// The tsx-register.js file must be imported FIRST so TypeScript step
// definitions and support files can be transpiled at runtime.
export default {
  paths: ["features/**/*.feature"],
  import: ["./tsx-register.js", "support/**/*.ts", "step-definitions/**/*.ts"],
  format: ["progress"]
};
