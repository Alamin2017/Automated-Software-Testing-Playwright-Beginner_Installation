import{test,expect} from "@playwright/test"
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
test.describe("Login/Logout",()=>{
//npx playwright test --config=e2e.config.ts --project=Chromium --headed
        test.beforeEach(async({page})=>{
            await page.goto("http://zero.webappsecurity.com/")
        })
         test("Negative scenario for login",async({page})=>{
            await page.click("//button[@id='signin_button']")
            await delay(2000);
            await page.type("//input[@id='user_login']","some username")
            await delay(2000);
            await page.type("//input[@id='user_password']","somepassword")
            await delay(2000)
            await page.click("//input[@name='submit']")
            await delay(2000);
            const errorMessage=await page.locator("//div[@class='alert alert-error']")
            await delay(2000);
            await expect(errorMessage).toContainText("Login and/or password are wrong.")
            await delay(2000);
         })
         test("positive scenario for login ",async({page})=>{
            await page.click("//button[@id='signin_button']")
            await delay(2000);
            await page.type("//input[@id='user_login']","username")
            await delay(2000);
            await page.type("//input[@id='user_password']","password")
            await delay(2000)
            await page.click("//input[@name='submit']")
            await delay(2000);
         })

})