import { Locator, Page, expect } from "@playwright/test"

export class CheckoutSummary {

    private readonly paymentInfoLabel: Locator
    private readonly shippingInfoLabel: Locator
    private readonly priceTotalLabel: Locator
    private readonly finishButton: Locator
    
    //Localización de elementos en el constructos
    constructor(page: Page) {
        this.paymentInfoLabel = page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[1]')
        this.shippingInfoLabel = page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[3]')
        this.priceTotalLabel = page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[5]')
        this.finishButton = page.getByRole('button', { name: 'Finish' })
        
       
    }

    async checkPaymentLblVisible(){
        await expect(this.paymentInfoLabel).toBeVisible()
    }

    async checkShippingLblVisible(){
        await expect(this.shippingInfoLabel).toBeVisible()
    }

    async checkPriceTotalLblVisible(){
        await expect(this.priceTotalLabel).toBeVisible()
    }

    async clickOnFinish() {
        //await expect(this.finishButton).toBeVisible()
        await this.finishButton.click()
    }

}