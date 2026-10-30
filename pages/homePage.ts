import type { Page } from "playwright";
import { BasePage } from "./basePage.js";
import { config } from "../utils/config.js";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo(config.baseUrl);
  }
}
