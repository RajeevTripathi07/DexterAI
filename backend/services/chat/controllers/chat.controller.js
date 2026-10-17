import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        // console.log({ userId })
        const conversation = await Conversation.create({
            userId: userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        console.log(`creating conversation error in backend: ${error}`)
        return res.status(500).json({ message: `creating conversation error in backend: ${error}` })
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"]
        // console.log({ userId })
        const conversations = await Conversation.find({ userId: userId }).sort({ updatedAt: -1 })
        res.status(200).json(conversations)
    } catch (error) {
        console.log(`getting conversations error in backend: ${error}`)
        return res.status(500).json({ message: `getting conversations error in backend: ${error}` })
    }
}

export const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body;
        const conversation = await Conversation.findByIdAndUpdate(id, { title })
        return res.status(200).json(conversation)
    } catch (error) {
        console.log(`updating conversation error in backend: ${error}`)
        return res.status(500).json({ message: `updating conversation error in backend: ${error}` })
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content, images, artifacts } = req.body;
        const message = await Message.create({
            conversationId,
            content,
            role,
            images,
            artifacts
        })
        return res.status(200).json(message)
    } catch (error) {
        console.log(`Saving message error in backend: ${error}`)
        return res.status(500).json({ message: `Saving message error in backend: ${error}` })
    }
}

export const getMessages = async (req, res) => {
    try {
        // console.log("entered get mesages")
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        // console.log("exited get mesages")

        return res.status(200).json(messages)
    } catch (error) {
        console.log(`getting messages error in backend: ${error}`)
        return res.status(500).json({ message: `getting messages error in backend: ${error}` })
    }
}
