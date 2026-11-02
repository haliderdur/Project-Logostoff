import { Given, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { CustomWorld } from "../support/world.js";
import { config } from "../utils/config.js";

Given(
  "I navigate to the Logostoff home page",
  async function (this: CustomWorld): Promise<void> {
    const homePage = this.getHomePage();

    await homePage.open();
  },
);

Then(
  "The homepage should be displayed successfully",
  async function (this: CustomWorld): Promise<void> {
    const page = this.getPage();

    await expect(page).toHaveURL(config.baseUrl);
    await expect(page.locator("body")).toBeVisible();
  },
);
