import { writeFile } from 'fs/promises';
import { join } from 'path';

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

    // Define the path where the image will be saved
    const publicPath = join(process.cwd(), 'public', 'images', fileName);
    const dbPath = `/images/${fileName}`;

    // Save the file
    await writeFile(publicPath, buffer);

    // Return the path that should be stored in the database
    return dbPath;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
}
