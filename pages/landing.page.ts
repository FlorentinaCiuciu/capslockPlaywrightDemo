import { Locator, Page } from '@playwright/test'

export class LandingPage {
    page: Page
    locationContainer: Locator
    constructor(page: Page) {
        this.page = page
        this.locationContainer = this.page.locator('div.location')
        // TODO map other elements   
    }
}