export default {
  default: {
    paths: ["features/**/*.feature"],
    loader: ["tsx/esm"],
    import: [
      "support/**/*.ts",
      "step-definitions/**/*.ts"
    ],
    format: ["progress"]
  }
};