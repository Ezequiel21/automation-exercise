import { test, type Page, type Locator } from "@playwright/test"

export class CheckoutPage {
    readonly url: string;
    readonly page: Page;
    readonly commentBox: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentBox = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async writeComment(comment: string) {
        await this.page.waitForLoadState("domcontentloaded");
        await this.commentBox.fill(comment);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}