import { outputFile, readFile } from 'fs-extra'
import { resolve } from 'path'
import { loginedUserPath } from './utils'
import type { StorageState } from './type'

export const userInfo = {
  async create(name: string, cookies: StorageState) {
    await outputFile(resolve(loginedUserPath, `./${name}.json`), JSON.stringify(cookies))
  },
  async load(name: string): Promise<StorageState> {
    return JSON.parse((await readFile(resolve(loginedUserPath, `./${name}.json`))).toString()) as any
  }
}