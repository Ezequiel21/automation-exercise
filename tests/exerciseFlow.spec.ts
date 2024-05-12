const { test } = require("../tools/testFixtures.ts")
import { expect, type Locator } from "@playwright/test";
import { pages } from "../POM/pages/pageInitializer.page.ts";
import { HomePage } from "../POM/pages/homePage.page.ts";
import { ProductDetailsPage } from "../POM/pages/productDetails.page.ts";
import { ViewCartPage } from "../POM/pages/viewCartPage.page.ts";
import { LoginPage } from "../POM/pages/loginPage.page.ts";
import { SignUpPage } from "../POM/pages/signUpPage.page.ts";
import { TopNavBarPage } from "../POM/pages/topNavBar.page.ts";
import { CheckoutPage } from "../POM/pages/checkoutPage.page.ts";
import { PaymentPage } from "../POM/pages/paymentPage.page.ts";
import { AccountCreatedPage } from "../POM/pages/accountCreatedPage.page.ts";
import { PaymentDonePage } from "../POM/pages/paymentDonePage.page.ts";
import { ContactUsPage } from "../POM/pages/contactUsPage.page.ts";
import { DataGenerator } from "../tools/dataGenerators.ts";
import { faker } from '@faker-js/faker';

// Blocking requests from googleads to avoid dealing with ads
test.beforeEach(async ({ page }) => {
  await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
      route.abort() : route.continue();
    return;
  })
})

test("Flow N1", async ({ page, pages }) => {
  // Fake data
  const dataGenerator: DataGenerator = new DataGenerator();
  const creditCardData = await dataGenerator.creditCardInfo();
  const userData = await dataGenerator.userInfo();

  const countries: Array<string> = ["India", "United States", "Canada", "Australia", "Israel", "New Zealand", "Singapore"]
  // Select a random country from the possibles in the previous array
  const randomCountry: string = countries[Math.floor(Math.random() * countries.length)]



  // Go to home, scroll and click on an item
  await pages.homePage.goTo();
  await pages.homePage.scrollToProductAndClick(20);
  // Product detail
  // Waiting for domcontentloaded to be fired since page change was flaky
  await pages.detailsPage.buyQuantityOfItem("30");
  // Cart
  await pages.viewCartPage.validateCorrectProductQuantity("30")
  await pages.viewCartPage.proceedToCheckout();
  await pages.viewCartPage.registerNewUser();
  // Login
  await pages.loginPage.validateLoginOptionsHeadersVisible()
  await pages.loginPage.fillNewUserData(userData.firstName, userData.userEmail);
  await pages.loginPage.signUp();
  // Signup
  await pages.signupPage.validateEnterAccountInformationHeaderVisible();
  await pages.signupPage.fillRequiredFields(userData.firstName, userData.userPassword, userData.firstName, userData.lastName, userData.address, randomCountry, userData.state, userData.city, userData.zipCode, userData.mobileNumber);
  await pages.signupPage.pressCreateAccount()
  // Account created
  await pages.accountCreatedPage.pressContinueButton()
  await pages.topNavBarPage.validateLogoutButtonIsVisible();
  // Back to homepage
  await pages.topNavBarPage.goToCart();
  // Back to cart
  await pages.viewCartPage.proceedToCheckout();
  // Fill payment info
  await pages.checkoutPage.writeComment("Hello there!");
  await pages.checkoutPage.placeOrder();
  await pages.paymentPage.fillPaymentInfo(userData.firstName, creditCardData.cardNumber, creditCardData.CVC, creditCardData.cardMonth, creditCardData.cardYear);
  await pages.paymentPage.confirmPayment();
  await pages.paymentDonePage.validatePaymentDoneMessageShows(); // Validate order was placed
  await pages.paymentDonePage.continueAfterSuccessfulPayment();
  await pages.topNavBarPage.logOut();
  await pages.loginPage.fillExistentUserData(userData.userEmail, userData.userPassword);
  await pages.loginPage.logIn()
  await pages.topNavBarPage.validateLogoutButtonIsVisible();
  await pages.topNavBarPage.goToContactUs()
  await pages.contactUsPage.fillMessage(userData.firstName, userData.userEmail, "Just a subject", "Just some opinions")
  await pages.contactUsPage.submitMessage(); // This button is not working on the page, I just check it has been pressed
  await pages.topNavBarPage.logOut();

})