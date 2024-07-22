import { Page } from "@playwright/test"
import { LoginUI } from "../userinterfaces/LoginUI"


export class Login {

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }   

    async fillUsername(username: string) {
        await this.page.fill(LoginUI.TXT_USERNAME, username)
    }

    async fillPassword(password: string) {
        await this.page.fill(LoginUI.TXT_PASSWORD, password)
    }

    async clickOnLogin() {
        await this.page.click(LoginUI.BTN_LOGIN);
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLogin()        
    }
}