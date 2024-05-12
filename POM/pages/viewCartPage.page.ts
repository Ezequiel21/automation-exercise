import { type Page, expect, type Locator } from "@playwright/test"

export class ViewCartPage {
    readonly page: Page;
    readonly url: string;
    readonly proceedToCheckoutButton: Locator;
    readonly registerLoginLink: Locator;
    readonly quantityButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
        this.registerLoginLink = page.getByRole('link', { name: 'Register / Login' });
        this.quantityButton = page.locator('#cart_info').getByRole('button');
    }

    async proceedToCheckout() {
        await this.page.waitForLoadState("domcontentloaded")
        await this.proceedToCheckoutButton.click({force: true});
    }

    async registerNewUser() {
        await this.registerLoginLink.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async validateCorrectProductQuantity(productQuantity: string) {
        await expect(this.quantityButton, "The product quantity in cart does not match").toHaveText(productQuantity);
    }
}