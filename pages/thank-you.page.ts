import { Locator, Page } from '@playwright/test'

export class ThankYouPage {
    page: Page
    messageContainer: Locator
    constructor(page: Page) {
        this.page = page
        this.messageContainer = this.page.locator('div.heroThankYou')   
    }
}