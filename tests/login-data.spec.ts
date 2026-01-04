import {test, expect} from '@playwright/test'
import { LoginData, readFileFromCsv } from '../utils/csvReader'
import { LoginPage } from '../pages/LoginPage'

// đọc file csv 
const testData: LoginData[] = readFileFromCsv()
console.log(`Đã load ${testData.length} dòng dữ liệu từ file CSV`)

test.describe ("Login Data from CSV", () => {
    for(let data of testData) {
        test(`${data.description}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            await loginPage.login(data.username, data.password)
            const isSuccess = await loginPage.isLoginSuccessfull()
            if(data.expected_result === "success") {
                expect(isSuccess).toBeTruthy()
            } else {
                expect(isSuccess).toBeFalsy()
            }
        })
    }
})