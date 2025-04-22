import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  saveFile(file: any, fileName: string) {
    if (!file) {
      throw new Error('No file received');
    }
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const tmpName = `${Date.now()}-${fileName}`;
    const filePath = path.join(uploadDir, tmpName);
    fs.writeFileSync(filePath, file);
    return filePath;
  }

  deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new Error('File not found');
    }
  }
}
