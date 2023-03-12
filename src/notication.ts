import TelegramBot from "node-telegram-bot-api"
import { getConfig } from "./config"

const noticationInfo = getConfig().noticationInfo

const bot_token = noticationInfo.tg.bot_token
const chat_id_or_user_id = noticationInfo.tg.chat_id_or_user_id

const bot = new TelegramBot(bot_token)

/**
 * 注册需要发送通知的服务
 */
export function register() {

}

/**
 * 给通知发送信息
 */
export async function sendMessage(text: string) {
  return await bot.sendMessage(chat_id_or_user_id, text)
}