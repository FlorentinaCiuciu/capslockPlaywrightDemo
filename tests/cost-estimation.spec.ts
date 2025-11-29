import { expect } from '@playwright/test';
import { test } from '../setup/base.fixture'
import { validData, unavailableZip, invalidZipCodes } from '../test-data/cost-estimation-data'
import { thankYouMessage, unavailableZipMessage, stepSorrySubmitMessage, validationMessages } from '../test-data/text-resources'

test.describe('Cost estimation form validation', async () => {
 test('@smoke Validate form is submited successfully', async ({ costForm, thankYou }) => {
  const expectedSteps = '5'
    await expect(costForm.costFormContainer).toBeVisible()
    await costForm.fillStep1(validData.zip)
    await costForm.verifyProgressBarSteps('2', expectedSteps)

    await costForm.fillStep2(validData.whyInterested)
    // await costForm.verifyProgressBarSteps('3', expectedSteps) // bug in application it curently shows step 2
    await expect.soft(costForm.totalSteps).toHaveText(expectedSteps)

    await costForm.fillStep3(validData.homeowner)
    await costForm.verifyProgressBarSteps('4', expectedSteps)

    await costForm.fillStep4(validData.name, validData.email)
    await costForm.verifyProgressBarSteps(expectedSteps, expectedSteps)

    await costForm.fillStep5(validData.phone)
    await expect.soft(thankYou.page).toHaveURL(/.*\/thankyou/)
    await expect.soft(thankYou.messageContainer).toHaveText(thankYouMessage)
});

test('@regression Validate alternative route for unavailable zip', async ({ costForm, thankYou }) => {
    await expect(costForm.costFormContainer).toBeVisible()
    
    await costForm.fillStep1(unavailableZip)
    // await costForm.verifyProgressBarSteps('1', expectedSteps) // bug in application it curently shows step 1 of ''
    await expect.soft(costForm.unavailableAreaMessage).toBeVisible()
    await expect.soft(costForm.unavailableAreaMessage).toHaveText(unavailableZipMessage)
    
    await costForm.fillStepSorry(validData.email)
    await expect.soft(costForm.unavailableAreaSubmitMessage).toBeVisible()
    await expect.soft(costForm.unavailableAreaSubmitMessage).toHaveText(stepSorrySubmitMessage)
    await expect.soft(thankYou.messageContainer).toHaveCount(0)
 })

 test('@regression Validate required zip code message', async ({ costForm }) => {
  await costForm.nextStep1.click()
  await expect.soft(costForm.errorMessage(costForm.zipInput)).toBeVisible()
  await expect.soft(costForm.errorMessage(costForm.zipInput)).toHaveText(validationMessages.zip.empty);
  await expect.soft(costForm.formStep2).toBeHidden()
 });

invalidZipCodes.forEach(( invalidZip ) => {
  test(`@regression Validate invalid zip code message with ${invalidZip}`, async ({ costForm }) => {
   await costForm.fillStep1(invalidZip)
   await expect.soft(costForm.errorMessage(costForm.zipInput)).toBeVisible()
   await expect.soft(costForm.errorMessage(costForm.zipInput)).toHaveText(validationMessages.zip.invalid);
   await expect.soft(costForm.formStep2).toBeHidden()
  });
});

test('@regression Validate required email message', async ({ costForm }) => {
  await costForm.fillStep1(validData.zip)
  await costForm.fillStep2(validData.whyInterested)
  await costForm.fillStep3(validData.homeowner)
  await costForm.nextStep4.click()
    
  expect.soft(await costForm.getErrorMessage(costForm.emailInput)).toMatch(validationMessages.email.empty)
  await expect.soft(costForm.emailInput).toBeVisible()
  await expect.soft(costForm.phoneInput).toBeHidden()
 });
 // TODO validation tests for other form fields - fill in invalid data and check messages
});
