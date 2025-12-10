import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { schema, query } = await req.json();

    if (!schema || !query) {
      return NextResponse.json(
        { error: 'Schema and query are required' },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an expert SQL data analyst. 
Your task is to generate a valid SQL query based on the provided database schema and the natural language question.
Return ONLY the SQL query. Do not include markdown formatting (like \`\`\`sql), explanations, or comments.
    `;

    const userPrompt = `
Database Schema:
${schema}

Question:
${query}

SQL Query:
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const sql = completion.choices[0].message.content?.trim();

    return NextResponse.json({ sql });
  } catch (error) {
    console.error('Error generating SQL:', error);
    return NextResponse.json(
      { error: 'Failed to generate SQL' },
      { status: 500 }
    );
  }
}
