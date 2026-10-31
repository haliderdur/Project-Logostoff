// Explicitly registers tsx so Cucumber can transpile and load TypeScript
// step definitions / support files at runtime (ES Modules).
// See: https://github.com/cucumber/cucumber-js/blob/main/docs/transpiling.md
import { register } from "tsx/esm/api";
import { loadEnvFile } from "node:process";

register();
loadEnvFile();
