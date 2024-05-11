import { test, type Page, type Locator } from "@playwright/test"

export class ProductDetailsPage {
    readonly url: string;
    readonly page: Page;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator("#quantity");
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    }

    async buyQuantityOfItem(quantity: number){
        await this.quantityInput.fill(quantity.toString());
        await this.addToCartButton.click();
        await this.viewCartLink.click();
    }
}

