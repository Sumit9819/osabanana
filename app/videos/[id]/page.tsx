import { Metadata } from 'next';
import { getMetadata } from '../../../lib/utils';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getMetadata(params.id);
  if (!data) return { title: 'Not Found' };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.thumbnailUrl],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@your_handle',
      title: data.title,
      description: data.description,
      images: [data.thumbnailUrl],
    },
  };
}

export default async function VideoPage({ params }: Props) {
  const data = await getMetadata(params.id);
  if (!data) return <div>Video not found</div>;

  // Fallback: Render playable video (e.g., if bot or no destination)
  return (
    <div>
      <h1>{data.title}</h1>
      <video src={data.videoUrl} controls width="640" height="360" />
    </div>
  );
}
