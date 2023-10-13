import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { extname } from 'path'

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private allowedExtensions = ['.png', '.jpeg']

  transform(file: Express.Multer.File) {
    // const fileExt = extname(file.originalname)

    // if (!this.allowedExtensions.includes(fileExt.toLowerCase())) {
    //   throw new BadRequestException('Invalid file type. Only .png and .jpeg files are allowed.')
    // }

    // return file
    return true
  }
}
