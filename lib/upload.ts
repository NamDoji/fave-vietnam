import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = process.env.UPLOAD_DIR || './public/uploads'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export interface UploadResult {
  url: string
  filename: string
  size: number
  mimeType: string
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export async function uploadFile(
  file: File,
  subfolder: string = 'general'
): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File quá lớn. Tối đa ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Loại file không được hỗ trợ')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name).toLowerCase()
  const basename = path.basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
  const timestamp = Date.now()
  const filename = `${basename}-${timestamp}${ext}`

  const uploadPath = path.join(process.cwd(), UPLOAD_DIR, subfolder)
  await mkdir(uploadPath, { recursive: true })

  const filePath = path.join(uploadPath, filename)
  await writeFile(filePath, buffer)

  const url = `/uploads/${subfolder}/${filename}`

  return {
    url,
    filename,
    size: file.size,
    mimeType: file.type,
  }
}

export async function uploadImage(file: File, subfolder: string = 'images'): Promise<UploadResult> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Chỉ hỗ trợ file ảnh: JPEG, PNG, WebP, GIF')
  }
  return uploadFile(file, subfolder)
}

export function isImageType(mimeType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(mimeType)
}
