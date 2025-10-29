










// // components/MinervaLandingPage.tsx (FINAL WORLD-CLASS DARK/LIGHT DESIGN)
// "use client";

// import React from 'react';
// import { motion, Variants } from 'framer-motion';
// import {
//     Shield,
//     Zap,
//     UploadCloud,
//     Search,
//     Activity,
//     PlayCircle,
//     Send,
//     ArrowRight,
//     MessageSquare,
//     Brain,
// } from "lucide-react";

// // --- Custom SVG for Medical Report Icon ---
// const ReportSVG = () => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.8}
//         stroke="currentColor"
//         className="w-20 h-20 text-indigo-500 opacity-90 animate-pulse"
//     >
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M7.5 2.25h9l4.5 4.5v13.5A2.25 2.25 0 0118.75 22.5H5.25A2.25 2.25 0 013 20.25V4.5A2.25 2.25 0 015.25 2.25h2.25z"
//         />
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 9h6m-6 3.75h6m-6 3.75h6M6 9h.008v.008H6V9zm0 3.75h.008v.008H6v-.008zm0 3.75h.008v.008H6v-.008z"
//         />
//     </svg>
// );

// // --- Data for Floating Bubbles (INTEGRAL) ---
// const floatingBubblesData = [
//     { id: 1, text: 'Hemoglobin: 12.5 g/dL (LOW)', color: 'text-red-500', delay: 0.5, x: 50, y: -80 },
//     { id: 2, text: 'RAG Query Filter: "Hemoglobin"', color: 'text-sky-600', delay: 2.5, x: -70, y: 10 },
//     { id: 3, text: 'Platelets Check: Normal Range', color: 'text-emerald-500', delay: 4.5, x: 10, y: 100 },
// ];

// // --- Floating Bubble Component (INTEGRAL) ---
// const FloatingBubble: React.FC<{ text: string; color: string; delay: number; x: number; y: number }> = ({ text, color, delay, x, y }) => {
    
//     const variants: Variants = {
//         initial: { opacity: 0, scale: 0.8, x, y },
//         animate: {
//             opacity: [0, 1, 1, 0.9, 0],
//             scale: [0.9, 1.05, 1.05, 1.05, 1],
//             y: [y, y - 50, y - 50, y - 50, y - 100],
//             x: [x, x + 10, x + 10, x + 10, x + 20],
//             transition: {
//                 duration: 8,
//                 delay: delay,
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 ease: 'easeInOut',
//             },
//         },
//     };

//     return (
//         <motion.div
//             className={`absolute p-2 px-4 rounded-full shadow-xl font-semibold text-xs bg-white border border-gray-100/50 ${color} whitespace-nowrap z-20`}
//             initial="initial"
//             animate="animate"
//             variants={variants}
//             style={{ 
//                 top: '50%', 
//                 left: '50%', 
//                 transform: 'translate(-50%, -50%)', 
//             }}
//         >
//             {text}
//         </motion.div>
//     );
// };

// // --- Hero Animation Component (INTEGRAL) ---
// const HeroAnimation: React.FC = () => {
//     return (
//         <div className="relative w-full h-[420px] rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-2xl border border-sky-100 overflow-hidden">
            
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(99,102,241,0.2),transparent_60%)]" />
//             <div className="absolute inset-0 opacity-10 z-0">
//                 <Activity className="w-full h-full text-indigo-400" style={{ transform: "scale(1.5)" }} />
//             </div>

//             <div className="relative z-10 flex justify-between items-center h-full space-x-6">
                
//                 <div className="w-1/2 h-full bg-slate-900/95 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 border border-gray-800 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent" />
//                     <ReportSVG />
//                 </div>

//                 <div className="w-1/2 h-full bg-white/90 backdrop-blur-lg rounded-2xl p-5 flex flex-col shadow-xl border border-sky-100/70">
//                     <div className="flex-grow space-y-3 overflow-hidden">
                        
//                         <motion.div
//                             className="p-3 bg-indigo-600 text-white rounded-xl rounded-bl-none text-sm self-start max-w-[80%] ml-auto shadow-md font-semibold"
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 100 }}
//                         >
//                             What’s my risk based only on the new data?
//                         </motion.div>
                        
//                         <motion.div
//                             className="p-3 bg-sky-50 border border-sky-100 text-slate-800 rounded-xl rounded-tr-none text-sm max-w-[90%] shadow-sm leading-relaxed"
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 1.5, duration: 1 }}
//                         >
//                             <span className="font-extrabold text-sky-700">Minerva:</span> Based on your context, your Hemoglobin is{" "}
//                             <span className="font-medium text-red-600">12.5 g/dL</span> — mild anemia detected. Monitoring advised.{" "}
//                             <span className="inline-block w-2 h-2 bg-sky-600 rounded-full animate-pulse"></span>
//                         </motion.div>
                        
//                     </div>
                    
//                     <div className="h-10 bg-gray-100 rounded-full flex items-center p-2 mt-4 border border-gray-200 shadow-inner">
//                         <input type="text" placeholder="Type your follow-up query..." className="bg-transparent text-sm w-full outline-none px-2 text-gray-700" disabled />
//                         <Send className="w-5 h-5 text-sky-500" />
//                     </div>
//                 </div>
//             </div>

//             {floatingBubblesData.map((b) => (
//                 <FloatingBubble
//                     key={b.id}
//                     text={b.text}
//                     color={b.color}
//                     delay={b.delay}
//                     x={b.x}
//                     y={b.y}
//                 />
//             ))}
//         </div>
//     );
// };


// // --- Main Component ---
// const MinervaLandingPage: React.FC = () => {
    
//     const features = [
//         {
//             icon: UploadCloud,
//             title: "Zero-Knowledge Ingestion",
//             description: "Securely upload reports. Data is chunked and embedded via Gemini into an isolated Pinecone namespace.",
//         },
//         {
//             icon: Search,
//             title: "Precision RAG Retrieval",
//             description: "The AI retrieves only contextually relevant sections from your report for high-fidelity answers.",
//         },
//         {
//             icon: Activity,
//             title: "Conversational Diagnostics",
//             description: "Maintain context across multiple questions to discuss symptoms and risk factors naturally.",
//         },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-800 font-sans selection:bg-indigo-200/50">

//             {/* --- Navigation --- */}
//             <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 shadow-lg">
//                 <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">
//                     <div className="text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
//                         <Shield className="w-7 h-7 text-sky-500" />
//                         <span>Minerva.ai</span>
//                     </div>
//                     <a 
//                         href="/ingest" 
//                         className="px-6 py-2.5 bg-linear-to-r from-sky-600 to-indigo-600 text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-all transform hover:shadow-sky-400/30"
//                     >
//                         Launch Assistant
//                     </a>
//                 </div>
//             </header>

//             <main>
//                 {/* === 1. Hero Section (High-Contrast Data Theme) === */}
//                 <section className="pt-0 pb-70 lg:pt-45 pl-20 pr-20 lg:pb-32 relative bg-gray-900 overflow-hidden">
//                     {/* Background Visual Effect (Inspired by TradingView/Data Platforms) */}
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(40,40,60,0.4),transparent)] z-0"></div>
//                     <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] z-0"></div> 

//                     <div className="max-w-8xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative z-10">
                        
//                         {/* A. Left Column: High-Impact Text and CTA */}
//                         <div className="text-center lg:text-left order-2 lg:order-1">
//                             <motion.p 
//                                 className="text-xl font-extrabold uppercase tracking-widest mb-4 inline-block px-3 py-1 text-sky-400 border border-sky-600/50 rounded-full bg-gray-800/50"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: 0.1 }}
//                             >
//                                 Proprietary Medical Intelligence
//                             </motion.p>
                            
//                             <motion.h1
//                                 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none text-white"
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.2 }}
//                             >
//                                 Made to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Analyze</span>
//                                 <span className="block">Your Health Data.</span>
//                             </motion.h1>
                            
//                             <motion.p
//                                 className="max-w-xl mx-auto lg:mx-0 text-xl text-gray-400 mb-10"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.4 }}
//                             >
//                                 Gain clarity on complex reports with RAG-powered analysis—guaranteed contextual precision using **Gemini** and isolated **Pinecone** memory.
//                             </motion.p>
                            
//                             <motion.a 
//                                 href="/ingest" 
//                                 className="inline-flex items-center justify-center px-10 py-4 text-xl font-extrabold rounded-full text-gray-900 bg-white shadow-2xl shadow-sky-500/30 hover:bg-gray-200 transition-all transform hover:scale-[1.05] space-x-3"
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5, delay: 0.6 }}
//                             >
//                                 <span>Access Private Analysis</span>
//                                 <Zap className="w-6 h-6"/>
//                             </motion.a>
//                         </div>
                        
//                         {/* B. Right Column: Animated Demo (INTEGRAL) */}
//                         <div className="w-full relative order-1 lg:order-2 flex justify-center lg:justify-end">
//                              <HeroAnimation />
//                         </div>
//                     </div>
//                 </section>

//                 {/* === 2. Technology & Expertise Section (3-Column Grid) - Light Contrast === */}
//                 <section className="py-24 bg-white">
//                     <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
//                         {features.map((f, i) => (
//                             <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true, amount: 0.4 }}
//                                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                                 whileHover={{ scale: 1.04 }}
//                                 className="p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 hover:shadow-indigo-200/60 transition-all"
//                             >
//                                 <div className="p-4 mb-4 inline-flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 rounded-full text-indigo-700 border border-sky-300 shadow-inner">
//                                     <f.icon className="w-8 h-8" />
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                                     {f.title}
//                                 </h3>
//                                 <p className="text-gray-600 text-base leading-relaxed">
//                                     {f.description}
//                                 </p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* === 3. Call to Action (CTA) - Final High Contrast --- */}
//                 <section className="py-20 bg-indigo-700">
//                     <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
//                         <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
//                             Stop Guessing, Start Knowing.
//                         </h2>
//                         <p className="text-xl text-indigo-200 mb-10">
//                             Your personalized health narrative is waiting to be uncovered. Try Minerva.ai today.
//                         </p>
//                         <a 
//                             href="/ingest"
//                             className="inline-flex items-center justify-center px-12 py-4 border border-transparent text-xl font-extrabold rounded-full text-indigo-700 bg-white shadow-2xl shadow-indigo-900/60 hover:bg-gray-100 transition-all transform hover:scale-[1.07]"
//                         >
//                             Access My Health AI
//                         </a>
//                     </div>
//                 </section>
//             </main>

//             {/* --- Footer --- */}
//             <footer className="py-10 border-t border-gray-800 bg-gray-900/90 text-center relative">
//                 <p className="text-sm text-gray-500">
//                     &copy; {new Date().getFullYear()} Minerva.ai — Built with Next.js, Gemini,
//                     and Pinecone.
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default MinervaLandingPage;











"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Shield,
  Zap,
  UploadCloud,
  Search,
  Activity,
  Send,
  PlayCircle,
} from "lucide-react";

const ReportSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500 opacity-90 animate-pulse"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 2.25h9l4.5 4.5v13.5A2.25 2.25 0 0118.75 22.5H5.25A2.25 2.25 0 013 20.25V4.5A2.25 2.25 0 015.25 2.25h2.25z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9h6m-6 3.75h6m-6 3.75h6M6 9h.008v.008H6V9zm0 3.75h.008v.008H6v-.008zm0 3.75h.008v.008H6v-.008z"
    />
  </svg>
);

const floatingBubblesData = [
  { id: 1, text: "Hemoglobin: 12.5 g/dL (LOW)", color: "text-red-500", delay: 0.5, x: 50, y: -80 },
  { id: 2, text: 'RAG Query Filter: "Hemoglobin"', color: "text-sky-600", delay: 2.5, x: -70, y: 10 },
  { id: 3, text: "Platelets Check: Normal Range", color: "text-emerald-500", delay: 4.5, x: 10, y: 100 },
];

const features = [
  {
    icon: UploadCloud,
    title: "Zero-Knowledge Ingestion",
    description:
      "Securely upload reports. Data is chunked and embedded via Gemini into an isolated Pinecone namespace.",
  },
  {
    icon: Search,
    title: "Precision RAG Retrieval",
    description:
      "The AI retrieves only contextually relevant sections from your report for high-fidelity answers.",
  },
  {
    icon: Activity,
    title: "Conversational Diagnostics",
    description:
      "Maintain context across multiple questions to discuss symptoms and risk factors naturally.",
  },
];

const FloatingBubble: React.FC<{ text: string; color: string; delay: number; x: number; y: number }> = ({
  text,
  color,
  delay,
  x,
  y,
}) => {
  const variants: Variants = {
    initial: { opacity: 0, scale: 0.8, x, y },
    animate: {
      opacity: [0, 1, 1, 0.9, 0],
      scale: [0.9, 1.05, 1.05, 1.05, 1],
      y: [y, y - 50, y - 50, y - 50, y - 100],
      x: [x, x + 10, x + 10, x + 10, x + 20],
      transition: {
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`absolute p-2 px-4 rounded-full shadow-xl font-semibold text-[10px] sm:text-xs bg-white border border-gray-100/50 ${color} whitespace-nowrap z-20`}
      initial="initial"
      animate="animate"
      variants={variants}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </motion.div>
  );
};

const HeroAnimation: React.FC = () => (
  <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl sm:rounded-3xl bg-linear-to-br from-indigo-50 via-white to-sky-50 p-4 sm:p-6 shadow-2xl border border-sky-100 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(99,102,241,0.2),transparent_60%)]" />
    <div className="absolute inset-0 opacity-10 z-0">
      <Activity className="w-full h-full text-indigo-400" style={{ transform: "scale(1.5)" }} />
    </div>
    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center h-full gap-4 lg:gap-6">
      <div className="w-full lg:w-1/2 h-36 sm:h-44 lg:h-full bg-slate-900/95 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-sky-500/10 to-transparent" />
        <ReportSVG />
      </div>
      <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-lg rounded-2xl p-3 sm:p-5 flex flex-col shadow-xl border border-sky-100/70">
        <div className="flex-grow space-y-3">
          <motion.div
            className="p-2 sm:p-3 bg-indigo-600 text-white rounded-xl rounded-bl-none text-xs sm:text-sm self-start max-w-[85%] ml-auto shadow-md font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
          >
            What’s my risk based only on the new data?
          </motion.div>
          <motion.div
            className="p-2 sm:p-3 bg-sky-50 border border-sky-100 text-slate-800 rounded-xl rounded-tr-none text-xs sm:text-sm max-w-[95%] shadow-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="font-extrabold text-sky-700">Minerva:</span> Based on your context, your Hemoglobin is{" "}
            <span className="font-medium text-red-600">12.5 g/dL</span> — mild anemia detected. Monitoring advised.{" "}
            <span className="inline-block w-2 h-2 bg-sky-600 rounded-full animate-pulse"></span>
          </motion.div>
        </div>
        <div className="h-9 sm:h-10 bg-gray-100 rounded-full flex items-center p-1.5 sm:p-2 mt-4 border border-gray-200 shadow-inner">
          <input
            type="text"
            placeholder="Type your follow-up query..."
            className="bg-transparent text-xs sm:text-sm w-full outline-none px-2 text-gray-700"
            disabled
          />
          <Send className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
        </div>
      </div>
    </div>
    {floatingBubblesData.map((b) => (
      <FloatingBubble key={b.id} {...b} />
    ))}
  </div>
);

const MinervaLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-50 font-sans selection:bg-indigo-200/25">
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />
            <span>Minerva.ai</span>
          </div>
          <a
            href="/ai"
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-sky-600 to-indigo-600 text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-all hover:shadow-sky-400/30 text-sm sm:text-base"
          >
            Launch Assistant
          </a>
        </div>
      </header>

      <main>
        <section className="pt-12 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-10 lg:px-20 relative bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,12,20,0.55),transparent)] z-0"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] z-0"></div>

          <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-12 items-center relative z-10">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.p
                className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-widest mb-4 inline-block px-3 py-1 text-sky-300 border border-sky-600/30 rounded-full bg-gray-800/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Proprietary Medical Intelligence
              </motion.p>

              <motion.h1
                className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Made to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                  Analyze
                </span>
                <span className="block">Your Health Data.</span>
              </motion.h1>

              <motion.p
                className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-300 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Gain clarity on complex reports with RAG-powered analysis—guaranteed contextual precision using
                <strong> Gemini</strong> and isolated <strong>Pinecone</strong> memory.
              </motion.p>

              <motion.a
                href="/ai"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-xl font-extrabold rounded-full text-gray-900 bg-white shadow-2xl shadow-sky-500/30 hover:bg-gray-200 transition-all transform hover:scale-[1.05] space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span>Access Private Analysis</span>
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700" />
              </motion.a>
            </div>

            <div className="w-full order-1 lg:order-2 flex justify-center lg:justify-end">
              <HeroAnimation />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.04 }}
                className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 hover:shadow-indigo-200/60 transition-all"
              >
                <div className="p-3 sm:p-4 mb-4 inline-flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 rounded-full text-indigo-700 border border-sky-300 shadow-inner">
                  <f.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-indigo-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Stop Guessing, Start Knowing.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-indigo-200 mb-10">
              Your personalized health narrative is waiting to be uncovered. Try Minerva.ai today.
            </p>
            <a
              href="/ai"
              className="inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 border border-transparent text-base sm:text-xl font-extrabold rounded-full text-indigo-700 bg-white shadow-2xl shadow-indigo-900/60 hover:bg-gray-100 transition-all transform hover:scale-[1.07]"
            >
              Access My Health AI
            </a>
          </div>
        </section>
      </main>

      <footer className="py-8 sm:py-10 border-t border-gray-800 bg-gray-900/95 text-center relative">
        <p className="text-xs sm:text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Minerva.ai — Built with Next.js, Gemini, and Pinecone.
        </p>
      </footer>
    </div>
  );
};

export default MinervaLandingPage;
