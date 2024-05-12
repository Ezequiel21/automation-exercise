import { type Page, type Locator } from "@playwright/test"

export class ContactUsPage {
    readonly page: Page;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly subjectField: Locator;
    readonly messageBox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = page.getByPlaceholder('Email', { exact: true });
        this.subjectField = page.getByPlaceholder('Subject');
        this.messageBox = page.getByPlaceholder('Your Message Here');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async fillMessage(
        name: string,
        email: string,
        subject: string,
        message: string
    ) 
    {
        this.nameField.fill(name);
        this.emailField.fill(email);
        this.subjectField.fill(subject);
        this.messageBox.fill(message);

    }

    async submitMessage() {
        this.submitButton.click();
    }
}