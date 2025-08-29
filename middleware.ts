import { NextRequest, NextResponse } from 'next/server';
import { getMetadata } from './lib/utils';

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isTwitterBot = userAgent.includes('Twitterbot');

  if (request.nextUrl.pathname.startsWith('/videos/') && !isTwitterBot) {
    const id = request.nextUrl.pathname.split('/')[2];
    const metadata = await getMetadata(id);
    if (metadata?.destinationUrl) {
      return NextResponse.redirect(new URL(metadata.destinationUrl));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: '/videos/:path*' };
