const { test } = require("../tools/testFixtures.ts")
import { DataGenerator } from "../tools/dataGenerators.ts";

// Blocking requests from googleads to avoid dealing with ads
test.beforeEach(async ({ page }) => {
  await page.route("**/*", route => {
    route.request().url().startsWith("https://googleads.") ?
      route.abort() : route.continue();
    return;
  })
})

test("Complete user flow", async ({ pages }) => {
  // Fake data
  const dataGenerator: DataGenerator = new DataGenerator();
  const creditCardData = await dataGenerator.creditCardInfo();
  const userData = await dataGenerator.userInfo();
  const randomCountry = dataGenerator.randomSignupCountry();

  await pages.homePage.goTo();
  await pages.homePage.scrollToProductAndClick(20); // Passing a number that is around the half of the page, 
  //generating this data would depend on specific requirements, how much products are normally there, 
  //setups that we use to add those products, etc.
  await pages.detailsPage.buyQuantityOfItem("30");
  await pages.viewCartPage.validateCorrectProductQuantity("30")
  await pages.viewCartPage.proceedToCheckout();

  await pages.viewCartPage.registerNewUser();
  await pages.loginPage.validateLoginOptionsHeadersVisible()
  await pages.loginPage.fillNewUserData(userData.firstName, userData.userEmail);
  await pages.loginPage.signUp();
  await pages.signupPage.validateEnterAccountInformationHeaderVisible();
  await pages.signupPage.fillRequiredFields(userData.firstName, userData.userPassword, userData.firstName, userData.lastName, userData.address, randomCountry, userData.state, userData.city, userData.zipCode, userData.mobileNumber);
  await pages.signupPage.pressCreateAccount();
  await pages.accountCreatedPage.pressContinueButton();
  await pages.topNavBarPage.validateLogoutButtonIsVisible();

  await pages.topNavBarPage.goToCart();
  await pages.viewCartPage.proceedToCheckout();
  await pages.checkoutPage.writeComment("Hello there!");
  await pages.checkoutPage.placeOrder();
  await pages.paymentPage.fillPaymentInfo(userData.firstName, creditCardData.cardNumber, creditCardData.CVC, creditCardData.cardMonth, creditCardData.cardYear);
  await pages.paymentPage.confirmPayment();
  await pages.paymentDonePage.validatePaymentDoneMessageShows();
  await pages.paymentDonePage.continueAfterSuccessfulPayment();

  await pages.topNavBarPage.logOut();
  await pages.loginPage.fillExistentUserData(userData.userEmail, userData.userPassword);
  await pages.loginPage.logIn()
  await pages.topNavBarPage.validateLogoutButtonIsVisible();
  
  await pages.topNavBarPage.goToContactUs()
  await pages.contactUsPage.fillMessage(userData.firstName, userData.userEmail, "Just a subject", "Just some opinions")
  await pages.contactUsPage.submitMessage(); // This button is not working on the page, I just check that it has been pressed and continue.
  await pages.topNavBarPage.logOut();

})