import { put } from '@vercel/blob';

// Configure Blob client
const blobConfig = {
  token: process.env.BLOB_READ_WRITE_TOKEN,
  storeId: process.env.BLOB_STORE_ID,
  baseUrl: process.env.BLOB_BASE_URL,
};

export async function saveImage(base64Data: string): Promise<string> {
  try {
    // Extract the MIME type and base64 data
    const matches = base64Data.match(/^data:image\/(\w+);base64,/);
    if (!matches) {
      throw new Error('Invalid base64 image data');
    }
    
    const mimeType = matches[1];
    const base64String = base64Data.replace(/^data:image\/\w+;base64,/, '');
    
    // Convert base64 to buffer
    const buffer = Buffer.from(base64String, 'base64');
    
    // Generate unique filename with correct extension
    const uniqueId = crypto.randomUUID();
    const fileExtension = mimeType === 'jpeg' ? 'jpg' : mimeType; // Convert jpeg to jpg for consistency
    const fileName = `${uniqueId}.${fileExtension}`;

    // Upload to Vercel Blob Storage
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: `image/${mimeType}`,
      ...blobConfig,
    });

    // Return the URL of the uploaded blob
    return blob.url;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
}
