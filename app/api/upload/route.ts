import { put } from '@vercel/blob';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { saveMetadata } from '../../../lib/utils'; // Import saver

export async function POST(request: Request) {
  const formData = await request.formData();
  const videoFile = formData.get('video') as File;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const destinationUrl = formData.get('destinationUrl') as string;

  if (!videoFile) return NextResponse.json({ error: 'No video' }, { status: 400 });

  const id = uuidv4();
  const videoBlob = await put(`videos/${id}.mp4`, videoFile, { access: 'public' });

  // Generate thumbnail (frame at ~1s; simplify with sharp or use ffmpeg if needed)
  const videoBuffer = await videoFile.arrayBuffer();
  const thumbnailBuffer = await sharp(Buffer.from(videoBuffer))
    .jpeg({ quality: 80 })
    .toBuffer(); // Basic; for real frame, integrate fluent-ffmpeg (Vercel-compatible)

  const thumbnailBlob = await put(`thumbnails/${id}.jpg`, thumbnailBuffer, { access: 'public' });

  const metadata = { id, title, description, videoUrl: videoBlob.url, thumbnailUrl: thumbnailBlob.url, destinationUrl };
  await saveMetadata(metadata); // Save to DB/in-memory

  const shareUrl = `https://your-domain.com/videos/${id}`; // Replace with actual domain
  return NextResponse.json({ shareUrl });
}
