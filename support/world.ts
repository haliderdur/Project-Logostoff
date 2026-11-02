import { World, setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import { HomePage } from "../pages/homePage.js";

export class CustomWorld extends World {
  browser: Browser | null = null;
  context: BrowserContext | null = null;
  page: Page | null = null;
  homePage: HomePage | null = null;

  getPage(): Page {
    if (!this.page) {
      throw new Error("Page is not initialized");
    }
    return this.page;
  }

  getHomePage(): HomePage {
    if (!this.homePage) {
      throw new Error("HomePage is not initialized");
    }
    return this.homePage;
  }
}

setWorldConstructor(CustomWorld);
