import { cloudinary } from '../config/cloudinary'
import { UploadApiResponse } from 'cloudinary'

interface CloudinaryUploadOptions {
  folder: string
  public_id?: string
  resource_type?: 'image' | 'raw' | 'auto'
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: CloudinaryUploadOptions
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.public_id,
        resource_type: options.resource_type || 'auto'
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!)
      }
    )

    uploadStream.end(fileBuffer)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}
