import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js"
import fs from "fs/promises"
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimits.js";

export const imageAnalyzer = async (state) => {
    // console.log("ImageAnalyzer")
    try {
        await checkAgentLimit(state.userId, "image")

        const llm = await getModel("imageAnalyzer");
        // console.log({llm})
        const imageBuffer = await fs.readFile(state.file.path)
        // console.log({imageBuffer})
        const base64Image = imageBuffer.toString("base64")
        // console.log({base64Image})

        const messages = [
            new SystemMessage(
                `You are DexterAI image analyzer agent.
                
                Rules:
                
                - Analyze only the uploaded image.
                - Answer the user's question accurately.
                - If text exists in the image, extract it.
                - If charts or tables exists, explain them.
                - If something is unclear, say so.
                - Use Markdown when helpful.
                - Do not hallucinate`
            ),

            new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: state.prompt || "Analyze the image"
                    },
                    {
                        type: "image_url",
                        "image_url": {
                            url: `data:${state.file.mimeType};base64,${base64Image}`
                        }
                    }
                ]
            })
        ]

        const response = await llm.invoke(messages)
        console.log({ response })

        await deductCredits(state.userId, "vision")
        return {
            ...state,
            aiResponse: response.content
        }
    } catch (error) {
        console.log(`imageAnalyzer error: ${error}`)
        return {
            ...state,
            aiResponse: error?.data?.message || "Failed to analyze image"
        }
    }
    finally {
        await fs.unlink(state.file.path)
    }
}