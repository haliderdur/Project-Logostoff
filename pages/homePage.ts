import type { Locator, Page } from "playwright";
import { BasePage } from "./basePage.js";
import { config } from "../utils/config.js";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo(config.baseUrl);
  }

  get searchIcon(): Locator {
    return this.page.locator("search-button.search-action--hidden-on-drawer");
  }

  get produkteLink(): Locator {
    return this.page.locator("//a[@href='/collections/all' and @ref='menuitem']");
  }

  get kontaktLink(): Locator {
    return this.page.locator("//a[@href='/pages/contact' and @ref='menuitem']");
  }
}
