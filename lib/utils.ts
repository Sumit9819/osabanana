type MetadataType = { id: string; title: string; description: string; videoUrl: string; thumbnailUrl: string; destinationUrl: string };

const metadataStore: Map<string, MetadataType> = new Map(); // In-memory; replace with DB

export async function saveMetadata(metadata: MetadataType) {
  metadataStore.set(metadata.id, metadata);
}

export async function getMetadata(id: string): Promise<MetadataType | null> {
  return metadataStore.get(id) || null;
}
