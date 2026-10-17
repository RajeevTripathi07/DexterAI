import { getModel } from "../config/llmModels.js";

export const router = async (state) => {

    if (state.agent && state.agent !== "auto") {
        return {
            ...state,
            agent: state.agent
        }
    }
    if (state.file) {
        if (state.file?.mimetype == "application/pdf") {
            return {
                ...state,
                agent: "pdfRag"
            }
        }
        if (state.file?.mimetype.startsWith("image/")) {
            return {
                ...state,
                agent: "imageAnalyzer"
            }
        }
    }

    const llm = await getModel("router");

    const prompt = `You are an expert agent router. 
Analyze the user's query and route it to the most appropriate agent.

AVAILABLE AGENTS:
- chat: General conversation, explanations, learning, and general questions.
- search: Current events, latest information, news, recent developments, and internet lookups.
- coding: Generate code, debug code, build projects, software architecture, and API design.
- pdf: Generating PDFs, asking questions about PDFs, or document context.
- ppt: Generating PowerPoint presentations, creating slides, or presentation context.
- vision: Generating images, creating artwork, or visual design.

STRICT OUTPUT RULES:
1. You must return EXACTLY ONE WORD.
2. Choose only from this list: chat, search, coding, pdf, ppt, vision.
3. NO punctuation, NO markdown, NO explanations.
4. If the query does not clearly fit a specialized agent, default to: chat

User query:
${state.prompt}`

    const response = await llm.invoke(prompt)

    console.log(response.content)

    return {
        ...state,
        agent: response.content.trim().toLowerCase()
    }
}