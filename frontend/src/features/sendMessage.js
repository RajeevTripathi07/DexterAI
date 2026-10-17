import React from 'react'
import api from '../../utils/axios.js'

const sendMessage = async (payload) => {
    // console.log("send message clicked")
    try {
        const { data } = await api.post("/api/agent/chat", payload)
        return data
    } catch (error) {
        console.log(`Error sending message: ${error}`)
        return null
    }
}

export default sendMessage
