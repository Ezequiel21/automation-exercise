import { test, type Page, type Locator } from "@playwright/test"

export class PaymentPage {
    readonly page: Page;
    readonly cardName: Locator;
    readonly cardNumber: Locator;
    readonly CVC: Locator;
    readonly expMonth: Locator;
    readonly expYear: Locator;
    readonly payConfirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardName = page.locator('input[name="name_on_card"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.CVC = page.getByPlaceholder('ex.');
        this.expMonth = page.getByPlaceholder('MM');
        this.expYear = page.getByPlaceholder('YYYY');
        this.payConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' });

    }

    async fillPaymentInfo(
        cardName: string,
        cardNumber: string,
        CVC: string,
        expMonth: string,
        expYear: string
    ) {
        await this.page.waitForLoadState("domcontentloaded");
        await this.cardName.fill(cardName);
        await this.cardNumber.fill(cardNumber);
        await this.CVC.fill(CVC);
        await this.expMonth.fill(expMonth);
        await this.expYear.fill(expYear);
    }

    async confirmPayment() {
        await this.payConfirmButton.click();
    }
}