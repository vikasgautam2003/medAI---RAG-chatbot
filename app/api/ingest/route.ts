// import { NextResponse } from "next/server";
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { DirectoryLoader } from "@langchain/classic/document_loaders/fs/directory";
// import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { PineconeStore } from "@langchain/pinecone";
// import { Pinecone } from "@pinecone-database/pinecone";
// import { Document } from "@langchain/core/documents";

// const EMBEDDING_MODEL = "gemini-embedding-001";
// const CHUNK_SIZE = 1000;
// const CHUNK_OVERLAP = 200;

// export async function POST(req: Request) {
//   const body = await req.json();
//   const indexname = body.indexname || process.env.PINECONE_INDEX;
//   const namespace = body.namespace || "default-namespace";

//   if (!process.env.GOOGLE_API_KEY || !process.env.PINECONE_API_KEY)
//     return NextResponse.json({ error: "Missing API keys" }, { status: 500 });

//   const loader = new DirectoryLoader("./documents", {
//     ".pdf": (p) => new PDFLoader(p, { splitPages: false }),
//     ".txt": (p) => new TextLoader(p)
//   });

//   const rawDocs = await loader.load();
//   if (rawDocs.length === 0)
//     return NextResponse.json({ error: "No documents found" }, { status: 404 });

//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: CHUNK_SIZE,
//     chunkOverlap: CHUNK_OVERLAP
//   });
//   const splitDocs = await splitter.splitDocuments(rawDocs);

//   const embeddings = new GoogleGenerativeAIEmbeddings({
//     apiKey: process.env.GOOGLE_API_KEY,
//     model: EMBEDDING_MODEL
//   });

//   const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
//   const pineconeIndex = pinecone.Index(indexname);

//   await PineconeStore.fromDocuments(splitDocs as Document[], embeddings, {
//     pineconeIndex,
//     namespace
//   });

//   return NextResponse.json({
//     message: "Ingestion complete",
//     documents: rawDocs.length,
//     chunks: splitDocs.length,
//     indexname,
//     namespace
//   });
// }




import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";

const EMBEDDING_MODEL = "models/gemini-embedding-001";
const CHUNK_SIZE = 1500;
const CHUNK_OVERLAP = 200;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_API_KEY || !process.env.PINECONE_API_KEY)
    return NextResponse.json({ error: "Missing API keys" }, { status: 500 });

  try {
    const formData = await req.formData();
    const indexname = formData.get("indexName")?.toString() || process.env.PINECONE_INDEX || "default-index";
    const namespace = formData.get("namespace")?.toString() || "default-medical-reports";
    const uploadedFiles = formData.getAll("files") as File[];

    if (uploadedFiles.length === 0)
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });

    let rawDocs: Document[] = [];

    for (const file of uploadedFiles) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const blob = new Blob([file], { type: file.type });
      let loader;

      if (ext === "pdf") {
        loader = new PDFLoader(blob, { splitPages: false });
      } else if (ext === "txt" || ext === "md" || ext === "markdown") {
        loader = new TextLoader(blob);
      } else {
        console.warn(`Skipping unsupported file: ${file.name}`);
        continue;
      }

      const docsFromFile = await loader.load();
      docsFromFile.forEach((doc) => {
        doc.metadata.source = file.name;
        doc.metadata.namespace = namespace;
      });

      rawDocs.push(...docsFromFile);
    }

    if (rawDocs.length === 0)
      return NextResponse.json({ error: "No supported documents were successfully loaded." }, { status: 400 });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });
    const splitDocs = await splitter.splitDocuments(rawDocs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: EMBEDDING_MODEL,
    });

    const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const pineconeIndex = pinecone.Index("medrag");

    await PineconeStore.fromDocuments(splitDocs as Document[], embeddings, {
      pineconeIndex,
      namespace,
    });

    return NextResponse.json(
      {
        message: "Medical reports indexed successfully.",
        totalDocuments: uploadedFiles.length,
        totalChunks: splitDocs.length,
        indexname: indexname,
        namespace: namespace,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ingestion Pipeline Error:", error);
    return NextResponse.json(
      {
        error: "Ingestion pipeline failed during file processing or vector indexing.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
