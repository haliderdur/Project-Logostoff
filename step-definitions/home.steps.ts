import { Given, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { HomePage } from "../pages/homePage.js";
import type { CustomWorld } from "../support/world.js";
import { config } from "../utils/config.js";

Given(
  "I navigate to the Logostoff homepage",
  async function (this: CustomWorld): Promise<void> {
    if (!this.page) {
      throw new Error("Playwright page is not initialized");
    }

    const homePage = new HomePage(this.page);
    await homePage.open();
  },
);

Then(
  "The homepage should be displayed successfully",
  async function (this: CustomWorld): Promise<void> {
    if (!this.page) {
      throw new Error("Playwright page is not initialized");
    }

    await expect(this.page).toHaveURL(config.baseUrl);
    await expect(this.page.locator("body")).toBeVisible();
  },
);
