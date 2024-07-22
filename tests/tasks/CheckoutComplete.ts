import { Locator, Page, expect } from "@playwright/test"

export class CheckoutComplete {

     private readonly checkImage: Locator
    private readonly thanksMsj: Locator
    private readonly orderMsj: Locator
    private readonly backHomeButton: Locator
        
    //Localización de elementos en el constructos
    constructor(page: Page) {
        this.checkImage = page.locator('//*[@id="checkout_complete_container"]/img')
        this.thanksMsj = page.locator('xpath=//*[@id="checkout_summary_container"]/div/div[2]/div[1]')
        this.orderMsj = page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[3]')
        this.backHomeButton = page.getByRole('button',{name:'Back Home'})
    }

   async checkImageVisible(){
        await expect(this.checkImage).toBeVisible()   
    }

    async checkThanksMsjVisible(){
        await expect(this.thanksMsj).toBeVisible()   
    }

    async checkOrderMsjVisible(){
        await expect(this.orderMsj).toBeVisible()   
    }

    async checkBackHomeButtonVisible(){
        await expect(this.backHomeButton).toBeVisible()   
    }  

}