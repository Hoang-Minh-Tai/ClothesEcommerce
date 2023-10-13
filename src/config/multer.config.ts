import { registerAs } from '@nestjs/config'

export default registerAs('multer', () => ({
  max_upload: parseInt(process.env.MAX_IMAGES_UPLOAD, 10) | 10,
  uploads: process.env.UPLOAD_FOLDER,
}))
