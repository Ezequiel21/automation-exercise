import { type Page } from "@playwright/test";
import { AccountCreatedPage } from "./accountCreatedPage.page";
import { CheckoutPage } from "./checkoutPage.page";
import { ContactUsPage } from "./contactUsPage.page";
import { HomePage } from "./homePage.page";
import { LoginPage } from "./loginPage.page";
import { PaymentDonePage } from "./paymentDonePage.page";
import { PaymentPage } from "./paymentPage.page";
import { ProductDetailsPage } from "./productDetails.page";
import { SignUpPage } from "./signUpPage.page";
import { TopNavBarPage } from "./topNavBar.page";
import { ViewCartPage } from "./viewCartPage.page";

export const pages = (page: Page) => {
    return {
        homePage: new HomePage(page),
        detailsPage: new ProductDetailsPage(page),
        viewCartPage: new ViewCartPage(page),
        loginPage: new LoginPage(page),
        signupPage: new SignUpPage(page),
        accountCreatedPage: new AccountCreatedPage(page),
        topNavBarPage: new TopNavBarPage(page),
        checkoutPage: new CheckoutPage(page),
        paymentPage: new PaymentPage(page),
        paymentDonePage: new PaymentDonePage(page),
        contactUsPage: new ContactUsPage(page)
    }

}