import { expect, it } from "vitest";
import { userInfo } from "../../src/userInfo";
import { getBrowser } from "../../src/utils";
import tgTask from '../../tasks/tg'


it('login', async () => {
  const browser = await getBrowser()
  await tgTask.login(browser)
  const context = await browser.newContext({ storageState: await userInfo.load(tgTask.name) });
  expect(await tgTask.validateIsLogined(context)).equal(true)
}, 120 * 1000)

it.only('task runner', async () => {
  const browser = await getBrowser()
  const context = await browser.newContext({ storageState: await userInfo.load(tgTask.name) });
  await expect(async () => await tgTask.runner(context)).rejects.not.toThrow()
}, 120 * 1000)