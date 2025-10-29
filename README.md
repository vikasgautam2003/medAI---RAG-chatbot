# Minerva.ai Learning Intelligence Platform

An AI-powered, full-stack education intelligence system designed to personalize learning, enhance engagement, and deliver real-time knowledge insights using Gemini, Pinecone, and adaptive analytics.

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?logo=google&logoColor=white&style=for-the-badge)
![Pinecone](https://img.shields.io/badge/Pinecone-00A78E?logo=pinecone&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)

---

### ▶️ [Live Demo](https://minervaai.vercel.app/)

---

## 📖 About The Project

**Minerva.ai** is an adaptive learning intelligence platform built to personalize digital education using **AI-driven knowledge retrieval, smart feedback, and contextual recommendations**.

By leveraging **Gemini AI** for comprehension and summarization, **Pinecone** for vector-based semantic search, and a **Next.js + FastAPI** multi-service architecture, Minerva.ai provides a seamless experience for learners and educators alike.

It enables natural-language Q&A, document comprehension, and concept-level retrieval — turning static course material into an interactive, evolving learning ecosystem.

![Project Screenshot](/frontend/public/minerva.png)

---

## 📖 About The Project

Minerva.ai is engineered to solve a core problem in personal health: translating dense, complex medical reports (like lab results, discharge summaries, or clinical notes) into clear, actionable, and contextual intelligence.

Unlike generic chatbots, Minerva.ai employs a strict Retrieval-Augmented Generation (RAG) architecture. When a user asks a question, the system retrieves relevant information only from their private, indexed reports using Pinecone's vector search before calling the Gemini Large Language Model (LLM) for synthesis. This guarantees that responses are grounded in the patient's specific data, dramatically reducing hallucination and increasing medical safety and accuracy.

The application features a secure, multi-stage user flow: File Upload -> Private Indexing -> Conversational Querying.

# 🌟 Key Features

Contextual RAG for Health: Utilizes Gemini Embeddings and Pinecone Vector Store to index medical reports, ensuring the AI only answers based on the patient's specific health record.

Zero-Knowledge Architecture: Documents are processed client-side and sent directly to a private Pinecone namespace. The LLM only sees retrieved chunks of data, never the full database.

Conversational Memory: The backend uses LangChain's memory components to ensure the assistant remembers the prior context of the diagnosis discussion, enabling complex follow-up questions.

Modern, Professional UI: Designed with a sleek, responsive, and trustworthy medical aesthetic using Tailwind CSS and advanced animations via Framer Motion.

Isolated Data Handling: Each report is indexed into a unique namespace, providing necessary data isolation and security for multi-user medical data.

---

## 🔧 Tech Stack

This project combines modern web technologies and AI infrastructure to deliver an adaptive, context-aware learning experience.

| Technology | Role & Justification |
| :---------- | :------------------ |
| **Next.js (TypeScript)** | **Frontend Framework**: Provides a performant, type-safe, SSR-enabled client for smooth and dynamic UI experiences. |
| **Gemini AI** | **Core AI Engine**: Powers chat-based tutoring, document summarization, and contextual understanding. |
| **Pinecone** | **Vector Database**: Stores embeddings for semantic search, enabling concept-based retrieval and similarity queries. |
| **Node.js** | **Backend Runtime**: Manages API endpoints, authentication, and real-time communication logic. |
| **FastAPI** | **AI Microservice Framework**: Handles embeddings generation and Gemini model queries in a lightweight, containerized service. |
| **Tailwind CSS** | **UI Framework**: Builds a consistent, dark-themed design with rapid, utility-first styling. |
| **Vercel** | **Deployment**: Frontend and backend services on Vercel for smooth CI/CD and scaling. |

---

## 📦 Getting Started

This is a multi-service monorepo with independent services for frontend, backend, and AI components.

---

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vikasgautam2003/minerva-ai.git
   cd minerva-ai
