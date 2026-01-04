import {Page, Locator} from '@playwright/test'

export class LoginPage {
    // locator
    readonly page: Page ; // Page object giup tuong tac voi trang web
    readonly usernameInput: Locator 
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly homeTitle: Locator // verify login thanh cong

    // function: login, validate
    constructor(page: Page) { // ham khoi tao
        this.page = page;

        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.locator('button[type="submit"]')

    }

    async login(username: string, password: string): Promise<void> {
        // đợi vài giây để load trang
        await this.page.waitForTimeout(3000)
        // b1: navigate vao web page login 
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login?fbclid=IwY2xjawPFssxleHRuA2FlbQIxMABicmlkETFsZXZFMGVVN3c2MGt6emUyc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHuyMmWwED31IL3qCpB3VbaNqTzUfZkXJ3Ekv8S2Dx22-soe5d8tZ9L7ISfvK_aem_VLHDKUCf909XvRJgYMmS8A")
        // b2: fill username vao input 
        await this.usernameInput.fill(username)

        // b3: fill password vao input
        await this.passwordInput.fill(password)

        // b4: enter nut login 
        await this.loginButton.click()
        
    }

    async isLoginSuccessfull(): Promise<boolean> {
        //  case 1: test URL co chu dashboard
        let url = this.page.url();
        return url.includes("dashboard")


    }

}
