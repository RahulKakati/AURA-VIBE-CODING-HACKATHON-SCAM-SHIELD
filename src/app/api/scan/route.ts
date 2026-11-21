import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini } from '@/lib/gemini';
import { ScanInputType } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, inputType = 'message' } = body;

    // Input validation
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input. "content" must be a non-empty string.' },
        { status: 400 }
      );
    }

    const trimmed = content.trim();
    if (trimmed.length === 0) {
      return NextResponse.json(
        { error: 'Content cannot be empty or solely whitespace.' },
        { status: 400 }
      );
    }

    // Safety limit: max 15,000 characters to prevent buffer abuse
    if (trimmed.length > 15000) {
      return NextResponse.json(
        { error: 'Content exceeds the maximum permissible limit of 15,000 characters.' },
        { status: 400 }
      );
    }

    const validTypes: ScanInputType[] = ['message', 'screenshot', 'url'];
    const safeType: ScanInputType = validTypes.includes(inputType) ? inputType : 'message';

    // Perform threat analysis (Gemini AI with deterministic rule fallback)
    const result = await analyzeWithGemini(trimmed, safeType);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Scan API route error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while analyzing the submitted content.' },
      { status: 500 }
    );
  }
}
