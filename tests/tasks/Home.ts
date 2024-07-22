import { Locator, Page, expect } from "@playwright/test"
import { Helpers } from "../util/Helpers"

export class Home {

    private readonly shoppingCartIcon: Locator
    private readonly productsTitle: Locator
  
    constructor(page: Page) {
       this.shoppingCartIcon = page.locator("xpath=//a[contains(@class, 'shopping_cart_link')]")
       this.productsTitle = page.locator("xpath=//*[@id='header_container']/div[2]/span")     
    }

    async checkSuccessfulLogin(){
        await expect(this.shoppingCartIcon).toBeVisible()
    }

    async checkProductTitle (){
           await expect(this.productsTitle).toBeVisible()
           await expect(this.productsTitle).toContainText(Helpers.TITLE_PRODUCT)
    }

}
