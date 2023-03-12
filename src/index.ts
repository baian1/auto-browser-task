import { CronJob } from 'cron'
import fs from 'fs/promises'
import { resolve } from 'path'
import { Task } from './taskFactory'
import { getBrowser, tasksFolderPath } from './utils'
import { userInfo } from './userInfo'

async function getTasks() {
  const taskFilePaths: string[] = await fs.readdir(tasksFolderPath).then((files) => {
    return files.map(f => resolve(tasksFolderPath, f))
  })
  const tasks = await Promise.all(taskFilePaths.map(async path => {
    return (await import(path)).default as Task
  }));

  return tasks
}

export async function startTask() {
  const browser = await getBrowser()
  const tasks = await getTasks()
  const jobs = tasks.map(task => {
    console.log(`启动任务 ${task.name}:时间(${task.cronTime})`)
    const job = new CronJob(task.cronTime, async () => {
      const storageState = await userInfo.load(task.name);
      const context = await browser.newContext({ storageState });
      try {
        await task.validateIsLogined(context)
        await task.runner(context)
      } finally {
        await context.close()
      }
    }, null, true, undefined, undefined, false)

    return job;
  })
  return jobs
}

export async function login() {
  const browser = await getBrowser()
  const tasks = await getTasks()
  for (let task of tasks) {
    const data = await task.login(browser)
    await userInfo.create(task.name, data)
  }
  await browser.close()
}

// login().catch(async e => {
//   if (e instanceof Error) {
//     await sendMessage(e.message)
//   }
//   throw e
// });
