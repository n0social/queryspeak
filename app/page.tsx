'use client';

import { useState } from 'react';

export default function Home() {
  const [schema, setSchema] = useState(`CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10, 2),
  status VARCHAR(20),
  created_at TIMESTAMP
);`);
  const [query, setQuery] = useState('');
  const [sql, setSql] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!query) return;
    setLoading(true);
    setSql('');
    try {
      const res = await fetch('/api/generate-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schema, query }),
      });
      const data = await res.json();
      if (data.sql) {
        setSql(data.sql);
      } else {
        console.error(data.error);
        setSql('-- Error generating SQL');
      }
    } catch (err) {
      console.error(err);
      setSql('-- Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 selection:bg-indigo-200 selection:text-indigo-900">
      {/* Background Gradient Blob - Light Mode */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center pt-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-indigo-600 tracking-wider uppercase shadow-sm">
            AI Powered SQL Generator
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 tracking-tight">
            QuerySpeak
          </h1>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Transform natural language into complex SQL queries instantly. 
            <span className="text-indigo-600 font-medium"> No syntax errors. Just results.</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Schema */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
            <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-xl h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                Database Schema
              </h2>
              <p className="text-sm text-slate-500 mb-4">Define your table structure below.</p>
              <textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className="w-full h-[400px] bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none resize-none transition-all placeholder:text-slate-400"
                placeholder="CREATE TABLE..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Right Column: Query & Result */}
          <div className="flex flex-col gap-6">
            {/* Input Section */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                  <svg className="w-5 h-5 mr-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  Ask a Question
                </h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:outline-none text-slate-900 placeholder:text-slate-400 transition-all"
                    placeholder="e.g., Show me the top 5 users by spend..."
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing
                      </span>
                    ) : 'Generate'}
                  </button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="group relative flex-1 flex flex-col">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-2xl opacity-20 transition duration-500 blur"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-xl flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                    <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    Generated SQL
                  </h2>
                  {sql && !sql.startsWith('--') && (
                    <button 
                      onClick={() => navigator.clipboard.writeText(sql)}
                      className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      Copy
                    </button>
                  )}
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm overflow-auto relative group min-h-[200px]">
                  {sql ? (
                    <pre className={`${sql.startsWith('--') ? 'text-red-500' : 'text-emerald-700'} whitespace-pre-wrap`}>{sql}</pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">
                      <svg className="w-8 h-8 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      <span>Your SQL will appear here...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Placeholder */}
        <div className="mt-12 p-4 border border-slate-200 rounded-xl bg-white text-center shadow-sm">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Sponsored</p>
          <div className="h-24 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-300">
            <span className="text-slate-400 text-sm">Ad Space / Banner Placeholder</span>
          </div>
        </div>
      </div>
    </main>
  );
}
