import { defineTaskInfo } from "../src/taskFactory";
import { BrowserContext, Page } from 'playwright'
import { sendMessage } from "../src/notication";

async function sendMessageToChall(page: Page, chall: string, text: string) {
  await page.locator(`text=${chall}`).click()
  const inputEle = page.locator('div[data-placeholder="Message"]')
  await inputEle.click()
  await inputEle.type(text, { delay: 100 })
  await page.keyboard.press('Enter');
}

async function waitLogin(page: Page) {
  await page.waitForFunction(() => {
    return !!document.evaluate("//*[contains(text(), 'Personal')]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
  }, {}, {})
}

export default defineTaskInfo({
  name: '加速器签到',
  async login(browser) {
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://web.telegram.org/", { timeout: 120 * 1000 })
    await waitLogin(page)
    let storageInfo = await page.context().storageState()
    await context.close();
    return storageInfo
  },
  async validateIsLogined(context) {
    const page = await context.newPage();
    await page.goto("https://web.telegram.org/")
    try {
      await waitLogin(page)
      return true
    } catch (e) {
      return false
    } finally {
      page.close()
    }
  },
  async runner(context) {
    const page = await context.newPage();
    try {
      console.log('开始登陆')
      await page.goto("https://web.telegram.org/", { timeout: 120 * 1000 })
      await waitLogin(page)
      console.log('登陆成功')

      // await page.locator('text="OK"').click()
      console.log('开始发送消息')
      if (page) {
        await sendMessageToChall(page, 'SockBoom 咕咕', '/checkin@sockboom2_bot');
      }
      sendMessage('翻墙签到成功')
      // await page.screenshot({
      //   path: "./res.png",
      // });
    } finally {
      await page.close()
    }
  },
  cronTime: '0 0 8 * * *'
})
