import { resolve } from "path";
import { Browser, chromium } from "playwright";
import config from "../abt.config";

export async function getBrowser(wsEndpoint: string = config.wsEndpoint) {
  let browser: Browser;
  if (wsEndpoint) {
    browser = await chromium.connect(
      wsEndpoint
    );
  } else {
    browser = await chromium.launch()
  }
  return browser
}

export const rootPath = process.cwd()
export const tasksFolderPath = resolve(rootPath, './tasks');
export const cachePath = resolve(rootPath, '.auto-browser-tasks')
export const loginedUserPath = resolve(cachePath, './loginedUser')