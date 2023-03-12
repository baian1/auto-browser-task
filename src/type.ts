import { Browser, BrowserContext, BrowserContextOptions } from 'playwright'

export type StorageState = BrowserContextOptions["storageState"]

export interface ConfigInterface {
  wsEndpoint: string
  noticationInfo: {
    tg: {
      bot_token: string
      chat_id_or_user_id: string
    }
  }
}