import { Locator, Page, expect } from '@playwright/test'
import {WhyInterestedOptions, HomeownerOptions} from '../utils/enums'

export class CostEstimationPage {
    page: Page
    costFormContainer: Locator
    zipInput: Locator
    nextStep1: Locator
    nextStep2: Locator
    nextStep3: Locator
    nextStep4: Locator
    nextStep5: Locator
    formStep2: Locator
    formStep2Option: (option: WhyInterestedOptions) => Locator
    formStep3: Locator
    formStep3Option: (option: HomeownerOptions) => Locator
    nameInput: Locator
    emailInput: Locator
    phoneInput: Locator
    curentStep: Locator
    totalSteps: Locator
    formStepSorry: Locator
    unavailableAreaMessage: Locator
    unavailableAreaSubmitMessage: Locator
    emailStepSorry: Locator
    nextStepSorry: Locator
    errorMessage: (elem: Locator) => Locator
    constructor(page: Page) {
        this.page = page
        this.costFormContainer = this.page.locator('#form-container-1')
        this.zipInput = this.costFormContainer.locator('input[name="zipCode"]')
        this.nextStep1 = this.costFormContainer.locator('button[data-tracking="btn-step-1"]')
        this.nextStep2 = this.costFormContainer.locator('button[data-tracking="btn-step-2"]')
        this.nextStep3 = this.costFormContainer.locator('button[data-tracking="btn-step-3"]')
        this.nextStep4 = this.costFormContainer.locator('button[data-tracking="btn-step-4"]')
        this.nextStep5 = this.costFormContainer.locator('button[data-tracking="btn-step-5"]')
        this.formStep2 = this.costFormContainer.locator('form[name="why_interested"]')
        this.formStep2Option = (option: WhyInterestedOptions) => this.page.locator(`#why-interested-${option}-1`)
        this.formStep3 = this.costFormContainer.locator('form[name="type_of_property"]')
        this.formStep3Option = (option: HomeownerOptions) =>   this.page.locator(`#homeowner-${option}-1`)
        this.nameInput = this.costFormContainer.locator('input[name="name"]')
        this.emailInput = this.costFormContainer.locator('input[name="email"][placeholder="Enter Your Email"]')
        this.phoneInput = this.costFormContainer.locator('input[name="phone"]')
        this.curentStep = this.costFormContainer.locator('span.stepProgress__stepCurrent')
        this.totalSteps = this.costFormContainer.locator('span.stepProgress__total')
        this.formStepSorry = this.costFormContainer.locator('div.step-sorry')
        this.unavailableAreaMessage = this.formStepSorry.locator('div.stepTitle__hdr:nth-child(1)')
        this.unavailableAreaSubmitMessage = this.formStepSorry.locator('div.stepTitle__hdr:nth-child(2)')
        this.emailStepSorry = this.formStepSorry.locator('input[name="email"]')
        this.nextStepSorry = this.formStepSorry.locator('button')
        this.errorMessage = (element: Locator) => element.locator('.. >> .. >> div.helpBlock')
    } 
    async getErrorMessage(element: Locator): Promise<string> {
      switch(element) {
        case this.emailInput: 
          return await element.evaluate((element) => (element as HTMLInputElement).validationMessage)
        default: 
          return await element.locator('.. >> .. >> div.helpBlock').innerText()
      }
    }
    async fillStep1(zip: string): Promise<void> {
       await this.zipInput.fill(zip)
       await this.nextStep1.click() 
    }
    async fillStep2(option: WhyInterestedOptions): Promise<void> {
       await this.formStep2Option(option).evaluate((element) => (element as HTMLInputElement).click())
       await this.nextStep2.click() 
     }
     async fillStep3(option: HomeownerOptions): Promise<void> {
        await this.formStep3Option(option).evaluate((element) => (element as HTMLInputElement).click() )
        await this.nextStep3.click() 
      }

    async fillStep4(name: string, email: string): Promise<void> {
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.nextStep4.click() 
      }
    async fillStep5(phone: string): Promise<void> {
        await this.phoneInput.fill(phone)
        await this.nextStep5.click() 
      }
    async fillStepSorry(email:string){
      await this.emailStepSorry.fill(email)
      await this.nextStepSorry.click()
    }
    async verifyProgressBarSteps(expectedCurent: string, expectedTotal: string): Promise<void>{
        await expect.soft(this.curentStep).toHaveText(expectedCurent)
        await expect.soft(this.totalSteps).toHaveText(expectedTotal)
    }
}