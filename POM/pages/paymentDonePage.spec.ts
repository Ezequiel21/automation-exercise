import { test, type Page, type Locator } from "@playwright/test"

export class PaymentDonePage {
    readonly page: Page;
    readonly continuebutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continuebutton = page.getByRole('link', { name: 'Continue' });
    }

    async continueAfterSuccessfulPayment() {
        await this.continuebutton.click();
    }
}