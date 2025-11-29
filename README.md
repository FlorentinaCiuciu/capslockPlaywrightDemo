# UI testing using Playwright and Typescript for Capslock demo landing page

### How to run tests:
In a terminal run the following commands:
1. Clone the repository locally: 
```bash 
$ git clone <path>
```
2. Move to the repository folder and install dependencies: 
```bash
   $ cd <path_to_repo>
   $ npm install
   $ npx playwright install
```
3. Execute desired suite defined in package.json scripts:
```bash
// run all tests
$ npm run tests

// run regression tests
$ npm run regression

// run smoke tests
$ npm run smoke
```
### Framework structure:
- **setup**: folder for custom fixtures and setup script - these are used for all tests prerequisites
- **pages**: framework page objects
- **test-data**: folder for test data files - example: input test data or expected messages/texts from page
- **utils**: folder containing helper files like enums, types etc;
- **tests**: folder containing all framework tests;


### Notes
**Why I selected these scenarios:**

Cost estimation form represents the main bussiness logic of the landing page, so we need to make sure the happy path(form can be successfully submited) is validated - in this way we can connect with our potential customers.

All other scenarios represent negative test cases that have as purpose to ensure form cannot be submitted with invalid data.

The covered scenarios are just a small subset of all the tests that need to be performed within this form - their scope was only to demonstrate how I would tackle diffrent positive/negative tests in a form.

Note: while developing the tests I considered cost estimation form is unique in the landing page( the curent state with 2 identical cost forms seems a bug). Still, if the desired bussiness logic is to have 2 identical forms in the same page, and if we plan to write different tests for them, then the only change that needs to be done is in CostEstimationPage class, fillStep methods should be updated to receive as parameter the form we want to fill, and element's locators to specify the desired form

Besides the covered tests, also some layout( texts, images/videos) validation needs to be performed.
Curently,for demo purpuses, scripts were developed and tested on Chrome browser, but in a live automated framework these tests need to be executed on different browsers and mobile screen resolutions.

**What improvements could be made to make the test project more scalable and
maintainable**
- In case this landing page is deployed on multiple environments we need to extract the base_url into a config .env file
- in practice, probabliy the framework will cover multiple independent landing pages, in this case the following changes needs to be done: 
    - base_url should be extracted in .env file; playwright.config projects should be configured for each langing page; 
    - base.fixture should be split into multiple fixtures for each landing page; 
    - a base_page class should be created( that is extended by all page object classes). 
    - all folders tests, pages, test-data need to be organized with sub-folders for each landing page
    - add tags specific to each landing page and define scrips in package.json file for better test execution and organization

**Additional improvements**
 - landing page DOM needs to be inspected an some ids can be added in order to locate elements easier
 - common patterns for same categories of actions: for example email validation is different than zip,name validation
 - bussiness improvement: cost estimation form is too low in the page, in order to attract faster new customers, the form should be visible from top of page, or easly reachable for people reaching the page
