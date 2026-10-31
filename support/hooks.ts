/**
 * @file hooks.ts
 * @description Manages the Playwright browser lifecycle for Cucumber BDD scenarios.
 *
 * Before Hook:
 * - Launches Chromium using the configured headless setting.
 * - Creates a browser context with the configured viewport dimensions.
 * - Opens a new page before each scenario.
 *
 * After Hook:
 * - Captures and attaches a full-page screenshot when a scenario fails.
 * - Closes the browser context and browser after each scenario.
 * - Ensures cleanup even if screenshot capture or context closure fails.
 *
 * Configuration:
 * - Reads browser settings and Cucumber timeout from utils/config.ts.
 *
 * @see ../utils/config.ts
 * @see ./world.ts
 */

import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";

import { chromium } from "playwright";
import { config } from "../utils/config.js";
import type { CustomWorld } from "./world.js";

setDefaultTimeout(config.timeout.cucumber);

Before(async function (this: CustomWorld): Promise<void> {
  this.browser = await chromium.launch({
    headless: config.browser.headless,
  });

  this.context = await this.browser.newContext({
    viewport: config.browser.viewport,
  });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario): Promise<void> {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({
        fullPage: true,
      });

      // attach screenshot to report
      this.attach(screenshot, "image/png");
    }
  } finally {
    try {
      // if context not null or undefined then close it
      await this.context?.close();
    } finally {
      // if browser not null or undefined, then close it
      await this.browser?.close();
    }
  }
});
