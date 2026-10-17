import { checkAgentLimit } from "../config/agentLimits.js"
import { searchTool } from "../config/tavily.js"
import { deductCredits } from "../utils/deductCredits.js"

export const searchAgent = async (state) => {
    try {
        await checkAgentLimit(state.userId, "search")

        const results = await searchTool.invoke({
            query: state.prompt
        })
        await deductCredits(state.userId, "search")

        // console.log(results)
        return {
            ...state,
            searchResults: results || [],
            images: results.images
        }
    } catch (error) {
        console.log(`Error searchAgent: ${error}`)
       return {
            ...state,
            aiResponse: error?.data?.message || "Failed to search online",
            searchResults: results || [],
            images: []
        }
    }
}