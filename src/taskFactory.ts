import { Browser, BrowserContext, BrowserContextOptions } from 'playwright'

export interface Task {
  name: string
  /**
   * 执行时间
   */
  cronTime: string,
  /**
   * 登入服务
   */
  login: (browser: Browser) => Promise<BrowserContextOptions["storageState"]>,
  /**
   * 校验登入服务
   */
  validateIsLogined: (context: BrowserContext) => Promise<boolean>,
  /**
   * 运行任务
   */
  runner: (context: BrowserContext) => Promise<void>,
}

export function defineTaskInfo(obj: Task) {
  return obj;
}