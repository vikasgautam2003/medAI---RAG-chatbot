


import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnableLambda } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers"; 
import { ConversationSummaryBufferMemory } from "@langchain/classic/memory";

const EMBEDDING_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  if (!process.env.GOOGLE_API_KEY || !process.env.PINECONE_API_KEY) {
    return new NextResponse(JSON.stringify({ error: "Missing API keys" }), { status: 500 });
  }

  try {
    const { question, namespace, indexName, chatHistory } = await req.json();

    if (!question || !namespace || !indexName) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields: question, namespace, or indexName." }),
        { status: 400 }
      );
    }


    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: EMBEDDING_MODEL,
    });

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const pineconeIndex = pinecone.Index(indexName);
    const vectorStore = new PineconeStore(embeddings, { pineconeIndex, namespace });
    const retriever = vectorStore.asRetriever(4);

    const chatModel = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: CHAT_MODEL,
      temperature: 0.2,
      streaming: false, 
    });


    const memory = new ConversationSummaryBufferMemory({
      llm: chatModel,
      memoryKey: "chat_history",
      returnMessages: true,
    });

    // ✅ Step 4: Prompt template
    const prompt = PromptTemplate.fromTemplate(`
     You are Minerva — a professional, empathetic, and highly specialized virtual medical assistant trained in interpreting laboratory reports, imaging summaries, and clinical findings for a single patient.

Your primary role is to help the clinician or patient understand and interpret the given report data.

---

### INSTRUCTIONS
1. **Base all answers strictly on the provided CONTEXT and CHAT HISTORY.**
   - Do NOT fabricate, speculate, or assume missing values.
   - If data is missing or inconclusive, say so clearly and explain what additional information would be needed.

2. **Tone & Style**
   - Use a calm, confident, and empathetic tone — similar to a senior medical professional explaining results.
   - Avoid overly technical language unless the user asks for it.
   - Prefer clear, concise, and medically accurate explanations.
   - Use short paragraphs or bullet points for readability.

3. **Content Guidelines**
   - Interpret medical values (e.g., Hemoglobin, WBC count, cholesterol) and explain what they might indicate.
   - Always differentiate between “possible interpretation” and “definitive diagnosis”.
   - Never give personal medical advice, prescriptions, or treatment plans.
   - If the question suggests self-diagnosis or urgent concern, respond responsibly (e.g., suggest professional consultation).

4. **Formatting**
   - Use bold for key findings or medical terms.
   - Use lists or short sections for clarity.

---

### CONTEXT (patient report data)
{context}

---

### CHAT HISTORY
{chat_history}

---

### USER QUESTION
{question}

---

### OUTPUT FORMAT
Respond in the following structure:

**Answer:**
(Provide a medically accurate, empathetic explanation.)

**Key Observations from Report:**
- (Summarize 2–4 medically relevant points found in CONTEXT)

**Clinical Insight (if applicable):**
- (Brief interpretation, e.g., “These findings may indicate mild anemia.”)

**Disclaimer:**
This information is for educational purposes only and should not replace professional medical advice or consultation.

    `);

    // ✅ Step 5: Retrieval chain
    const retrievalChain = new RunnableLambda({
      func: async (input: { question: string }) => {
        const docs = await retriever.invoke(input.question);
        return docs.map((doc) => doc.pageContent).join("\n\n");
      },
    });

    // ✅ Step 6: Final chain with string output parser
    const finalChain = RunnableSequence.from([
      {
        context: retrievalChain,
        question: (input: { question: string }) => input.question,
        chat_history: async () =>
          Array.isArray(chatHistory)
            ? chatHistory.map((m: any) => `${m.role}: ${m.content}`).join("\n")
            : "",
      },
      prompt,
      chatModel,
      new StringOutputParser(), // ✅ Converts to readable text
    ]);

    // ✅ Step 7: Invoke and get text result
    const answer = await finalChain.invoke({ question });

    // ✅ Step 8: Return clean JSON
    return new NextResponse(
      JSON.stringify({
        success: true,
        answer: typeof answer === "string" ? answer : JSON.stringify(answer),
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("RAG Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to process query through the RAG pipeline.",
        details: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
