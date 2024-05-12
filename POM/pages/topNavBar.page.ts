import { expect, type Page, type Locator } from "@playwright/test"

export class TopNavBarPage {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly logOutButton: Locator;
    readonly contactUsButton: Locator;

    constructor(page: Page) {
        this.cartButton = page.locator('.nav').getByRole('link', { name: 'Cart' });
        this.logOutButton = page.locator('.nav').getByRole('link', { name: 'Logout' });
        this.contactUsButton = page.locator('.nav').getByRole('link', { name: 'Contact us' })
    }

    async goToCart() {
        await this.cartButton.click();
    }

    async logOut() {
        await this.logOutButton.click();
    }

    async goToContactUs() {
        await this.contactUsButton.click();
    }

    async validateLogoutButtonIsVisible() {
        expect(this.logOutButton).toBeVisible;
    }
}