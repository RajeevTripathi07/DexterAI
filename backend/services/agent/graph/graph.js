import { END, START, StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { visionAgent } from "../agents/vision.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pdfRag } from "../agents/pdfRag.agent.js";
import { imageAnalyzer } from "../agents/imageAnalyzer.agent.js";

const workflow = new StateGraph(agentState)

workflow.addNode("router", router)
workflow.addNode("chat", chatAgent)
workflow.addNode("coding", codingAgent)
workflow.addNode("pdf", pdfAgent)
workflow.addNode("ppt", pptAgent)
workflow.addNode("vision", visionAgent)
workflow.addNode("search", searchAgent)
workflow.addNode("imageAnalyzer", imageAnalyzer)
workflow.addNode("pdfRag", pdfRag)

workflow.addEdge(START, "router")
workflow.addConditionalEdges("router", (state) => {
    switch (state.agent) {
        case "chat":
            return "chat"
        case "search":
            return "search"
        case "coding":
            return "coding"
        case "pdf":
            return "pdf"
        case "ppt":
            return "ppt"
        case "vision":
            return "vision"
        case "imageAnalyzer":
            return "imageAnalyzer"
        case "pdfRag":
            return "pdfRag"
        default:
            break;
    }
}, {
    chat:"chat",
    search:"search",
    coding:"coding",
    vision:"vision",
    pdf:"pdf",
    ppt:"ppt",
    pdfRag:"pdfRag",
    imageAnalyzer:"imageAnalyzer",
})

workflow.addEdge("search", "chat")
workflow.addEdge("chat", END)
workflow.addEdge("coding", END)
workflow.addEdge("pdf", END)
workflow.addEdge("ppt", END)
workflow.addEdge("vision", END)
workflow.addEdge("imageAnalyzer", END)
workflow.addEdge("pdfRag", END)

export const graph = workflow.compile();