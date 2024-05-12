import { expect, type Page, type Locator } from "@playwright/test"

export class ProductDetailsPage {
    readonly url: string;
    readonly page: Page;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;
    readonly productAddedMessage: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator("#quantity");
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.productAddedMessage = page.getByRole('heading', { name: 'Added!' });
    }

    async buyQuantityOfItem(quantity: string){
        await this.quantityInput.fill(quantity);
        await this.addToCartButton.click();
        await this.validateContinueShoppingModalLoaded();
        await this.viewCartLink.click();
        await this.page.waitForLoadState("domcontentloaded")
    }

    async validateAddToCartButtonVisible() {
        await expect(this.addToCartButton, "Add to cart button is not visible").toBeVisible();
    }

    async validateContinueShoppingModalLoaded() {
        await expect(this.continueShoppingButton, "Continue Shopping button is not visible").toBeVisible();;
        await expect(this.productAddedMessage, "Product Added message is not visible").toBeVisible();
    }
}

