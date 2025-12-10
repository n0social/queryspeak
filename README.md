# QuerySpeak

QuerySpeak is a SaaS tool that converts natural language questions into SQL queries using the OpenAI API.

## Features

- **Natural Language to SQL**: Ask questions in plain English and get valid SQL.
- **Schema Aware**: Paste your database schema (CREATE TABLE statements) to get accurate queries.
- **Dark Mode UI**: A beautiful, developer-friendly interface.

## Getting Started

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    - Open `.env.local`.
    - Add your OpenAI API Key: `OPENAI_API_KEY=sk-...`
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open your browser**:
    - Navigate to [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4o)
- **Language**: TypeScript
