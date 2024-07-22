import { Locator, Page, expect } from "@playwright/test"
import { ClientInformationUI } from "../userinterfaces/ClientInformationUI";

export class ClientInformation {

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }  

    /*private readonly firstNameTextbox: Locator
    private readonly lastNameTextbox: Locator
    private readonly postalCodeTextbox: Locator  
    private readonly continueButton: Locator
    
    //Localización de elementos en el constructos
    constructor(page: Page) {
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.postalCodeTextbox = page.getByRole('textbox', { name: 'Zip/Postal Cod' })
        this.continueButton = page.getByRole('button', { name: 'Continue' })
       // this.shoppingCartIcon = page.locator("xpath=//a[contains(@class, 'shopping_cart_link')]")*/

       
    async fillFirstName(firstname: string) {
        await this.page.fill(ClientInformationUI.TXT_FIRSTNAME, firstname)
    }

    async fillLastName(lastname: string) {
        await this.page.fill(ClientInformationUI.TXT_LASTNAME, lastname )
    }

    async fillPostalCode(postalcode: string) {
        await this.page.fill(ClientInformationUI.TXT_POSTALCODE,postalcode )
    }

    async clickOnContinue() {
        await this.page.click(ClientInformationUI.BTN_CONTINUE)
    }

    async fillClientInformation(firstname: string, lastname: string, postalcode: string) {
        await this.fillFirstName(firstname)
        await this.fillLastName(lastname)
        await this.fillPostalCode(postalcode)
        await this.clickOnContinue()        
    }

   /*async checkContinueBtnVisible(){
        await expect(this.continueButton).toBeVisible()
    }*/

}