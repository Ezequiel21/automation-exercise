import { test, type Page, type Locator } from "@playwright/test"

export class ViewCartPage {
    readonly page: Page;
    readonly url: string;
    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout')
        this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' })

    }

    async proceedToCheckout() {
        await this.page.waitForLoadState("domcontentloaded")
        await this.proceedToCheckoutButton.click({force: true});
    }

    async registerNewUser() {
        await this.registerLoginLink.click();
    }
}