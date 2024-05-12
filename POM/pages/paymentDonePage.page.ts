import { expect, type Page, type Locator } from "@playwright/test"

export class PaymentDonePage {
    readonly page: Page;
    readonly continuebutton: Locator;
    readonly paymentDoneMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continuebutton = page.getByRole('link', { name: 'Continue' });
        this.paymentDoneMessage = page.getByText('Order Placed!');
    }

    async continueAfterSuccessfulPayment() {
        await this.continuebutton.click();
    }

    async validatePaymentDoneMessageShows() {
        await expect(this.paymentDoneMessage, "Payment Done message is not visible").toBeVisible()
    }
}