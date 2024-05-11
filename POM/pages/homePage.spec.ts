import { test, type Page, type Locator, expect } from "@playwright/test"

export class HomePage {
    readonly url: string;
    readonly page: Page;
    readonly homeButton: Locator;
    readonly navBar: Locator;
    readonly navBarItems: Locator;
    readonly itemList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://automationexercise.com";
        this.itemList = page.locator(".features_items").locator(".product-image-wrapper").getByRole("listitem").nth(21);

        this.homeButton = page.getByRole("menuitem", { name: "Home" });
        this.navBar = page.getByRole("menubar");
        this.navBarItems = page.getByRole("menubar").getByRole("menuitem");
    }

    // Steps

    async goTo() {
        await this.page.goto(this.url, { timeout: 30000 })
    }

    async getViewProduct(productPosition: number) {
        const viewProductButton = this.page.locator(".features_items").locator(".product-image-wrapper").getByRole("listitem").nth(productPosition);
        return viewProductButton
    }

    async scrollToProductAndClick(productPosition: number) {
        const itemsList = await this.getViewProduct(productPosition);
        await itemsList.scrollIntoViewIfNeeded();
        await itemsList.click();
    }


}