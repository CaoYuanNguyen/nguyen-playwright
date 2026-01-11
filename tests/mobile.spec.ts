import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'

// describe: tạo cụm test case
test.describe("Mobile Login Tests", () => {
    test("Test login thành công", async ({page}) => {
        await page.setViewportSize({width: 375, height: 667});
        const loginPage = new LoginPage(page)

        await loginPage.login('Admin', 'admin123')

        await loginPage.isLoginSuccessfull()
    })

    test("Test login thất bại", async ({page}) => {
        await page.setViewportSize({width: 375, height: 667});
        const loginPage = new LoginPage(page)

        await loginPage.login('wronguser', 'wrongpass')

        await loginPage.isLoginSuccessfull() === false
    })
})