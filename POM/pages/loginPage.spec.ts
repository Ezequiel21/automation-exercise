import { test, type Page, type Locator } from "@playwright/test"

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly newUserNameField: Locator;
    readonly newUserEmailField: Locator;
    readonly signUpButton: Locator;
    readonly loginUserNameField: Locator;
    readonly loginUserPasswordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newUserNameField = page.getByPlaceholder('Name');
        this.newUserEmailField = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });
        this.loginUserNameField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginUserPasswordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async fillNewUserData(firstName: string, email: string) {
        await this.newUserNameField.fill(firstName);
        await this.newUserEmailField.fill(email);
    }

    async signUp() {
        await this.signUpButton.click({force: true})

    }

    async fillExistentUserData(name: string, password: string) {
        await this.loginUserNameField.fill(name);
        await this.loginUserPasswordField.fill(password);
    }

    async logIn() {
        await this.loginButton.click();
    }
}