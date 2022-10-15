import{test,expect} from "@playwright/test"
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
import{loadHomepage,assertTitle} from "../helper"

test("Simple basic test",async({page})=>{

    //npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html
    // npx playwright test --config=playwright.config.ts --project=Chromium
    await page.goto("http://example.com/")
    await delay(2000);
    const pageTitle=await page.locator("//h1[normalize-space()='Example Domain']")
    await delay(2000);
    await expect(pageTitle).toContainText("Example Domain")
    await expect(pageTitle).toBeVisible();
    await delay(2000);
})
test("Click on Elements",async({page})=>{

    await delay(2000);
    await page.goto("http://zero.webappsecurity.com/")
    await delay(2000);
    await page.click("//button[@id='signin_button']")
    await delay(2000);
    await page.click("//input[@name='submit']")
    await delay(2000);
    const errorMessage=await page.locator("//div[@class='alert alert-error']")
    await delay(2000);
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
    await delay(2000);

})
test("Working with elements",async({page})=>{

    await delay(2000);
    await page.goto("http://zero.webappsecurity.com/")
    await delay(2000);
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
test("Assertions @myTag",async({page})=>{
    //specific test is executing
    //npx playwright test -g "Assertions" --headed 
    await page.goto("http://example.com/")
    await delay(2000);
    await expect(page).toHaveURL("http://example.com/")
    await delay(2000);
    await expect(page).toHaveTitle("Example Domain")
    await delay(2000);
    const element=await page.locator("h1")
    await delay(2000);
    await expect(element).toBeVisible()
    await delay(2000);
    await expect(element).toHaveText("Example Domain")
    await delay(2000);
    await expect(element).toHaveCount(1)
    await delay(2000);

    const nonExistingElement=await page.locator("h5")
    await expect(nonExistingElement).not.toBeVisible()
})
test("Screenshots",async({page})=>{

    await page.goto("http://example.com/")
    await page.screenshot({path:"screenshot.png",fullPage:true})

})

test.describe("Hooks",()=>{
    test.beforeEach(async({page})=>{
        await page.goto("http://example.com/")
    })
     test("screenshots",async({page})=>{
        await page.screenshot({path:"screenshot.png",fullPage:true})
     })
     test("Screendhot one element ",async({page})=>{
        const ele=await page.locator("h1")
        await ele.screenshot({path:"Single_element_screenshot1.png"})
     })
})

test("Custom helper",async({page})=>{

    await loadHomepage(page)
    await assertTitle(page)

})