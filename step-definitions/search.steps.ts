import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { CustomWorld } from "../support/world.js";

Then(
  "a search icon should be visible in the right top side of banner image",
  async function (this: CustomWorld): Promise<void> {
    const homePage = this.getHomePage();

    await expect(homePage.searchIcon).toBeVisible();
  },
);

Given(
  "I navigate to the Logostoff product page",
  async function (this: CustomWorld): Promise<void> {
    const homePage = this.getHomePage();
    await homePage.open();
    await homePage.produkteLink.click();
    await expect(this.getPage()).toHaveURL(
      "https://logostoff.com/collections/all",
    );
    await expect(homePage.searchIcon).toBeVisible();
  },
);

Given(
  "I navigate to the Logostoff contact page",
  async function (this: CustomWorld): Promise<void> {
    const homePage = this.getHomePage();
    await homePage.open();
    await homePage.kontaktLink.click();
    await expect(this.getPage()).toHaveURL(
      "https://logostoff.com/pages/contact",
    );
    await expect(homePage.searchIcon).toBeVisible();
  },
);
