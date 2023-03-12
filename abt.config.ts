import { defineConfig } from "./src/config"

const config = defineConfig({
    wsEndpoint: '',
    noticationInfo: {
        tg: {
            bot_token: '',
            chat_id_or_user_id: ''
        }
    }
})

export default config