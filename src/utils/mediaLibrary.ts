
// Media library for storing and managing uploaded images

// Types
export interface MediaItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  type: string;
  size: number;
  uploadDate: string;
}

// In-memory storage (will be replaced with proper storage later)
const STORAGE_KEY = "media_library";

// Get all media items
export const getAllMedia = (): MediaItem[] => {
  const mediaJson = localStorage.getItem(STORAGE_KEY);
  return mediaJson ? JSON.parse(mediaJson) : [];
};

// Add a media item
export const addMediaItem = (mediaItem: MediaItem): MediaItem => {
  const media = getAllMedia();
  media.push(mediaItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(media));
  return mediaItem;
};

// Delete a media item
export const deleteMediaItem = (id: string): boolean => {
  const media = getAllMedia();
  const filteredMedia = media.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMedia));
  return true;
};

// Helper for creating thumbnail URLs (simplified version - would use proper image processing in production)
export const createThumbnailUrl = (url: string): string => {
  // In a real implementation, this would generate an actual thumbnail
  // For now, we'll just return the original URL
  return url;
};

// Simulate image optimization (in a real app, this would use a proper image optimization service)
export const optimizeImage = async (file: File): Promise<File> => {
  // This is a placeholder for actual image optimization
  // For now, we just return the original file
  return file;
};

// Convert a File to a base64 string for preview
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

// Convert base64 to File object
export const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new File([ab], fileName, { type: mimeType });
};

// Simulate file upload (in a real app, this would upload to a server or cloud storage)
export const uploadFile = async (file: File): Promise<MediaItem> => {
  // Optimize the image (placeholder)
  const optimizedFile = await optimizeImage(file);
  
  // Convert to base64 for storage (in a real app, we'd use proper storage)
  const base64Data = await fileToBase64(optimizedFile);
  
  // Create a new media item
  const newItem: MediaItem = {
    id: Date.now().toString(),
    name: file.name,
    url: base64Data,
    thumbnailUrl: createThumbnailUrl(base64Data),
    type: file.type,
    size: file.size,
    uploadDate: new Date().toISOString(),
  };
  
  // Add to media library
  return addMediaItem(newItem);
};
