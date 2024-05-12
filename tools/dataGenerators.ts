import { faker } from "@faker-js/faker";

export class DataGenerator {

    readonly countries: Array<string> = ["India", "United States", "Canada", "Australia", "Israel", "New Zealand", "Singapore"];

    async creditCardInfo() {
        return {
            cardNumber: faker.finance.creditCardNumber(),
            CVC: faker.finance.creditCardCVV(),
            cardMonth: faker.number.int({ min: 1, max: 12 }).toString(),
            cardYear: faker.number.int({ min: 2020, max: 2050 }).toString(),
        }
    }

    async userInfo() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            userPassword: faker.internet.password(),
            address: faker.location.streetAddress(),
            state: faker.location.state(),
            city: faker.location.city(),
            zipCode: faker.location.zipCode(),
            mobileNumber: faker.phone.number(),
            userEmail: faker.internet.email()
        }
    }

    async randomSignupCountry() {
        return this.countries[Math.floor(Math.random() * this.countries.length)]
    }
}