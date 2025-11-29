import  base  from '@playwright/test'
import { CostEstimationPage } from '../pages/cost-estimation.page'
import { LandingPage } from '../pages/landing.page'
import { ThankYouPage } from '../pages/thank-you.page'
type customFixtures = {
costForm: CostEstimationPage
landing: LandingPage
thankYou: ThankYouPage
}
const test = base.extend<customFixtures>({
    landing: [async({page}, use) => {
        const landingPage = new LandingPage(page)
        await landingPage.page.goto('/')
        await use(landingPage)
    }, { auto: true }],
    costForm: async({page}, use) => {
        const costFormPage = new CostEstimationPage(page)
        await use(costFormPage)
    },
    thankYou: async({page}, use) => {
        const thankYouPage = new ThankYouPage(page)
        await use(thankYouPage)
    }
})

export { test }
