import { type Page, expect, type Locator } from "@playwright/test"

export class SignUpPage {
    readonly url: string;
    readonly page: Page;
    // Form fields
    readonly titleMrCheckbox: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly addFirstName: Locator;
    readonly addLastName: Locator;
    readonly address: Locator;
    readonly countrySelect: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountButton: Locator;
    readonly enterAccountInformationHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleMrCheckbox = page.getByLabel('Mr.');
        this.name = page.getByLabel('Name *', { exact: true });
        this.password = page.getByLabel('Password *');
        this.addFirstName = page.getByLabel('First name *');
        this.addLastName = page.getByLabel('Last name *');
        this.address = page.getByLabel('Address * (Street address, P.');
        this.countrySelect = page.getByLabel('Country *');
        this.state = page.getByLabel('State *');
        this.city = page.getByLabel('City *');
        this.zipCode = page.locator('#zipcode'); // Label is wrong in this one :v/
        this.mobileNumber = page.getByLabel('Mobile Number *');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.enterAccountInformationHeader = page.getByText('Enter Account Information');
    }

    async fillRequiredFields(
        name: string, 
        password: string, 
        firstName: string, 
        lastName: string, 
        address: string, 
        country: string, 
        state: string, 
        city: string, 
        zipCode: string, 
        mobileNumber: string) 
        {
            await this.name.fill(name);
            await this.password.fill(password);
            await this.addFirstName.fill(firstName);
            await this.addLastName.fill(lastName);
            await this.address.fill(address);
            await this.countrySelect.selectOption(country)
            await this.state.fill(state);
            await this.city.fill(city)
            await this.zipCode.fill(zipCode);
            await this.mobileNumber.fill(mobileNumber);
        }

    async pressCreateAccount() {
        await this.createAccountButton.click();
    }

    async validateEnterAccountInformationHeaderVisible() {
        await expect(this.enterAccountInformationHeader, "Enter account info header is not visible").toBeVisible();
    }

}