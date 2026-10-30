import { Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import type { CustomWorld } from "./world.js";

Before(async function (this: CustomWorld): Promise<void> {
  this.browser = await chromium.launch({
    headless: false,
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld): Promise<void> {
  try {
    await this.context?.close();
  } finally {
    await this.browser?.close();
  }
});