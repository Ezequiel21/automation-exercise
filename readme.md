# Framework and structure

With the main task being the automation of the described user flow, my main focus was to set up the basic
structure and practices to be used in automating the site. I decided to use Playwright as it was one of
the technologies you use the most as I understand, and I have experience with it. I went with typescript as
a language to use the opportunity to come back to it a bit since my main language has always been Python,
although I use js frequently.

I went with a POM approach as it is universally useful as a base model to structure an automation project.
By thinking of each page as an object with properties and methods we can easily import them and interact with
them directly from each test case/suite, it's scalable and maintaneble, and provides the basic advantages of object oriented programming to an automation context.

# Tools

Besides Playwright and TS, the only extra dependency on the project is the Faker library to generate
realistic mock data in runtime.

# Scope, test plan and strategy

As I assume the main goal of the task is to show my automation practices (I e-mailed a question about this but as of 11/5/24
I haven't got a reply) I decided to automate the whole user flow end to end while performing basic validations along the way.

This is where this gets a little bit tricky since in general I wouldn't automate flows this long and with unrelated (at least
without more context) tasks one after the other. In the flow I see many potential separate test cases that could be a lot more atomic.
i.e.: 
* Creating a new user and then loging out and back in
* A regular flow of buying an item
* A variation where we create a new account and then buy (as I assume that getting a new customer to create an account and buy an item
without issues would be a very prioritary test product-wise)
* Pushing limitations in the various forms
* etc.

To move forward with the task I decided to simply automate the whole flow as one happy path test while doing basic validations. I am adding 
validations and steps as part of the POM pages since this is a small project, but normally for long term projects I would separate them in
other files.

## Pages

I decided to initialize the pages in a different file to avoid having to call them in every test suite. Then I extended the basic playwright
"test" class to contain them. This saves a lot of code specially in tests covering multiple pages.

## Data

I generated most of the data randomly at runtime with faker library, and created some generic functions to easily create it depending on 
common contexts. The approach to data is always extremely dependent on the nature of the project, environments, CI pipelines, etc.
i.e. I am hardcoding the web URL as this is the only one, but further abstraction would be required if we ran tests in 3 different envs for example.
In that case I would divide the data in env dependent files (CI, DEV, QA, STAGING, etc)

## Steps

I decided to not call specific operations directly, but use step functions inside the page object. This helps centralize and reuse
common operations. On the negative side it creates a constant questioning on how complex or long the steps should be, abstracting long
complex operations can save a lot of coding time but is less flexible, while abstracting small pieces is more customizable but risks redundancy
i.e. a function that only clicks a button seems a little redundant, but on the other hand helps to encapsulate the exact implementation.
My favorite approach is to have small steps and then create bigger more complex steps that use the small ones, but it seemed a little overkill 
for this project. If using this approach in a bigger project I would separate the steps from the page object to a specific steps object probably.

There's a lot of redundancy in this project as it is small, but I think this approach is useful in long term projects.

## Locators

In general I follow Playwright's practice of using it's own methods (like getByRole()) as much as possible, but this is always
extremely dependent on the nature of the project:
* Do we have access to dedicated automation ID's?
* Do texts or placeholder texts often change?
* Does the DOM structure change often or are there plans for it to change?
Just base in experience I avoided symbols when looking for texts and in some cases used careful xpath or css lookouts for some
elements, not as a full path but to help narrow down the playwright locators.

Also in some cases it can be worth to take some extra time making the locators more specific, for example looking for an element
that is a button with the "Accept" text might lead to problems if another button of that kind is added in the future.

There can also be an argument for an extra layer of abstraction, where we have the locator content strings as one variable
i.e. homeButton="Home", and then a function to actually get it i.e getHomeButton(homeButton);
This can help if we call the locator from multiple tests or steps, so if it changes the string will be centralized. But this seemed
a bit too much for the scope of the task.

## Variable names

As with anything, variable and function names are subject to a lot of refinement and reiteration often evolving specially at the early
stages of framework definition. I focused on maintaining consistency as it's in my opinion the most important point.

# Extra notes

The submit button in the "contact us" form didn't work. I can't know for sure if this is simply a site bug since it's a third
party webapp so I simply validated it is clickable and moved forward. Obviously in a real scenario this would be either a bug to
report or a situation to explore in depth (possible automation bug).

**I want to be absolutely clear in that I think this flow should not be a single test but I followed the instructions for the task simply automating the flow. The same goes for the validations, I did a couple basic ones through the flow, if separated in smaller tests I would get more thorough with validations, for example instead of just checking the "logout" button is visible after login, we could check we are actually logged by going to an account page or checking the user name somewhere in the page**

and teardown stages to guarantee encapsulation and no side effects, i.e.:
* Bypass login in tests that aren't about the login, for example passing a session.
* Creating users through an API and then deleting it after the test is run to avoid hardcoded data or creating it through UI 
* etc

For legibility I like tests calling higher scope functions that perform operations from a more user-like POV, as completing
a form or navigating somewhere, instead of calling low level operations like a "click"
This is so test cases remain legible and need little to no documentation and can be easily understood by team member not
involved in the technical implementations as managers, PO, etc.

I left only the chrome project activated to have it go quicker but obviously this depends on the approach of each project
how worth it is to test in the different browsers vs build execution time or other considerations.

Playwright complains about the test taking too much time and it's right, as the user flow is too long.

# Instructions

The only requirement would be node and then run:
```
npm install in the project root to install the requirements
```
then:
```
npx install playwright
```
to install the browsers. Then to run the tests:
```
npx playwright test
```
Can pass the 
```
--headed
```
parameter if it is desired to see the operations in the browser.