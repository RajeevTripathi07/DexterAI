import React from 'react'
import api from '../../utils/axios.js'

const getMessages = async (id) => {
    // console.log("getMessages called with id:", id); // Debugging line
    try {
        const { data } = await api.get(`/api/chat/get-messages/${id}`)
        return data
    } catch (error) {
        console.log(`Error getting messages: ${error}`)
        return []
    }
}

export default getMessages
