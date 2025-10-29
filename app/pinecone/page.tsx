






























// "use client";

// import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
// import { Loader2, CheckCircle, Upload, Send } from "lucide-react";

// interface Report {
//   fileName: string;
//   summary: string;
//   namespace: string;
// }

// interface ChatMessage {
//   role: "user" | "bot";
//   content: string;
// }

// const MedicalChatPage: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [report, setReport] = useState<Report | null>(null);
//   const [input, setInput] = useState<string>("");
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isIngesting, setIsIngesting] = useState<boolean>(false);
//   const [isQuerying, setIsQuerying] = useState<boolean>(false);
//   const [uploadStatus, setUploadStatus] = useState<
//     "idle" | "loading" | "success" | "error"
//   >("idle");

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const mockIndexName =
//     process.env.NEXT_PUBLIC_PINECONE_INDEX || "medical-rag-index";

//  const TypingIndicator = () => (
//   <div className="flex items-center space-x-1 bg-sky-50 text-slate-700 border border-sky-100 rounded-2xl px-4 py-3 shadow-md max-w-[80%]">
//     <div className="flex space-x-1">
//       <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//       <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//       <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></span>
//     </div>
//   </div>
// );


//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//       setReport(null);
//       setUploadStatus("idle");
//       setMessages([]);
//     }
//   };

//   const handleUpload = async (event: FormEvent) => {
//     event.preventDefault();
//     if (!selectedFile) return;
//     setUploadStatus("loading");
//     setIsIngesting(true);

//     try {
//       const formData = new FormData();
//       const dynamicNamespace = `report-${selectedFile.name.replace(
//         /[^a-zA-Z0-9]/g,
//         "_"
//       )}`;
//       formData.append("indexName", mockIndexName);
//       formData.append("namespace", dynamicNamespace);
//       formData.append("files", selectedFile);

//       const response = await fetch("/api/ingest", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.details || "Ingestion failed.");

//       const mockSummary = `The report "${selectedFile.name}" has been processed into ${data.totalChunks} chunks. Key finding: mild anemia indicated by hemoglobin 12.5 g/dL. Platelets borderline low, others normal.`;

//       setReport({
//         fileName: selectedFile.name,
//         summary: mockSummary,
//         namespace: dynamicNamespace,
//       });
//       setUploadStatus("success");
//     } catch (error) {
//       console.error("Ingestion failed:", error);
//       setUploadStatus("error");
//     } finally {
//       setIsIngesting(false);
//     }
//   };

//   const handleQuery = async (event: FormEvent) => {
//     event.preventDefault();
//     const userQuery = input.trim();
//     if (!report || !userQuery || isQuerying) return;

//     setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
//     setInput("");
//     setIsQuerying(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: userQuery,
//           namespace: report.namespace,
//           indexName: mockIndexName,
//           chatHistory: messages,
//         }),
//       });

//       const data = await response.json();
//       const llmAnswer = data.answer || "Unable to generate a response.";
//       setMessages((prev) => [...prev, { role: "bot", content: llmAnswer }]);
//     } catch (e) {
//       console.error("Chat Query Error:", e);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "Error connecting to assistant." },
//       ]);
//     } finally {
//       setIsQuerying(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-slate-100 font-sans text-slate-800">
//       {/* Sidebar */}
//       <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg border-r border-slate-200 shadow-xl p-6 flex flex-col space-y-8 rounded-r-3xl">
//         <h1 className="text-3xl font-bold text-sky-700 border-b border-sky-200 pb-2">
//           MedAI Assistant{" "}
//           <span className="text-sm text-emerald-500 ml-2 font-semibold">
//             ONLINE
//           </span>
//         </h1>

//         {/* Upload Section */}
//         <div className="rounded-xl p-5 bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-md space-y-4">
//           <p className="font-semibold text-lg text-sky-700">
//             1. Upload Medical Report
//           </p>
//           <div className="flex justify-between items-center text-sm font-medium text-gray-600 bg-sky-50 p-2 rounded-lg border border-sky-100">
//             <span>Selected:</span>
//             <span className="truncate max-w-[150px] text-slate-800 font-medium">
//               {selectedFile ? selectedFile.name : "No file chosen"}
//             </span>
//           </div>

//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="w-full py-2 px-4 bg-sky-600 text-white font-medium rounded-lg shadow hover:bg-sky-700 transition-all flex items-center justify-center space-x-2"
//             disabled={isIngesting}
//           >
//             <Upload className="w-5 h-5" />
//             <span>Select File</span>
//           </button>

//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept=".pdf,.txt,.md"
//           />

//           <button
//             onClick={handleUpload}
//             disabled={!selectedFile || isIngesting}
//             className={`w-full py-3 font-bold text-white rounded-lg shadow transition-all ${
//               selectedFile && !isIngesting
//                 ? "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//           >
//             {isIngesting ? (
//               <Loader2 className="w-6 h-6 animate-spin mx-auto" />
//             ) : (
//               "Process Report"
//             )}
//           </button>

//           {uploadStatus !== "idle" && (
//             <div
//               className={`text-center text-sm font-semibold pt-2 ${
//                 uploadStatus === "loading"
//                   ? "text-sky-500"
//                   : uploadStatus === "success"
//                   ? "text-emerald-500"
//                   : "text-red-500"
//               }`}
//             >
//               {uploadStatus === "loading" && "Processing report..."}
//               {uploadStatus === "success" && (
//                 <div className="flex justify-center items-center">
//                   <CheckCircle className="w-4 h-4 mr-1" /> Report ready for chat
//                 </div>
//               )}
//               {uploadStatus === "error" && "Failed to process report."}
//             </div>
//           )}
//         </div>

//         {/* Summary */}
//         {report && (
//           <div className="flex flex-col space-y-4">
//             <p className="font-semibold text-lg text-sky-700">
//               Report Summary
//             </p>
//             <div className="text-sm text-slate-700 p-4 bg-sky-50 border border-sky-100 rounded-lg max-h-56 overflow-y-auto shadow-inner">
//               {report.summary}
//             </div>
//             <button className="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-indigo-700 shadow transition-all">
//               2. Proceed to Chat
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Chat Panel */}
//       <div className="flex-1 pr-8 pl-8 pt- flex flex-col bg-white rounded-l-3xl shadow-inner">
//        <div className="flex-1 pr-8 pl-8 pt-8 flex flex-col bg-gradient-to-br from-white via-sky-50 to-white rounded-l-3xl shadow-xl">
//   <div className="flex-1 overflow-y-auto space-y-6 pr-4 border-l border-sky-100/70 pl-4 backdrop-blur-sm">
//     <h2 className="text-2xl font-bold text-sky-800 border-b border-sky-200 pb-4 mb-4 tracking-tight">
//       🩺 Patient Query
//     </h2>

//     {report ? (
//       messages.length === 0 ? (
//         <p className="text-gray-500 text-center italic mt-10">
//           Ready to analyze{" "}
//           <span className="text-sky-700 font-semibold">
//             {report.fileName}
//           </span>
//           . Ask about any health metrics or lab details.
//         </p>
//       ) : (
//         messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[80%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed transition-all duration-300 ease-in-out ${
//                 msg.role === "user"
//                   ? "bg-sky-600 text-white rounded-br-none shadow-md shadow-sky-200"
//                   : "bg-white/90 text-slate-800 border border-sky-100 rounded-tl-none shadow-sm hover:shadow-md backdrop-blur-md"
//               } animate-fadeIn`}
//             >
//               {msg.content}
//             </div>

//             {msg.role === "bot" &&
//               index === messages.length - 1 &&
//               isQuerying && <TypingIndicator />}
//           </div>
//         ))
//       )
//     ) : (
//       <p className="text-gray-500 text-center mt-10">
//         Upload a report to begin analysis.
//       </p>
//     )}
//   </div>
// </div>


//         {/* Input */}
//        <form
//   onSubmit={handleQuery}
//   className="sticky bottom-0 mt-6 p-5 rounded-lg border-t border-sky-100 bg-white/95 backdrop-blur-md flex space-x-3 shadow-lg"
// >

//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder={
//               report
//                 ? "Ask about hemoglobin levels or diagnosis..."
//                 : "Upload a report first..."
//             }
//             className="flex-1 p-3 border border-sky-200 rounded-full shadow focus:ring-2 focus:ring-sky-400 focus:outline-none placeholder-gray-400"
//             disabled={!report || isQuerying}
//           />
//           <button
//             type="submit"
//             className="p-3 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all shadow"
//             disabled={!report || isQuerying || !input.trim()}
//           >
//             {isQuerying ? (
//               <Loader2 className="w-6 h-6 animate-spin" />
//             ) : (
//               <Send className="w-6 h-6" />
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MedicalChatPage;











"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Loader2, CheckCircle, Upload, Send, Menu, X } from "lucide-react";

interface Report {
    fileName: string;
    summary: string;
    namespace: string;
}

interface ChatMessage {
    role: "user" | "bot";
    content: string;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 bg-sky-50 text-slate-700 border border-sky-100 rounded-xl px-3 py-2 shadow-sm max-w-[80%]">
        <div className="flex space-x-1">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></span>
        </div>
    </div>
);

const MedicalChatPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [report, setReport] = useState<Report | null>(null);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isIngesting, setIsIngesting] = useState<boolean>(false);
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const mockIndexName = process.env.NEXT_PUBLIC_PINECONE_INDEX || "medical-rag-index";

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setReport(null);
            setUploadStatus("idle");
            setMessages([]);
        }
    };

    const handleUpload = async (event: FormEvent) => {
        event.preventDefault();
        if (!selectedFile) return;
        setUploadStatus("loading");
        setIsIngesting(true);

        try {
            const formData = new FormData();
            const dynamicNamespace = `report-${selectedFile.name.replace(/[^a-zA-Z0-9]/g, "_")}`;
            formData.append("indexName", mockIndexName);
            formData.append("namespace", dynamicNamespace);
            formData.append("files", selectedFile);

            const response = await fetch("/api/ingest", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.details || "Ingestion failed.");

            const mockSummary = `The report "${selectedFile.name}" has been processed into ${data.totalChunks} chunks. Key finding: mild anemia indicated by hemoglobin 12.5 g/dL. Platelets borderline low, others normal.`;

            setReport({
                fileName: selectedFile.name,
                summary: mockSummary,
                namespace: dynamicNamespace,
            });
            setUploadStatus("success");
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
        } catch (error) {
            console.error("Ingestion failed:", error);
            setUploadStatus("error");
        } finally {
            setIsIngesting(false);
        }
    };

    const handleQuery = async (event: FormEvent) => {
        event.preventDefault();
        const userQuery = input.trim();
        if (!report || !userQuery || isQuerying) return;

        setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
        setInput("");
        setIsQuerying(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: userQuery,
                    namespace: report.namespace,
                    indexName: mockIndexName,
                    chatHistory: messages,
                }),
            });

            const data = await response.json();
            const llmAnswer = data.answer || "Unable to generate a response.";
            setMessages((prev) => [...prev, { role: "bot", content: llmAnswer }]);
        } catch (e) {
            console.error("Chat Query Error:", e);
            setMessages((prev) => [
                ...prev,
                { role: "bot", content: "Error connecting to assistant." },
            ]);
        } finally {
            setIsQuerying(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-sky-50 via-white to-slate-100 font-sans text-slate-800">
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg p-4 flex justify-between items-center z-50">
                <h1 className="text-xl font-extrabold text-sky-700 tracking-tight">Minerva.ai</h1>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 shadow-sm hover:bg-sky-100 transition-colors"
                    aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            <div 
                className={`
                    fixed inset-y-0 left-0 z-40 w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-xl border-r border-slate-200 p-6 flex-col space-y-8 shadow-2xl lg:relative lg:flex lg:translate-x-0
                    transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <h1 className="hidden lg:block text-3xl font-extrabold text-sky-800 tracking-tight border-b border-sky-200 pb-2">
                    Minerva.Ai
                </h1>

                <div className="rounded-xl p-5 bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-lg space-y-4">
                    <p className="font-bold text-lg text-sky-700">1. Upload Report</p>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-700 bg-sky-50/70 p-3 rounded-lg border border-sky-200">
                        <span className="text-sky-700">Selected:</span>
                        <span className="truncate max-w-[150px] text-slate-800 font-semibold">
                            {selectedFile ? selectedFile.name : "No file chosen"}
                        </span>
                    </div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2 px-4 bg-sky-600 text-white font-medium rounded-lg shadow-md hover:bg-sky-700 transition-all flex items-center justify-center space-x-2"
                        disabled={isIngesting}
                    >
                        <Upload className="w-5 h-5" />
                        <span>Select File</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.txt,.md"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || isIngesting || uploadStatus === 'success'}
                        className={`w-full py-3 font-bold text-white rounded-lg shadow-xl transition-all duration-300 ${
                            selectedFile && !isIngesting
                                ? "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700"
                                : "bg-gray-300 cursor-not-allowed shadow-inner"
                        }`}
                    >
                        {isIngesting ? (
                            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            "INDEX REPORT FOR RAG"
                        )}
                    </button>
                    {uploadStatus !== "idle" && (
                        <div
                            className={`text-center text-sm font-semibold pt-2 ${
                                uploadStatus === "loading" ? "text-sky-500" :
                                uploadStatus === "success" ? "text-emerald-500" :
                                "text-red-500"
                            }`}
                        >
                            {uploadStatus === "loading" && "Processing report..."}
                            {uploadStatus === "success" && (
                                <div className="flex justify-center items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" /> Report ready for chat
                                </div>
                            )}
                            {uploadStatus === "error" && "Failed to process report."}
                        </div>
                    )}
                </div>

                {report && (
                    <div className="flex flex-col space-y-4 pt-4 border-t border-sky-100">
                        <p className="font-bold text-lg text-sky-700">2. Quick Summary</p>
                        <div className="text-sm text-slate-700 p-4 bg-sky-50/70 border border-sky-100 rounded-lg max-h-56 overflow-y-auto shadow-inner leading-relaxed">
                            {report.summary}
                        </div>
                        <button className="w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-indigo-700 shadow-lg transition-all">
                            Proceed to Chat
                        </button>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col pt-16 lg:pt-0"> 
                <div className="flex-1 overflow-y-auto space-y-6 p-6 lg:p-8 bg-white rounded-l-3xl shadow-inner shadow-sky-50">
                    <h2 className="hidden lg:block text-3xl font-extrabold text-sky-800 border-b border-sky-200 pb-4 mb-4 tracking-tight">
                        🩺 Patient Query
                    </h2>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {msg.role === "bot" && (
                                <div className="flex-shrink-0 w-8 h-8 mr-3 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                                    AI
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] px-5 py-3 rounded-xl text-[15px] leading-relaxed transition-all duration-300 ease-in-out shadow-lg ${
                                    msg.role === "user"
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white/90 text-slate-800 border border-sky-200 rounded-tl-none backdrop-blur-sm"
                                }`}
                            >
                                {msg.content}
                            </div>
                            {msg.role === "user" && (
                                <div className="flex-shrink-0 w-8 h-8 ml-3 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                                    You
                                </div>
                            )}
                        </div>
                    ))}
                    {messages.length === 0 && report && (
                        <p className="text-gray-500 text-center italic mt-10">
                            Ready to analyze <span className="text-sky-700 font-semibold">{report.fileName}</span>. Ask about any health metrics or lab details.
                        </p>
                    )}
                    {isQuerying && (
                        <div className="flex justify-start pt-2">
                            <TypingIndicator />
                        </div>
                    )}
                </div>
                <form
                    onSubmit={handleQuery}
                    className="sticky bottom-0 mt-6 p-5 rounded-t-xl border-t border-sky-200 bg-white/95 backdrop-blur-md shadow-top-lg flex space-x-3"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            report
                                ? "Ask about hemoglobin levels or diagnosis..."
                                : "Upload a report first..."
                        }
                        className="flex-1 p-3 border border-sky-300 rounded-full shadow-inner focus:ring-2 focus:ring-sky-400 focus:outline-none text-base"
                        disabled={!report || isQuerying}
                    />
                    <button
                        type="submit"
                        className="p-3 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all shadow-lg disabled:bg-gray-400 disabled:shadow-none"
                        disabled={!report || isQuerying || !input.trim()}
                        aria-label="Send Query"
                    >
                        {isQuerying ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <Send className="w-6 h-6" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MedicalChatPage;
