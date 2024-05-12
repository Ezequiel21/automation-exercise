import { type Page, type Locator } from "@playwright/test"

export class AccountCreatedPage {
    readonly url: string;
    readonly page: Page;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async pressContinueButton() {
        await this.continueButton.click();
    }
}