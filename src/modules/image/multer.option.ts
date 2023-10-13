import { diskStorage } from 'multer'
import { extname } from 'path'
import { nanoid } from 'nanoid'
import * as fs from 'fs'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

const imageNameLength = 32

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const generateFilename = () => {
        const randomName = nanoid(imageNameLength) // Generate a random filename
        const filePath = `./uploads/${randomName}${extname(file.originalname)}`

        // Check if a file with the same name already exists
        if (fs.existsSync(filePath)) {
          // If it does, generate a new random filename and try again
          generateFilename()
        } else {
          // If it doesn't exist, use the generated filename
          callback(null, `${randomName}${extname(file.originalname)}`)
        }
      }

      generateFilename() // Start the filename generation process
    },
  }),
}
