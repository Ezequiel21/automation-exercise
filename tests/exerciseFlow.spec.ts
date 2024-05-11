import {test, expect, type Locator} from "@playwright/test";
import { HomePage } from "../POM/pages/homePage.spec.ts";
import { ProductDetailsPage } from "../POM/pages/productDetails.spec.ts";
import { ViewCartPage } from "../POM/pages/viewCartPage.spec.ts";
import { LoginPage } from "../POM/pages/loginPage.spec.ts";
import { SignUpPage } from "../POM/pages/signUpPage.spec.ts";
import { TopNavBarPage } from "../POM/pages/topNavBar.spec.ts";
import { CheckoutPage } from "../POM/pages/checkoutPage.spec.ts";
import { PaymentPage } from "../POM/pages/paymentPage.spec.ts";
import { AccountCreatedPage } from "../POM/pages/accountCreatedPage.spec.ts";
import { PaymentDonePage } from "../POM/pages/paymentDonePage.spec.ts";
import { ContactUsPage } from "../POM/pages/contactUsPage.spec.ts";
import { faker } from '@faker-js/faker';
import { PassThrough } from "stream";

test("Flow N1", async ({page}) => {
    // Pages
    const homePage: HomePage = new HomePage(page);
    const detailsPage: ProductDetailsPage = new ProductDetailsPage(page);
    const viewCartPage: ViewCartPage = new ViewCartPage(page);
    const loginPage: LoginPage = new LoginPage(page);
    const signupPage: SignUpPage = new SignUpPage(page);
    const accountCreatedPage: AccountCreatedPage = new AccountCreatedPage(page);
    const topNavBarPage: TopNavBarPage = new TopNavBarPage(page);
    const checkoutPage: CheckoutPage = new CheckoutPage(page);
    const paymentPage: PaymentPage = new PaymentPage(page);
    const paymentDonePage: PaymentDonePage = new PaymentDonePage(page);
    const contactUsPage: ContactUsPage = new ContactUsPage(page);
    // Fake data
    const firstName: string = faker.person.firstName();
    const lastName: string = faker.person.lastName();
    const userPassword: string = faker.internet.password();
    const address: string = faker.location.streetAddress();
    const state: string = faker.location.state();
    const city: string = faker.location.city();
    const zipCode: string = faker.location.zipCode();
    // The mobile number as many of the other data generated would depend on the specific requirements and scope of the project
    // i.e. accepting mobile numbers from all arond the world, requiring country specific prefixes, etc
    const mobileNumber: string = faker.phone.number();
    const cardNumber: string = faker.finance.creditCardNumber();
    const CVC:string = faker.finance.creditCardCVV();
    const cardMonth: string = faker.number.int({min: 1, max: 12}).toString();
    const cardYear:string = faker.number.int({min: 2020, max: 2050}).toString();
    const countries: Array<string> = ["India", "United States", "Canada", "Australia", "Israel", "New Zealand", "Singapore"]
    // Select a random country from the possibles in the previous array
    const randomCountry: string = countries[Math.floor(Math.random() * countries.length)]

    const userEmail: string = faker.internet.email();



    const itemsList = await homePage.getViewProduct(21)
    
    // Blocking requests from googleads to avoid dealing with ads
    await page.route("**/*", route => {
        route.request().url().startsWith("https://googleads.") ?
          route.abort() : route.continue();
        return;
      })

    
    // Go to gome, scroll and click on an item
    await homePage.goTo();
    await homePage.scrollToProductAndClick(23);
    // Product detail
    // Waiting for domcontentloaded to be fired since page change was flaky
    await page.waitForLoadState("domcontentloaded")
    await detailsPage.buyQuantityOfItem(30);
    // Cart
    await page.waitForLoadState("domcontentloaded")
    await viewCartPage.proceedToCheckout();
    await viewCartPage.registerNewUser();
    // Login
    await page.waitForLoadState("domcontentloaded")
    await loginPage.fillNewUserData(firstName, userEmail);
    await loginPage.signUp();
    // Signup
    await signupPage.fillRequiredFields(firstName, userPassword, firstName, lastName, address, randomCountry, state, city, zipCode, mobileNumber);
    await signupPage.pressCreateAccount()
    // Account created
    await accountCreatedPage.pressContinueButton()
    // Back to homepage
    await topNavBarPage.goToCart();
    // Back to cart
    await viewCartPage.proceedToCheckout();
    // Fill payment info
    await checkoutPage.writeComment("Hello there!");
    await checkoutPage.placeOrder();
    await paymentPage.fillPaymentInfo(firstName, cardNumber, CVC, cardMonth, cardYear);
    await paymentPage.confirmPayment();
    await page.waitForLoadState("domcontentloaded")
    // await page.pause()
    await expect(page.getByText('Order Placed!')).toBeVisible() // Validate order was placed
    // Payment Done
    await paymentDonePage.continueAfterSuccessfulPayment();
    await topNavBarPage.logOut();
    // Login again...
    await loginPage.fillExistentUserData(userEmail, userPassword);
    await loginPage.logIn()
    await expect(topNavBarPage.logOutButton).toBeVisible() // Validate it got logged in
    // await page.pause()

    await topNavBarPage.goToContactUs()
    // Send message
    await contactUsPage.fillMessage(firstName, userEmail, "Just a subject", "Just some opinions")
    await contactUsPage.submitMessage(); // This button is not working on the page, I just check it has been pressed
    await topNavBarPage.logOut();
  
    })