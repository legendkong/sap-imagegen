import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const { prompt } = await req.json();
    console.log('This is the req.body' + prompt);

    // Call DALL-E API
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data[0].url;
    console.log('This is the imageUrl' + imageUrl);
    // return imageUrl;
    return Response.json({ imageUrl });

    // Send the image URL back to the client
    // res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error calling DALL-E API:', error);
  }
}
