import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";

import { chromium } from "playwright";
import { config } from "../utils/config.js";
import type { CustomWorld } from "./world.js";

setDefaultTimeout(config.timeout.cucumber);

Before(async function (this: CustomWorld): Promise<void> {
  this.browser = await chromium.launch({
    headless: false,
  });

  this.context = await this.browser.newContext();
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
