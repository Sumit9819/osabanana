'use client';

import { useState } from 'react';

export default function Home() {
  const [shareUrl, setShareUrl] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    setShareUrl(data.shareUrl);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Video for X Sharing</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Video File:</label>
          <input type="file" name="video" accept="video/*" required className="mt-1 block w-full" />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input type="text" name="title" placeholder="Video Title" required className="mt-1 block w-full border p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Description:</label>
          <input type="text" name="description" placeholder="Brief Description" required className="mt-1 block w-full border p-2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Redirect URL (custom per video):</label>
          <input 
            type="url" 
            name="destinationUrl" 
            placeholder="e.g., https://yourwebsite.com/watch/video-id" 
            required 
            className="mt-1 block w-full border p-2"
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload and Generate Share Link</button>
      </form>
      {shareUrl && (
        <p className="mt-4">Share this on X: <a href={shareUrl} className="text-blue-500">{shareUrl}</a></p>
      )}
    </div>
  );
}
