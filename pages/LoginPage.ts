import {Page, Locator} from '@playwright/test'
import { highLightAndScreenshot } from '../utils/screenshot';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator 
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.locator('button[type="submit"]')
    }

    async login(username: string, password: string): Promise<void> {
        // Navigate to login page
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
        // Đợi page load xong
        await this.page.waitForLoadState('networkidle')
        
        // Fill username
        await this.usernameInput.fill(username)
        await highLightAndScreenshot(this.page, this.usernameInput, "loginTest", "fill_username")

        // Fill password
        await this.passwordInput.fill(password)

        // Click login và đợi navigation
        await highLightAndScreenshot(this.page, this.loginButton, "loginTest", "click_login_btn")
        
        // Click và đợi điều hướng hoặc đợi response
        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            this.loginButton.click()
        ])
        
        // Đợi thêm chút để đảm bảo URL đã update
        await this.page.waitForTimeout(2000)
    }

    async isLoginSuccessfull(): Promise<boolean> {
        try {
            // Kiểm tra URL có chứa dashboard
            const url = this.page.url();
            const hasaDashboard = url.includes("dashboard");
            
            // Hoặc kiểm tra thêm element đặc trưng của dashboard page
            const dashboardElement = this.page.locator('h6:has-text("Dashboard")');
            const isVisible = await dashboardElement.isVisible();
            
            return hasaDashboard;
        } catch (error) {
            console.error('Error checking login success:', error);
            return false;
        }
    }
}