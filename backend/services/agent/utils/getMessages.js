import axios from "axios"

export const getMessages = async (conversationId) => {
    try {
        console.log("getmessages from utils")
        const {data} = await axios.get(`${process.env.CHAT_SERVICE}/get-messages/${conversationId}`)
        console.log(data)
        return data
    } catch (error) {
        console.log(`Error getting messages: ${error}`)
        return null
    }
}