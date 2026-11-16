import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Locator } from "playwright/test";
import type { CustomWorld } from "../support/world.js";

Then(
  "a search icon should be visible in the right top side of banner image",
  async function (this: CustomWorld): Promise<void> {
    await expect(this.getHomePage().searchIcon).toBeVisible();
  },
);

Given(
  "I navigate to the Logostoff product page",
  async function (this: CustomWorld): Promise<void> {
    await this.getHomePage().open();
    await this.getHomePage().produkteLink.click();
    await expect(this.getPage()).toHaveURL(
      "https://logostoff.com/collections/all",
    );
    await expect(this.getHomePage().searchIcon).toBeVisible();
  },
);

Given(
  "I navigate to the Logostoff contact page",
  async function (this: CustomWorld): Promise<void> {
    await this.getHomePage().open();
    await this.getHomePage().kontaktLink.click();
    await expect(this.getPage()).toHaveURL(
      "https://logostoff.com/pages/contact",
    );
    await expect(this.getHomePage().searchIcon).toBeVisible();
  },
);

When(
  "I search for a known matching product keyword",
  async function (this: CustomWorld): Promise<void> {
    await this.getHomePage().open();
    await this.getHomePage().searchIcon.click();
    await this.getHomePage().searchInputBox.fill("Chino");
    await this.getHomePage().searchInputBox.press("Enter");
  },
);

Then(
  "the search results should display at least one matching product",
  async function (this: CustomWorld): Promise<void> {
    const matchingProducts: Locator = this.getPage()
      .locator("li[ref='cards[]']")
      .filter({
        has: this.getPage().getByRole("link", { name: "Chino" }),
      });

    await expect(matchingProducts.first()).toBeVisible();
  },
);

Then(
  "each result should show a product image, title, and price",
  async function (this: CustomWorld): Promise<void> {
    const images: Locator[] = await this.getPage()
      .getByTestId("product-grid")
      .getByRole("img")
      .all();

    for (let i = 0; i < images.length; i++) {
      await expect(images[i]).toBeVisible();
    }

    const titles: Locator[] = await this.getPage()
      .getByTestId("product-grid")
      .getByRole("img")
      .filter({
        has: this.getPage().getByRole("heading", { name: "Chino" }),
      })
      .all();

    for (let i = 0; i < titles.length; i++) {
      await expect(titles[i]).toBeVisible();
    }

    const prices: Locator[] = await this.getPage()
      .getByTestId("product-grid")
      .getByRole("img")
      .filter({
        has: this.getPage().getByRef("priceContainer"),
      })
      .all();

    for (let i = 0; i < prices.length; i++) {
      await expect(prices[i]).toBeVisible();
    }
  },
);
