import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const { prompt } = await req.json();
    console.log('This is the req.body: ' + prompt);

    // Call DALL-E API
    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt: prompt,
      n: 4,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    // Extracting all images
    console.log('Raw Response:', response.data);

    const images = response.data.map((item: any) => {
      return `data:image/png;base64,${item.b64_json}`;
    });

    console.log('Generated Image URLs:', images);

    return NextResponse.json({
      images,
    });
    // return Response.json({ imageJson });
  } catch (error) {
    console.error('Error calling DALL-E API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
